from flask import Blueprint
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

api_bp = Blueprint('users', __name__, url_prefix='/api/users')
api = Api(api_bp)

class User(Resource): # /api/auth/users/<string:user_id>
    decorators = [jwt_required]

    def get(self, user_id):
        return {'msg': 'read user {}'.format(user_id)}

    def post(self, user_id):
        return {'msg': 'create user {}'.format(user_id)}

    def patch(self, user_id):
        return {'msg': 'update user {}'.format(user_id)}

    def delete(self, user_id):
        return {'msg': 'delete user {}'.format(user_id)}

class UsersList(Resource): # /api/auth/users
    decorators = [jwt_required]

    def get(self):
        return {'msg': 'read user list'}

api.add_resource(UsersList, '')
api.add_resource(User, '/<string:user_id>')