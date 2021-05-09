'''
Hanbeot Dungji Diapers Management System
Backend Server
v 0.1.0 (2021-05-09)
'''

import os

from flask import Flask
from flask_jwt_extended import JWTManager

from datetime import timedelta

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='TESTtestABCDabcd1234',
        DATABASE=os.path.join(os.getcwd(), 'serviceAccountKey.json'),
        JWT_SECRET_KEY='TESTtestABCDabcd1234',
        JWT_ACCESS_TOKEN_EXPIRES=timedelta(days=7),
        JWT_TOKEN_LOCATION=('headers', 'cookies'),
        JWT_ACCESS_COOKIE_PATH='/api/',
        JWT_REFRESH_COOKIE_PATH='/api/auth/refreshc'
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # JWT Init
    jwt = JWTManager(app)
    @jwt.user_claims_loader
    def add_claims_to_access_token(user):
        return {
            'level': user['level'],
            'realname': user['realname'],
            'description': user['description']
        }

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return user['username']

    # Main Frontend
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def root(path):
        return app.send_static_file('index.html')

    # REST API
    from diapers.resources import auth
    app.register_blueprint(auth.api_bp)

    from diapers.resources import cnts
    app.register_blueprint(cnts.api_bp)

    from diapers.resources import logs
    app.register_blueprint(logs.api_bp)

    from diapers.resources import users
    app.register_blueprint(users.api_bp)

    from diapers.resources import organization
    app.register_blueprint(organization.api_bp)

    # diapers-admin
    from diapers.diapers_admin import admin
    app.register_blueprint(admin.bp)

    return app