from flask import Blueprint
from flask_restful import Api, Resource
from flask_jwt_extended import (
    jwt_required
)

from diapers.models.org_model import Org

api_bp = Blueprint('organization', __name__, url_prefix='/api/org')
api = Api(api_bp)

class Organization(Resource): # /api/auth/org
    @jwt_required
    def get(self):
        org_model = Org('organization')
        org_data = org_model.read_all()['result'][0]

        return {'success': True, 'result': org_data}, 200

api.add_resource(Organization, '')