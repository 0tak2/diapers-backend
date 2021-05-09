from flask import Blueprint, render_template, session, redirect, url_for, request

from werkzeug.security import check_password_hash, generate_password_hash

from diapers.models.users_model import Users
from diapers.models.logs_model import Logs
from diapers.models.cnts_model import Cnts
from diapers.models.org_model import Org

from datetime import datetime

bp = Blueprint('admin', __name__, url_prefix='/admin')

def login_check():
    if 'username' in session:
        return True
    else:
        return False

@bp.route('/')
def index():
    isLogin = login_check()
    if isLogin:
        return render_template('admin/index.html', isLogin = True,
            username = session['username'], realname = session['realname'],
            description = session['description'], level = session['level'])
    else:
        return redirect(url_for('admin.login'))

@bp.route('/login', methods = ['POST', 'GET'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        auth_model = Users('users', username=username)
        result = auth_model.getUser()
        if result:
            user_data = result[0]
            if check_password_hash(user_data['password'], password):
                if user_data['deactivated']:
                    return '<script>alert("비활성화된 계정입니다. 로그인할 수 없습니다.");\n history.go(-1);</script>'
                else:
                    session['username'] = username
                    session['realname'] =  user_data['realname']
                    session['description'] =  user_data['description']
                    session['level'] =  user_data['level']

                    return redirect(url_for('admin.index'))
            else:
                return render_template('admin/login_failed.html')
        else:
            return render_template('admin/login_failed.html')
    elif request.method == 'GET':
        return render_template('admin/login.html')

@bp.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('realname', None)
    session.pop('description', None)
    session.pop('level', None)
    return redirect(url_for('admin.login'))

@bp.route('/register', methods = ['POST', 'GET'])
def register():
    org_model = Org('organization')
    is_available = org_model.read_all()['result'][0]['register_on']

    if is_available:
        if request.method == 'POST':
            username = request.form['username']
            realname = request.form['realname']
            description = request.form['description']
            password = request.form['password']
            password_again = request.form['password_again']

            # 공백 확인
            if username == '' or realname == '' or password == '':
                return '<script>alert("아이디, 비밀번호, 이름은 반드시 입력해야합니다.");\n location.href="./register";</script>'

            # 비밀번호 확인
            if password != password_again:
                return '<script>alert("비밀번호 확인이 일치하지 않습니다.");\n location.href="./register";</script>'

            hashed_pw = generate_password_hash(password)
            users_model = Users('users', username=username, realname=realname, description=description,
                password=hashed_pw, level=0, deactivated=False)
            
            # 중복 체크
            exist_check = users_model.getUser()
            if exist_check:
                return '<script>alert("해당하는 아이디가 이미 존재합니다. 다른 아이디로 시도하십시오.");\n location.href="./register";</script>'

            try:
                db_data = users_model.create()
                if db_data['success']:
                    return '<script>alert("회원 등록이 완료되었습니다.");\n location.href="/";</script>'
                else:
                    return render_template('admin/sthwrong.html')
            except Exception as e:
                return '<script>alert("오류가 발생했습니다.\n ' + str(e) + '");\n location.href="./register";</script>'
        elif request.method == 'GET':
            return render_template('admin/register.html')
    else:
        return '<script>alert("회원 등록이 불가능한 상태입니다. 관리자에게 문의하세요.");\n history.go(-1);</script>'

@bp.route('/general/organization', methods = ['POST', 'GET'])
def general_organization():
    isLogin = login_check()
    if isLogin:
        if request.method == 'GET':
            org_model = Org('organization')

            try:
                db_data = org_model.read_all()
                if db_data['success']:
                    result = db_data['result'][0]
                    msg = ''
                else:
                    result = ''
                    msg = db_data[0]['msg']
            except Exception as e:
                result = ''
                msg = str(e)

            return render_template('admin/general/organization.html', isLogin = True,
                username = session['username'], realname = session['realname'],
                description = session['description'], level = session['level'],
                result = result, msg = msg)
        elif request.method == 'POST':
            org_id = request.form['id']
            name = request.form['name']
            location = request.form['location']
            phone = request.form['phone']
            fax = request.form['fax']
            chief = request.form['chief']
            
            org_model = Org('organization', id=org_id, name=name, location=location, phone=phone,
                fax=fax, chief=chief)

            try:
                db_data = org_model.update()
                if db_data['success']:
                    return '<script>alert("성공적으로 수정했습니다.");\n location.href="./organization";</script>'
                else:
                    return render_template('admin/sthwrong.html')
            except Exception as e:
                return '<script>alert("오류가 발생했습니다.\n ' + str(e) + '");\n location.href="./new";</script>'
    else:
        return redirect(url_for('admin.login'))

@bp.route('/general/history')
def general_history():
    isLogin = login_check()
    if isLogin:
        page = int(request.args.get('page', '1'))

        logs_model = Logs('logs')

        try:
            db_data = logs_model.read_recent_data_page((int(page) - 1) * 10, 10)
            if db_data['success']:
                result = db_data['result']
                msg = ''
            else:
                result = ''
                msg = db_data[0]['msg']
        except Exception as e:
            result = ''
            msg = str(e)
        
        return render_template('admin/general/history.html', isLogin = True,
            username = session['username'], realname = session['realname'],
            description = session['description'], level = session['level'],
            result = result, msg = msg, page = page)
    else:
        return redirect(url_for('admin.login'))

@bp.route('/account/new', methods = ['POST', 'GET'])
def account_new():
    isLogin = login_check()
    if isLogin:
        if request.method == 'GET':
            return render_template('admin/account/new.html', isLogin = True,
                username = session['username'], realname = session['realname'],
                description = session['description'], level = session['level'])
        elif request.method == 'POST':
            username = request.form['username']
            realname = request.form['realname']
            description = request.form['description']
            level = int(request.form['level'])
            password = request.form['password']
            deactivated = False
            if request.form.get('deactivated'):
                deactivated = bool(request.form['deactivated'])

            hashed_pw = generate_password_hash(password)
            users_model = Users('users', username=username, realname=realname, description=description,
                password=hashed_pw, level=level, deactivated=deactivated)
            
            # 중복 체크
            exist_check = users_model.getUser()
            if exist_check:
                return '<script>alert("해당하는 아이디가 이미 존재합니다. 다른 아이디로 시도하십시오.");\n location.href="./new";</script>'

            try:
                db_data = users_model.create()
                if db_data['success']:
                    return '<script>alert("성공적으로 추가했습니다.");\n location.href="./new";</script>'
                else:
                    return render_template('admin/sthwrong.html')
            except Exception as e:
                return '<script>alert("오류가 발생했습니다.\n ' + str(e) + '");\n location.href="./new";</script>'
    else:
        return redirect(url_for('admin.login'))

@bp.route('/account/edit', methods = ['POST', 'GET'])
def account_edit():
    isLogin = login_check()
    if isLogin:
        if request.method == 'GET':
            selected_id = request.args.get('selected', '')
            page = int(request.args.get('page', '1'))

            users_model = Cnts('users')

            try:
                db_data = users_model.read_page((int(page) - 1) * 10, 10)
                if db_data['success']:
                    result = db_data['result']
                    msg = ''
                else:
                    result = ''
                    msg = db_data[0]['msg']
            except Exception as e:
                result = ''
                msg = str(e)

            selected_doc = None
            if (selected_id != '') and (result != ''):
                for data in result:
                    if data['id'] == selected_id:
                        selected_doc = data
                        break

            return render_template('admin/account/edit.html', isLogin = True,
                username = session['username'], realname = session['realname'],
                description = session['description'], level = session['level'],
                result = result, msg = msg, page = page, selected_id = selected_id, selected_doc = selected_doc)
        elif request.method == 'POST':
            user_id = request.form['id']
            username = request.form['username']
            realname = request.form['realname']
            description = request.form['description']
            level = int(request.form['level'])
            password = request.form['password']
            deactivated = False
            if request.form.get('deactivated'):
                deactivated = bool(request.form['deactivated'])
            
            user_model = None
            if password == '':
                users_model = Users('users', id=user_id, username=username, realname=realname, description=description,
                    level=level, deactivated=deactivated)
            else:
                hashed_pw = generate_password_hash(password)
                users_model = Users('users', id=user_id, username=username, realname=realname, description=description,
                    password=hashed_pw, level=level, deactivated=deactivated)

            try:
                db_data = users_model.update()
                if db_data['success']:
                    return '<script>alert("성공적으로 수정했습니다.");\n location.href="./edit";</script>'
                else:
                    return render_template('admin/sthwrong.html')
            except Exception as e:
                return '<script>alert("오류가 발생했습니다.\n ' + str(e) + '");\n location.href="./edit";</script>'
    else:
        return redirect(url_for('admin.login'))

@bp.route('/account/delete', methods = ['POST', 'GET'])
def account_delete():
    isLogin = login_check()
    if isLogin:
        if request.method == 'GET':
            return render_template('admin/sthwrong.html')
        elif request.method == 'POST':
            if session['level'] > 0: # 레벨 1부터 가능
                user_id = request.form['id']
                if request.form.get('confirm') == 'True':
                    users_model = Users('users', id=user_id)
                    
                    try:
                        db_data = users_model.delete()
                        if db_data['success']:
                            return '<script>alert("성공적으로 삭제했습니다.");\n location.href="./edit";</script>'
                        else:
                            return render_template('admin/sthwrong.html')
                    except Exception as e:
                        return '<script>alert("오류가 발생했습니다.\n ' + str(e) + '");\n location.href="./edit";</script>'
                else:
                    return '<script>alert("확인란에 체크하셔야 삭제할 수 있습니다.");\n history.go(-1);</script>'
            else:
                return '<script>alert("권한이 없습니다.");\n history.go(-1);</script>'
    else:
        return redirect(url_for('admin.login'))

@bp.route('/account/register-onoff', methods = ['POST', 'GET'])
def account_register_toggle():
    isLogin = login_check()
    if isLogin:
        if request.method == 'GET':
            org_model = Org('organization')
            
            try:
                db_data = org_model.read_all()
                if db_data['success']:
                    result = db_data['result'][0]
                    msg = ''
                else:
                    result = ''
                    msg = db_data[0]['msg']
            except Exception as e:
                result = ''
                msg = str(e)

            return render_template('admin/account/register-onoff.html', isLogin = True,
                username = session['username'], realname = session['realname'],
                description = session['description'], level = session['level'],
                result = result, msg = msg)
        elif request.method == 'POST':
            org_id = request.form['id']
            register_on = False
            if request.form.get('register_on'):
                register_on = bool(request.form['register_on'])
                
            org_model = Org('organization', id=org_id, register_on=register_on)

            try:
                db_data = org_model.update()
                if db_data['success']:
                    return '<script>alert("성공적으로 수정했습니다.");\n location.href="./register-onoff";</script>'
                else:
                    return render_template('admin/sthwrong.html')
            except Exception as e:
                return '<script>alert("오류가 발생했습니다.\n ' + str(e) + '");\n location.href="./register-onoff";</script>'
    else:
        return redirect(url_for('admin.login'))

@bp.route('/cnt/new', methods = ['POST', 'GET'])
def cnt_new():
    isLogin = login_check()
    if isLogin:
        if request.method == 'GET':
            return render_template('admin/cnt/new.html', isLogin = True,
                username = session['username'], realname = session['realname'],
                description = session['description'], level = session['level'])
        elif request.method == 'POST':
            name = request.form['name']
            birth = request.form['birth']
            outer_product = request.form['outer_product']
            inner_product = request.form['inner_product']
            description = request.form['description']
            deactivated = False
            if request.form.get('deactivated'):
                deactivated = bool(request.form['deactivated'])

            try:
                birth_parsed = datetime.strptime(birth + " +0900", '%Y-%m-%d %z')
            except:
                return '<script>alert("날짜를 형식에 맞춰 입력하지 않았습니다.");\n history.go(-1);</script>'

            cnts_model = Cnts('cnts', name=name, birth=birth_parsed, description=description,
                inner_product=inner_product, outer_product=outer_product, deactivated=deactivated)
            
            try:
                db_data = cnts_model.create()
                if db_data['success']:
                    return '<script>alert("성공적으로 추가했습니다.");\n location.href="./new";</script>'
                else:
                    return render_template('admin/sthwrong.html')
            except Exception as e:
                return '<script>alert("오류가 발생했습니다.\n ' + str(e) + '");\n location.href="./new";</script>'
    else:
        return redirect(url_for('admin.login'))

@bp.route('/cnt/edit', methods = ['POST', 'GET'])
def cnt_edit():
    isLogin = login_check()
    if isLogin:
        if request.method == 'GET':
            selected_id = request.args.get('selected', '')
            page = int(request.args.get('page', '1'))

            cnts_model = Cnts('cnts')

            try:
                db_data = cnts_model.read_page_including_deactivated((int(page) - 1) * 10, 10)
                if db_data['success']:
                    result = db_data['result']
                    msg = ''
                else:
                    result = ''
                    msg = db_data[0]['msg']
            except Exception as e:
                result = ''
                msg = str(e)

            selected_doc = None
            if (selected_id != '') and (result != ''):
                for data in result:
                    if data['id'] == selected_id:
                        selected_doc = data
                        break

            return render_template('admin/cnt/edit.html', isLogin = True,
                username = session['username'], realname = session['realname'],
                description = session['description'], level = session['level'],
                result = result, msg = msg, page = page, selected_id = selected_id, selected_doc = selected_doc)
        elif request.method == 'POST':
            cnt_id = request.form['id']
            name = request.form['name']
            birth = request.form['birth']
            outer_product = request.form['outer_product']
            inner_product = request.form['inner_product']
            description = request.form['description']
            deactivated = False
            if request.form.get('deactivated'):
                deactivated = bool(request.form['deactivated'])

            try:
                birth_parsed = datetime.strptime(birth + " +0900", '%Y-%m-%d %z')
            except:
                return '<script>alert("날짜를 형식에 맞춰 입력하지 않았습니다.");\n history.go(-1);</script>'

            cnts_model = Cnts('cnts', id=cnt_id, name=name, birth=birth_parsed, description=description,
                inner_product=inner_product, outer_product=outer_product, deactivated=deactivated)
            

            try:
                db_data = cnts_model.update()
                if db_data['success']:
                    return '<script>alert("성공적으로 추가했습니다.");\n location.href="./edit";</script>'
                else:
                    return render_template('admin/sthwrong.html')
            except Exception as e:
                return '<script>alert("오류가 발생했습니다.\n ' + str(e) + '");\n location.href="./new";</script>'
    else:
        return redirect(url_for('admin.login'))

@bp.route('/cnt/delete', methods = ['POST', 'GET'])
def cnt_delete():
    isLogin = login_check()
    if isLogin:
        if request.method == 'GET':
            return render_template('admin/sthwrong.html')
        elif request.method == 'POST':
            if session['level'] > 0: # 레벨 1부터 가능
                cnt_id = request.form['id']
                if request.form.get('confirm') == 'True':
                    cnts_model = Cnts('cnts', id=cnt_id)
                    
                    try:
                        db_data = cnts_model.delete()
                        if db_data['success']:
                            return '<script>alert("성공적으로 추가했습니다.");\n location.href="./edit";</script>'
                        else:
                            return render_template('admin/sthwrong.html')
                    except Exception as e:
                        return '<script>alert("오류가 발생했습니다.\n ' + str(e) + '");\n location.href="./edit";</script>'
                else:
                    return '<script>alert("확인란에 체크하셔야 삭제할 수 있습니다.");\n history.go(-1);</script>'
            else:
                return '<script>alert("권한이 없습니다.");\n history.go(-1);</script>'
    else:
        return redirect(url_for('admin.login'))

@bp.route('/db/backup', methods = ['POST', 'GET'])
def db_backup():
    isLogin = login_check()
    if isLogin:
        if request.method == 'GET':
            return render_template('admin/db/backup.html', isLogin = True,
                username = session['username'], realname = session['realname'],
                description = session['description'], level = session['level'])
        elif request.method == 'POST':
            return 'POST REQUEST'
    else:
        return redirect(url_for('admin.login'))