from diapers.db import Model

class Org(Model):
    def set_model(self):
        self.model = {
            'id': 'str',
            'name': 'str',
            'location': 'str',
            'phone': 'str',
            'fax': 'int',
            'chief': 'str',
            'register_on': 'bool'
        }
        
