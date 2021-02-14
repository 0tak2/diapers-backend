from datetime import datetime, date

def str_to_date(string): # YYYY-MM-DD to Date
        string_parsed = string.split('-', 3)
        date_obj = date(int(string_parsed[0]), int(string_parsed[1]), int(string_parsed[2]))
        return date_obj

def date_to_datetime(date_obj, time=None):
        if time is None:
            return datetime.combine(date_obj, datetime.min.time())
        else:
            return datetime.combine(date_obj, time)
