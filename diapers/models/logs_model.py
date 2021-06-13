from diapers.db import Model
import datetime
from pytz import timezone
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
            'modified_by': 'str'
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
                        timestamp_kst = dic[key].astimezone(timezone('Asia/Seoul'))
                        dic[key] = timestamp_kst.isoformat()

                dic['id'] = doc.id
                result.append(dic)

            next_docs = self.ref.where('cnt', '==', cnt).order_by('time', direction=firestore.Query.DESCENDING).offset(offset + limit).limit(limit).stream()
            next_result = []
            for doc in next_docs:
                dic = doc.to_dict()
                dic['id'] = doc.id
                next_result.append(dic)
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
                        timestamp_kst = dic[key].astimezone(timezone('Asia/Seoul'))
                        dic[key] = timestamp_kst.isoformat()

                dic['id'] = doc.id
                result.append(dic)
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
                        timestamp_kst = dic[key].astimezone(timezone('Asia/Seoul'))
                        dic[key] = timestamp_kst.isoformat()

                dic['id'] = doc.id
                result.append(dic)

            next_docs = self.ref.where('cnt', '==', cnt).where('time', '>=', start).where('time', '<=', end).order_by('time', direction=firestore.Query.DESCENDING).offset(offset + limit).limit(limit).stream()
            next_result = []
            for doc in next_docs:
                dic = doc.to_dict()
                dic['id'] = doc.id
                next_result.append(dic)
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
                        timestamp_kst = dic[key].astimezone(timezone('Asia/Seoul'))
                        dic[key] = timestamp_kst.isoformat()

                dic['id'] = doc.id
                result.append(dic)
            return {'success': True, 'result': result}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400

    def read_all_where_cnt_period_one_per_day(self, cnt, start, end):
        try:
            docs = self.ref.where('cnt', '==', cnt).where('time', '>=', start).where('time', '<=', end).order_by('time', direction=firestore.Query.DESCENDING).stream()
            result = []
            for doc in docs:
                dic = doc.to_dict()

                dic['id'] = doc.id
                result.append(dic)
            
            # 하루에 한 데이터만 표시되도록 정리
            result_oneperday = []
            d = start.date()
            check_table = {}
            while d <= end.date():
                check_table[d] = 0
                d = d + datetime.timedelta(days=1)

            for log in result:
                date = log['time'].date()
                if check_table[date] < 1: # 해당 일자의 데이터가 한 번도 나온 적이 없는 경우에만 리스트에 그 값을 추가함.
                    # 타임스탬프 타입의 필드는 스트링으로 변환하여 반환
                    timestamp_kst = log['time'].astimezone(timezone('Asia/Seoul'))
                    log['time'] = timestamp_kst.isoformat()
                    result_oneperday.append(log)
                check_table[date] += 1

            return {'success': True, 'result': result_oneperday}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400

    # ADMIN PAGE ONLY
    def read_recent_data_page(self, offset, limit):
        try:
            docs = self.ref.order_by('time', direction=firestore.Query.DESCENDING).offset(offset).limit(limit).stream()
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

            return {'success': True, 'result': result, 'msg': ''}
        except Exception as e:
            return {'success': False, 'result': '', 'msg': str(e)}

    # ADMIN PAGE ONLY
    def delete_all_excepting_a_week(self):
        current = datetime.datetime.now()
        a_week_ago = current - datetime.timedelta(days=7)
        try:
            docs = self.ref.where('time', '<', a_week_ago).stream()
            for doc in docs:
                doc.reference.delete()
            return {'success': True}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400
    
    # DEBUG PAGE ONLY
    def delete_all(self):
        try:
            docs = self.ref.stream()
            for doc in docs:
                doc.reference.delete()
            return {'success': True}
        except Exception as e:
            return {'success': False, 'msg': str(e)}, 400