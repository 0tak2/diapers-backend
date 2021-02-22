from diapers.db import Model

class Logs(Model):
    def set_model(self):
        self.model = {
            'id': 'str',
            'cnt': 'str',
            'time': 'datetime.datetime',
            'inner_opened': 'int',
            'inner_new': 'int',
            'outer_opened': 'int',
            'outer_new': 'int',
            'comment': 'str',
            'created_by': 'str',
            'modified_by': 'str',
            'hidden': 'bool',
        }
    
    def read_page_where_cnt(self, cnt, offset, limit):
        try:
            docs = self.ref.where('cnt', '==', cnt).offset(offset).limit(limit).stream()
            result = []
            for doc in docs:
                dic = doc.to_dict()
                dic['id'] = doc.id
                result.append(str(dic))
                print(dir(doc.id))
            return {'success': True, 'result': result}
        except Exception as e:
            return {'success': False, 'msg': e}, 400

    def read_all_where_cnt(self, cnt):
        try:
            docs = self.ref.where('cnt', '==', cnt).stream()
            result = []
            for doc in docs:
                dic = doc.to_dict()
                dic['id'] = doc.id
                result.append(str(dic))
                print(dir(doc.id))
            return {'success': True, 'result': result}
        except Exception as e:
            return {'success': False, 'msg': e}, 400