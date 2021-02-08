from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt_claims
from werkzeug.security import generate_password_hash

from diapers.models.users_model import Users

api_bp = Blueprint('users', __name__, url_prefix='/api/users')
api = Api(api_bp)

class User(Resource): # /api/users/<string:user_id>
    decorators = [jwt_required]

    def get(self, user_id):
        users_model = Users('users', id=user_id)
        return users_model.read_one()

    def post(self):
        level = get_jwt_claims()['level']
        if level < 1:
            return {'success': False, 'msg': 'Unavailable request to level 0 user.'}, 403

        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True, location='json')
        parser.add_argument('password', type=str, required=True, location='json')
        parser.add_argument('realname', type=str, required=True, location='json')
        parser.add_argument('description', type=str, required=True, location='json')
        parser.add_argument('level', type=int, required=True, location='json')
        parser.add_argument('deactivated', type=bool, required=True, location='json')
        args = parser.parse_args()
        username, password, realname, description, level, deactivated = args.values()

        hashed_pw = generate_password_hash(password)

        users_model = Users('users', username=username, password=hashed_pw, realname=realname,
            description=description, level=level, deactivated=deactivated)

        # 중복 체크
        result = users_model.getUser()
        if result:
            return {'success': True, 'msg': 'The username already exists'}, 400

        return users_model.create()

    def patch(self, user_id):
        level = get_jwt_claims()['level']
        if level < 1:
            return {'success': False, 'msg': 'Unavailable request to level 0 user.'}, 403

        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, location='json')
        parser.add_argument('password', type=str, location='json')
        parser.add_argument('realname', type=str, location='json')
        parser.add_argument('description', type=str, location='json')
        parser.add_argument('level', type=int, location='json')
        parser.add_argument('deactivated', type=bool, location='json')
        args = parser.parse_args()
        username, password, realname, description, level, deactivated = args.values()

        hashed_pw = None
        if password is not None:
            hashed_pw = generate_password_hash(password)

        users_model = Users('users', id=user_id, username=username, password=hashed_pw, realname=realname,
            description=description, level=level, deactivated=deactivated)

        # 중복 체크
        result = users_model.getUser()
        if result:
            return {'success': False, 'msg': 'The username already exists'}, 400

        return users_model.update()

    def delete(self, user_id):
        level = get_jwt_claims()['level']
        if level < 1:
            return {'success': False, 'msg': 'Unavailable request to level 0 user.'}, 403

        users_model = Users('users', id=user_id)
        return users_model.delete()

class UsersList(Resource): # /api/auth/users
    decorators = [jwt_required]

    def get(self):
        users_model = Users('users')
        return users_model.read_all()

api.add_resource(UsersList, '')
api.add_resource(User, '/<string:user_id>', '')