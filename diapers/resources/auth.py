from flask import Blueprint, jsonify
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import (
    jwt_required, create_access_token,
    get_jwt_identity, get_jwt_claims, jwt_refresh_token_required,
    create_refresh_token, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)
from werkzeug.security import check_password_hash, generate_password_hash

from diapers.models.users_model import Users

api_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
api = Api(api_bp)

class Login(Resource): # /api/auth/login
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True, location='json')
        parser.add_argument('password', required=True, location='json')
        args = parser.parse_args()
        username, password = args.values()

        auth_model = Users('users', username=username)
        result = auth_model.getUser()
        if result:
            user_data = result[0]
            if check_password_hash(user_data['password'], password):
                access_token = create_access_token(identity=user_data)

                realname =  user_data['realname']
                description =  user_data['description']
                level =  user_data['level']

                return jsonify({
                    'success': True, 
                    'username': username,
                    'access_token': access_token,
                    'user_data': {
                            'realname': realname,
                            'description': description,
                            'level': level
                        }
                })

            else:
                return {'success': False, 'msg': 'Wrong username or password.'}, 400
        else:
            return {'success': False, 'msg': 'Wrong username or password.'}, 400

    @jwt_required
    def get(self):
        current_user = get_jwt_identity()
        user_data = get_jwt_claims()

        return {'success': True, 'username': current_user, 'userdata': user_data}, 200

class Register(Resource): # /api/auth/register
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True, location='json')
        parser.add_argument('password', type=str, required=True, location='json')
        parser.add_argument('realname', type=str, required=True, location='json')
        parser.add_argument('description', type=str, required=True, location='json')
        args = parser.parse_args()
        username, password, realname, description = args.values()

        hashed_pw = generate_password_hash(password)

        users_model = Users('users', username=username, password=hashed_pw, realname=realname,
            description=description, level=1, deactivated=False)

        # 중복 체크
        result = users_model.getUser()
        if result:
            return {'success': False, 'msg': 'The username already exists'}, 400

        return users_model.create()

class DoesExist(Resource): # /api/auth/exist/<username>
    def get(self, username):
        auth_model = Users('users', username=username)
        result = auth_model.getUser()
        if result:
            return {'exists': True, 'msg': 'already exists'}
        else:
            return {'exists': False, 'msg': 'register available'}

# (HttpOnly Cookie)
class LoginCookie(Resource): # /api/auth/loginc
    def post(self): # 토큰 정보를 담은 HttpOnly 쿠키를 생성
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True, location='json')
        parser.add_argument('password', required=True, location='json')
        args = parser.parse_args()
        username, password = args.values()

        auth_model = Users('users', username=username)
        result = auth_model.getUser()
        if result:
            user_data = result[0]
            if check_password_hash(user_data['password'], password):
                access_token = create_access_token(identity=user_data)
                refresh_token = create_refresh_token(identity=user_data)
                
                realname = user_data['realname']
                description = user_data['description']
                level = user_data['level']

                resp = jsonify({
                    'success': True,
                    'username': username,
                    'user_data': {
                            'realname': realname,
                            'description': description,
                            'level': level
                    }
                })

                set_access_cookies(resp, access_token)
                set_refresh_cookies(resp, refresh_token)
                return resp
            else:
                return {'success': False, 'msg': 'Wrong username or password.'}, 400
        else:
            return {'success': False, 'msg': 'Wrong username or password.'}, 400

class LogoutCookie(Resource): # /api/auth/logoutc
    def post(self): # 토큰 정보를 담은 HttpOnly 쿠키를 제거
        resp = jsonify({'success': True, 'msg': 'You loged out.'})
        unset_jwt_cookies(resp)
        return resp

class RefreshCookie(Resource): # /api/auth/refreshc
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)

        resp = jsonify({'success': True, 'msg': 'refreshed cookie'})
        set_access_cookies(resp, access_token)
        return resp


api.add_resource(Login, '/login')
api.add_resource(Register, '/register')
api.add_resource(DoesExist, '/exist/<username>')

api.add_resource(LoginCookie, '/loginc')
api.add_resource(LogoutCookie, '/logoutc')
api.add_resource(RefreshCookie, '/refreshc')