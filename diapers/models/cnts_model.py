from diapers.db import Model

import datetime
from pytz import timezone

class Cnts(Model):
    def set_model(self):
        self.model = {
            'id': 'str',
            'name': 'str',
            'birth': 'datetime.datetime',
            'description': 'str',
            'inner_product': 'str',
            'outer_product': 'str',
            'deactivated': 'bool'
        }
    
    def read_one(self):
        try:
            result = self.ref.document(self.data['id']).get().to_dict()
            
            if result['deactivated']: # 비활성화된 이용자는 없는 데이터처럼 처리
                result = []
            else: # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                for key in result.keys():
                    if str(type(result[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                        timestamp_kst = result[key].astimezone(timezone('Asia/Seoul'))
                        result[key] = timestamp_kst.isoformat()

            return {'success': True, 'result': result}
        except Exception as e:
            return {'success': False, 'msg': str(e)}
    
    def read_page(self, offset, limit):
        try:
            docs = self.ref.offset(offset).limit(limit).stream()
            result = []
            for doc in docs:
                dic = doc.to_dict()

                if dic['deactivated']: # 비활성화된 이용자는 없는 데이터처럼 처리
                    continue
                else: # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                    for key in dic.keys():
                        if str(type(dic[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                            timestamp_kst = dic[key].astimezone(timezone('Asia/Seoul'))
                            dic[key] = timestamp_kst.isoformat()

                    dic['id'] = doc.id
                    result.append(dic)

            next_docs = self.ref.offset(offset + limit).limit(limit).stream()
            next_result = []
            for doc in next_docs:
                if dic['deactivated']: # 비활성화된 이용자는 없는 데이터처럼 처리
                    continue
                else:
                    dic = doc.to_dict()
                    dic['id'] = doc.id
                    next_result.append(dic)
            last = True if next_result == [] else False

            return {'success': True, 'result': result, 'last': last, 'page': offset // limit, 'size': limit}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400

    def read_all(self):
        try:
            docs = self.ref.stream()
            result = []
            for doc in docs:
                dic = doc.to_dict()

                if dic['deactivated']: # 비활성화된 이용자는 없는 데이터처럼 처리
                    continue
                else: # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                    for key in dic.keys():
                        if str(type(dic[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                            timestamp_kst = dic[key].astimezone(timezone('Asia/Seoul'))
                            dic[key] = timestamp_kst.isoformat()

                    dic['id'] = doc.id
                    result.append(dic)
            return {'success': True, 'result': result}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400
    
    # ADMIN PAGE ONLY
    def read_page_including_deactivated(self, offset, limit):
        try:
            docs = self.ref.offset(offset).limit(limit).stream()
            result = []
            for doc in docs:
                dic = doc.to_dict()
                # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                for key in dic.keys():
                    if str(type(dic[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                        timestamp_kst = dic[key].astimezone(timezone('Asia/Seoul'))
                        dic[key] = timestamp_kst.isoformat()

                dic['id'] = doc.id
                result.append(dic)

            next_docs = self.ref.offset(offset + limit).limit(limit).stream()
            next_result = []
            for doc in next_docs:
                dic = doc.to_dict()
                dic['id'] = doc.id
                next_result.append(dic)
            last = True if next_result == [] else False

            return {'success': True, 'result': result, 'last': last, 'page': offset // limit, 'size': limit}
        except Exception as e:
            return {'success': False, 'msg': str(e)}
