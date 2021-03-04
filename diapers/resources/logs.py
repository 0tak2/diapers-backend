from datetime import date

from flask import Blueprint
from flask_restful import Api, Resource, url_for, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from diapers.models.logs_model import Logs

from datetime import datetime

api_bp = Blueprint('logs', __name__, url_prefix='/api/logs')
api = Api(api_bp)

class Log(Resource): # /api/logs/<string:log_id>
    decorators = [jwt_required]
    # id, cnt, time, inner_opened, inner_new, outer_opened, outer_new, comment, created_by, modified_by, hidden
    def get(self, log_id):
        logs_model = Logs('logs', id=log_id)
        return logs_model.read_one()

    def post(self):
        current_user = get_jwt_identity()

        parser = reqparse.RequestParser()
        parser.add_argument('cnt', type=str, required=True, location='json')
        parser.add_argument('time', type=str, required=True, location='json')
        parser.add_argument('inner_opened', type=int, required=True, location='json')
        parser.add_argument('inner_new', type=int, required=True, location='json')
        parser.add_argument('outer_opened', type=int, required=True, location='json')
        parser.add_argument('outer_new', type=int, required=True, location='json')
        parser.add_argument('comment', type=str, required=True, location='json')

        args = parser.parse_args()
        cnt, time, inner_opened, inner_new, outer_opened, outer_new, comment = args.values()

        time_parsed = datetime.strptime(time + " +0900", '%Y-%m-%d %H:%M %z')

        logs_model = Logs('logs', cnt=cnt, time=time_parsed, inner_opened=inner_opened, inner_new=inner_new,
            outer_opened=outer_opened, outer_new=outer_new, comment=comment, created_by=current_user, modified_by='', hidden=False)
        return logs_model.create()

    def patch(self, log_id):
        current_user = get_jwt_identity()

        parser = reqparse.RequestParser()
        parser.add_argument('cnt', type=str, location='json')
        parser.add_argument('time', type=str, location='json')
        parser.add_argument('inner_opened', type=int, location='json')
        parser.add_argument('inner_new', type=int, location='json')
        parser.add_argument('outer_opened', type=int, location='json')
        parser.add_argument('outer_new', type=int, location='json')
        parser.add_argument('comment', type=str, location='json')
        parser.add_argument('hidden', type=bool, location='json')

        args = parser.parse_args()
        cnt, time, inner_opened, inner_new, outer_opened, outer_new, comment, hidden = args.values()

        if time is not None:
            time_parsed = datetime.strptime(time + " +0900", '%Y-%m-%d %H:%M %z')
        else:
            time_parsed = None

        logs_model = Logs('logs', id=log_id, cnt=cnt, time=time_parsed, inner_opened=inner_opened, inner_new=inner_new,
            outer_opened=outer_opened, outer_new=outer_new, comment=comment, modified_by=current_user, hidden=hidden)
        return logs_model.update()

    def delete(self, log_id):
        logs_model = Logs('logs', id=log_id)
        return logs_model.delete()

class LogsList(Resource): # /api/logs/cnt/<string:cnt_id>
    decorators = [jwt_required]

    def get(self, cnt_id):
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, location='args')
        parser.add_argument('size', type=int, location='args')
        parser.add_argument('start', type=str, location='args')
        parser.add_argument('end', type=str, location='args')
        args = parser.parse_args()
        page, size, start, end = args.values()

        if start is not None:
            start_parsed = datetime.strptime(start + " +0900", '%Y-%m-%d %H:%M %z')
        else:
            start_parsed = None

        if end is not None:
            end_parsed = datetime.strptime(end + " +0900", '%Y-%m-%d %H:%M %z')
        else:
            end_parsed = None

        logs_model = Logs('logs')

        if page is not None and size is None: # size가 넘어오지 않았으면 10으로 지정함
            size = 10
        elif page is None and size is None: # 페이지네이션 없이 전체 결과 반환
            if start_parsed is not None and end_parsed is not None: # 기간 조회
                return logs_model.read_all_where_cnt_period(cnt_id, start_parsed, end_parsed)
            else:
                return logs_model.read_all_where_cnt(cnt_id)
        elif page is None or size is None:
            return {'msg': 'Check your query string. Something wrong.'}, 400
        else: #페이지네이션하여 반환
            if start_parsed is not None and end_parsed is not None: # 기간 조회
                return logs_model.read_page_where_cnt_period(cnt_id, page * size, size, start_parsed, end_parsed)
            else:
                return logs_model.read_page_where_cnt(cnt_id, page * size, size)

api.add_resource(Log, '/<string:log_id>', '')
api.add_resource(LogsList, '/cnt/<string:cnt_id>')