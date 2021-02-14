from flask import Blueprint
from flask_restful import Api, Resource, url_for, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt_claims

from diapers.models.cnts_model import Cnts
from diapers.utils.timestamp import str_to_date, date_to_datetime

api_bp = Blueprint('cnts', __name__, url_prefix='/api/cnts')
api = Api(api_bp)

class Client(Resource): # /api/cnts/<string:cnt_id>
    decorators = [jwt_required]

    def get(self, cnt_id):
        cnts_model = Cnts('cnts', id=cnt_id)
        return cnts_model.read_one()

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, location='json')
        parser.add_argument('birth', type=str, required=True, location='json')
        parser.add_argument('description', type=str, required=True, location='json')
        parser.add_argument('inner_product', type=str, required=True, location='json')
        parser.add_argument('outer_product', type=str, required=True, location='json')
        args = parser.parse_args()
        name, birth, description, inner_product, outer_product = args.values()

        birth_parsed = str_to_date(birth)
        birth_dt = date_to_datetime(birth_parsed)

        cnts_model = Cnts('cnts', name=name, birth=birth_dt, description=description,
            inner_product=inner_product, outer_product=outer_product, deactivated=False)
        return cnts_model.create()

    def patch(self, cnt_id):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, location='json')
        parser.add_argument('birth', type=str, location='json')
        parser.add_argument('description', type=str, location='json')
        parser.add_argument('inner_product', type=str, location='json')
        parser.add_argument('outer_product', type=str, location='json')
        parser.add_argument('deactivated', type=bool, location='json')
        args = parser.parse_args()
        name, birth, description, inner_product, outer_product, deactivated = args.values()

        birth_parsed_list = birth.split('-', 3) # YYYY-MM-DD
        birth_parsed = date(birth_parsed_list[0], birth_parsed_list[1], birth_parsed_list[2])

        cnts_model = Cnts('cnts', id=cnt_id, name=name, birth=birth_parsed, description=description,
            inner_product=inner_product, outer_product=outer_product, deactivated=deactivated)
        return cnts_model.update()

    def delete(self, cnt_id):
        level = get_jwt_claims()['level']
        if level < 1:
            return {'success': False, 'msg': 'Unavailable request to level 0 user.'}, 403

        cnts_model = Cnts('cnts', id=cnt_id)
        return cnts_model.delete()

class ClientsList(Resource): # /api/cnts
    decorators = [jwt_required]

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, location='args')
        parser.add_argument('size', type=int, location='args')
        args = parser.parse_args()
        page, size = args.values()

        cnts_model = Cnts('cnts')

        if page is not None and size is None:
            size = 10
        elif page is None and size is None:
            # 페이지네이션 없이 전체 결과 반환
            return cnts_model.read_all()
        elif page is None or size is None:
            return {'msg': 'Check your query string. Something wrong.'}, 400

        return cnts_model.read_page(page * size, size)

api.add_resource(ClientsList, '')
api.add_resource(Client, '/<string:cnt_id>', '')