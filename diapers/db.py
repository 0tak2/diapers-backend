from flask import current_app, g

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import datetime

def get_db():
    if not firebase_admin._apps:
        cred = credentials.Certificate(current_app.config['DATABASE'])
        firebase_admin.initialize_app(cred)

    if 'db' not in g:
        g.db = firestore.client()
    
    return g.db

class Model():
    def __init__(self, collection, **kwargs):
        self.set_model()
        
        self.data = {} # 상속받은 클래스에서도 비워놓아야 함. 오직 초기화 목적.
        self.collection = collection
        for key in self.model.keys():
            field_type = self.model[key]
            if key in kwargs.keys():
                if (kwargs[key] is not None) and (str(type(kwargs[key])) == f"<class '{field_type}'>"):
                    self.data[key] = kwargs[key]
        
        self.data_id_safe = self.data.copy()
        if 'id' in self.data_id_safe.keys():
            del self.data_id_safe['id']

        self.db = get_db()
        self.ref = self.db.collection(self.collection)

    def set_model(self):
        self.model = {'id': 'str'} # 상속받은 클래스에서는 오버라이딩하여 모델의 스펙을 지정

    def create(self):
        for key in self.model.keys(): # 모델에 규정한 모든 필드가 준비되어 있어야 쓸 수 있음.
            if key == 'id':
                continue
            elif self.data[key] is None:
                return {'success': False, 'msg': 'Required field(s) missing.'}

        try:
            self.ref.add(self.data_id_safe)
            return {'success': True}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400

    def read_one(self):
        try:
            result = self.ref.document(self.data['id']).get().to_dict()
            # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
            for key in result.keys():
                if str(type(result[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                    # 파이퍼스토어 버그인지, 타임존이 넘어오지 않는 현상이 있어서, 타임존을 KST로 덮어씌워준다.
                    timestamp_kst = result[key].replace(tzinfo=datetime.timezone(datetime.timedelta(hours=9)))
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
                # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                for key in dic.keys():
                    if str(type(dic[key])) == "<class 'google.api_core.datetime_helpers.DatetimeWithNanoseconds'>":
                        timestamp_kst = result[key].replace(tzinfo=datetime.timezone(datetime.timedelta(hours=9)))
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

            return {'success': True, 'result': result, 'last': last}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400

    def read_all(self):
        try:
            docs = self.ref.stream()
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

    def update(self):
        try:
            self.ref.document(self.data['id']).update(self.data_id_safe)
            return {'success': True}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400

    def delete(self):
        try:
            self.ref.document(self.data['id']).delete()
            return {'success': True}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400