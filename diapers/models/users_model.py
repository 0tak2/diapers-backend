from diapers.db import Model

class Users(Model):
    def set_model(self):
        self.model = {
            'id': 'str',
            'username': 'str',
            'password': 'str',
            'realname': 'str',
            'level': 'int',
            'description': 'str',
            'deactivated': 'bool'
        }

    def getUser(self):
        try:
            docs = self.ref.where('username', '==', self.data['username']).stream()

            result = []
            for doc in docs:
                dic = doc.to_dict()
                dic['id'] = doc.id
                result.append(dic)
            return result
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400