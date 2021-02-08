from diapers.db import Model

class Cnts(Model):
    def set_model(self):
        self.model = {
            'id': 'str',
            'name': 'str',
            'birth': 'str',
            'description': 'str',
            'inner_product': 'str',
            'outer_product': 'str',
            'deactivated': 'bool'
        }
