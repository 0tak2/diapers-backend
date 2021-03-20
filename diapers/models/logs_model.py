from diapers.db import Model
import datetime
from firebase_admin import firestore

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
            docs = self.ref.where('cnt', '==', cnt).order_by('time', direction=firestore.Query.DESCENDING).offset(offset).limit(limit).stream()
            result = []
            for doc in docs:
                dic = doc.to_dict()
                # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                for key in dic.keys():
                    if str(type(dic[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                        # 파이퍼스토어 버그인지, 타임존이 넘어오지 않는 현상이 있어서, 타임존을 KST로 덮어씌워준다.
                        timestamp_kst = dic[key].replace(tzinfo=datetime.timezone(datetime.timedelta(hours=9)))
                        dic[key] = timestamp_kst.isoformat()

                dic['id'] = doc.id
                result.append(str(dic))

            next_docs = self.ref.offset(offset + limit).limit(limit).stream()
            next_result = []
            for doc in next_docs:
                dic = doc.to_dict()
                dic['id'] = doc.id
                next_result.append(str(dic))
            last = True if next_result == [] else False

            return {'success': True, 'result': result, 'last': last,  'page': offset // limit, 'size': limit}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400

    def read_all_where_cnt(self, cnt):
        try:
            docs = self.ref.where('cnt', '==', cnt).order_by('time', direction=firestore.Query.DESCENDING).stream()
            result = []
            for doc in docs:
                dic = doc.to_dict()

                # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                for key in dic.keys():
                    if str(type(dic[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                        timestamp_kst = dic[key].replace(tzinfo=datetime.timezone(datetime.timedelta(hours=9)))
                        dic[key] = timestamp_kst.isoformat()

                dic['id'] = doc.id
                result.append(str(dic))
            return {'success': True, 'result': result}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400

    def read_page_where_cnt_period(self, cnt, offset, limit, start, end):
        try:
            docs = self.ref.where('cnt', '==', cnt).where('time', '>=', start).where('time', '<=', end).order_by('time', direction=firestore.Query.DESCENDING).offset(offset).limit(limit).stream()
            result = []
            for doc in docs:
                dic = doc.to_dict()
                # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                for key in dic.keys():
                    if str(type(dic[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                        # 파이퍼스토어 버그인지, 타임존이 넘어오지 않는 현상이 있어서, 타임존을 KST로 덮어씌워준다.
                        timestamp_kst = dic[key].replace(tzinfo=datetime.timezone(datetime.timedelta(hours=9)))
                        dic[key] = timestamp_kst.isoformat()

                dic['id'] = doc.id
                result.append(str(dic))

            next_docs = self.ref.offset(offset + limit).limit(limit).stream()
            next_result = []
            for doc in next_docs:
                dic = doc.to_dict()
                dic['id'] = doc.id
                next_result.append(str(dic))
            last = True if next_result == [] else False

            return {'success': True, 'result': result, 'last': last, 'page': offset // limit, 'size': limit}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400

    def read_all_where_cnt_period(self, cnt, start, end):
        try:
            docs = self.ref.where('cnt', '==', cnt).where('time', '>=', start).where('time', '<=', end).order_by('time', direction=firestore.Query.DESCENDING).stream()
            result = []
            for doc in docs:
                dic = doc.to_dict()

                # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                for key in dic.keys():
                    if str(type(dic[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                        timestamp_kst = dic[key].replace(tzinfo=datetime.timezone(datetime.timedelta(hours=9)))
                        dic[key] = timestamp_kst.isoformat()

                dic['id'] = doc.id
                result.append(str(dic))
            return {'success': True, 'result': result}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400