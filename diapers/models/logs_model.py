from diapers.db import Model
from datetime import datetime

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

                # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                for key in dic.keys():
                    if str(type(dic[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                        timestamp_kst = result[key].replace(tzinfo=datetime.timezone(datetime.timedelta(hours=9)))
                        dic[key] = timestamp_kst.isoformat()

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

                # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                for key in dic.keys():
                    if str(type(dic[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                        timestamp_kst = result[key].replace(tzinfo=datetime.timezone(datetime.timedelta(hours=9)))
                        dic[key] = timestamp_kst.isoformat()

                dic['id'] = doc.id
                result.append(str(dic))
                print(dir(doc.id))
            return {'success': True, 'result': result}
        except Exception as e:
            return {'success': False, 'msg': e}, 400