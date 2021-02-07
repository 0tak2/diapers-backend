from flask import Blueprint
from flask_restful import Api, Resource, url_for, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from diapers.models.logs_model import Logs

api_bp = Blueprint('logs', __name__, url_prefix='/api/logs')
api = Api(api_bp)

class Log(Resource): # /api/logs/<string:log_id>
    decorators = [jwt_required]
    # id, cnt, date, inner_opened, inner_new, outer_opened, outer_new, comment, created_by, modified_by, hidden
    def get(self, log_id):
        logs_model = Logs('logs', id=log_id)
        return logs_model.readOne()

    def post(self):
        current_user = get_jwt_identity()

        parser = reqparse.RequestParser()
        parser.add_argument('cnt', type=str, required=True, location='json')
        parser.add_argument('date', type=str, required=True, location='json')
        parser.add_argument('inner_opened', type=int, required=True, location='json')
        parser.add_argument('inner_new', type=int, required=True, location='json')
        parser.add_argument('outer_opened', type=int, required=True, location='json')
        parser.add_argument('outer_new', type=int, required=True, location='json')
        parser.add_argument('comment', type=str, required=True, location='json')

        args = parser.parse_args()
        cnt, date, inner_opened, inner_new, outer_opened, outer_new, comment = args.values()

        logs_model = Logs('logs', cnt=cnt, date=date, inner_opened=inner_opened, inner_new=inner_new,
            outer_opened=outer_opened, outer_new=outer_new, comment=comment, created_by=current_user, modified_by='', hidden=False)
        return logs_model.create()

    def patch(self, log_id):
        current_user = get_jwt_identity()

        parser = reqparse.RequestParser()
        parser.add_argument('cnt', type=str, location='json')
        parser.add_argument('date', type=str, location='json')
        parser.add_argument('inner_opened', type=int, location='json')
        parser.add_argument('inner_new', type=int, location='json')
        parser.add_argument('outer_opened', type=int, location='json')
        parser.add_argument('outer_new', type=int, location='json')
        parser.add_argument('comment', type=str, location='json')
        parser.add_argument('hidden', type=bool, location='json')

        args = parser.parse_args()
        cnt, date, inner_opened, inner_new, outer_opened, outer_new, comment, hidden = args.values()

        logs_model = Logs('logs', id=log_id, cnt=cnt, date=date, inner_opened=inner_opened, inner_new=inner_new,
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
        args = parser.parse_args()
        page, size = args.values()

        logs_model = Logs('logs')

        if page is not None and size is None:
            size = 10
        elif page is None and size is None:
            # 페이지네이션 없이 전체 결과 반환
            return logs_model.readAll()
        elif page is None or size is None:
            return {'msg': 'Check your query string. Something wrong.'}, 400

        return logs_model.readPage(page * size, size)

api.add_resource(Log, '/<string:log_id>', '')
api.add_resource(LogsList, '/cnt/<string:cnt_id>')