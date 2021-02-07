from diapers.db import Model

class Logs(Model):
    def set_model(self):
        self.model = {
            'id': 'str',
            'cnt': 'str',
            'date': 'str',
            'inner_opened': 'int',
            'inner_new': 'int',
            'outer_opened': 'int',
            'outer_new': 'int',
            'comment': 'str',
            'created_by': 'str',
            'modified_by': 'str',
            'hidden': 'bool',
        }