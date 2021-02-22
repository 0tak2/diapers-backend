/**
 * @api {post} /api/auth/login 로그인
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam (Request Body) {String} username 유저 아이디
 * @apiParam (Request Body) {String} password 비밀번호
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "admin",
 *       "password": "1234"
 *     }
 * 
 * 
 * @apiSuccess {Boolean} success      요청 성공 여부
 * @apiSuccess {String}  username     유저 아이디
 * @apiSuccess {String}  access_token 엑세스 토큰
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "username": "admin",
 *       "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTMzMDY2NjIsIm5iZiI6MTYxMzMwNjY2MiwianRpIjoiN2VjMjZlMTQtMjEyNC00MzQzLWJjZmUtNjY5ZGE1MGViZDg2IiwiZXhwIjoxNjEzOTExNDYyLCJpZGVudGl0eSI6ImxpbW9yYmVhciIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImxldmVsIjoyfSwiY3NyZiI6IjM5N2FiNWFhLTZiMzktNGJhNy1iNjYyLWRhZjgyMjIzM2RiOSJ9.51P5XR-05JTWLG5L2GAhOcRMfKQOYGtyS7sEhP-UiDI"
 *     }
 *
 * @apiError {Boolean} success 요청 성공 여부
 * @apiError {String}  msg     에러 메시지
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "success": false,
 *       "msg": "Wrong username or password."
 *     }
 */

 /**
 * @api {post} /api/auth/register 계정 등록
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiParam (Request Body) {String} username    유저 아이디
 * @apiParam (Request Body) {String} password    비밀번호
 * @apiParam (Request Body) {String} realname    실제 이름
 * @apiParam (Request Body) {String} description 계정 설명
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "admin",
 *       "password": "1234",
 *       "realname": "홍길동",
 *       "description": "사회보장팀 팀장"
 *     }
 * 
 * 
 * @apiSuccess {Boolean} success      요청 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 *
 * @apiError {Boolean} success 요청 성공 여부
 * @apiError {String}  msg     에러 메시지
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "success": false,
 *       "msg": "The username already exists"
 *     }
 */

 /**
 * @api {post} /api/auth/exist/:username 아이디 중복 검사
 * @apiName Check-Username
 * @apiGroup Auth
 *
 * @apiParam {String} username 검사할 아이디
 * 
 * @apiSuccess {Boolean} exists 요청 성공 여부
 * @apiSuccess {String}  msg    결과 메시지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "exists": true,
 *       "msg": "already exists"
 *     }
 */

 /**
 * @api {post} /api/auth/loginc 로그인(http-only 쿠키)
 * @apiName LoginC
 * @apiGroup Auth
 *
 * @apiParam (Request Body) {String} username 유저 아이디
 * @apiParam (Request Body) {String} password 비밀번호
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "admin",
 *       "password": "1234"
 *     }
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 * @apiSuccess {String}  msg     결과 메시지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "msg": "You loged in."
 *     }
 *
 * @apiError {Boolean} success 요청 성공 여부
 * @apiError {String}  msg     에러 메시지
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "success": false,
 *       "msg": "Wrong username or password."
 *     }
 */

 /**
 * @api {post} /api/auth/logoutc 로그아웃(http-only 쿠키)
 * @apiName LogoutC
 * @apiGroup Auth
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 * @apiSuccess {String}  msg     결과 메시지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "msg": "You loged out."
 *     }
 */

/**
 * @api {post} /api/auth/refreshc 쿠키 리프레시(http-only 쿠키)
 * @apiName Refresh-Cookie
 * @apiGroup Auth
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 * @apiSuccess {String}  msg     결과 메시지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "msg": "refreshed cookie"
 *     }
 */

 /**
 * @api {post} /api/cnts 이용자 추가
 * @apiName Post-New-Cnt
 * @apiGroup Cnts
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 *
 * @apiParam (Request Body) {String} name          이용자 이름
 * @apiParam (Request Body) {String} birth         이용자 생년월일 (YYYY-MM-DD)
 * @apiParam (Request Body) {String} description   이용자 설명
 * @apiParam (Request Body) {String} inner_product 기본 사용 속기저귀 제품명
 * @apiParam (Request Body) {String} outer_product 기본 사용 겉기저귀 제품명
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "홍길동",
 *       "birth": "2000-01-01",
 *       "description": "2층 A실 이용자",
 *       "inner_product": "봄날 대형 패드",
 *       "outer_product": "봄날 대형 테이프"
 *     }
 * 
 * 
 * @apiSuccess {Boolean} success      요청 성공 여부
 * @apiSuccess {String}  username     유저 아이디
 * @apiSuccess {String}  access_token 엑세스 토큰
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 *
 * @apiError {Boolean} [success] 요청 성공 여부
 * @apiError {String}  msg     에러 메시지
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "msg": "Missing required parameter in the JSON body"
 *     }
 */

/**
 * @api {get} /api/cnts/:cnt_id 이용자 조회
 * @apiName Get-Cnt-Info
 * @apiGroup Cnts
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 *
 * @apiParam {String} cnt_id 이용자 도큐먼트 id
 * 
 * @apiSuccess {Boolean} success      요청 성공 여부
 * @apiSuccess {String}  username     유저 아이디
 * @apiSuccess {String}  access_token 엑세스 토큰
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "result": "{'inner_product': '봄날 대형 패드', 'deactivated': False, 'description': '2층 A실 이용자', 'name': '홍길동', 'outer_product': '봄날 대형 테이프', 'birth': '1998-02-23T00:00:00+00:00'}"
 *     }
 */

/**
 * @api {patch} /api/cnts/:cnt_id 이용자 정보 수정
 * @apiName Patch-Cnt
 * @apiGroup Cnts
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 * @apiDescription 이용자의 정보를 수정한다. 수정하고 싶은 필드의 데이터만 body에 담아서 요청한다.
 *
 * @apiParam {String} cnt_id 이용자 도큐먼트 id
 * @apiParam (Request Body) {String} [name]          이용자 이름
 * @apiParam (Request Body) {String} [birth]         이용자 생년월일 (YYYY-MM-DD)
 * @apiParam (Request Body) {String} [description]   이용자 설명
 * @apiParam (Request Body) {String} [inner_product] 기본 사용 속기저귀 제품명
 * @apiParam (Request Body) {String} [outer_product] 기본 사용 겉기저귀 제품명
 * @apiParam (Request Body) {String} [deacivated]    비활성화 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *       "inner_product": "봄날 특대형 패드",
 *       "outer_product": "봄날 특대형 테이프"
 *     }
 * 
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 */

/**
 * @api {delete} /api/cnts/:cnt_id 이용자 정보 삭제
 * @apiName Delete-Cnt-Info
 * @apiGroup Cnts
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 * @apiPermission >= level 1
 *
 * @apiParam {String} cnt_id 이용자 도큐먼트 id
 * 
 * @apiSuccess {Boolean} success      요청 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *     }
 */

/**
 * @api {get} /api/cnts 전체 이용자 조회
 * @apiName Get-All-Cnt-List
 * @apiGroup Cnts
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 * @apiSuccess {List}    result  조회 결과
 */

/**
 * @api {get} /api/cnts?page=:page&size=:size 이용자 조회
 * @apiName Get-Cnt-List
 * @apiGroup Cnts
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 *
 * @apiParam {Number} page 페이지
 * @apiParam {Number} size 한 페이지 당 표시 개수
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 * @apiSuccess {List}    result  조회 결과
 * @apiSuccess {Boolean} last    마지막 페이지 여부
 */

/**
 * @api {post} /api/logs 로그 추가
 * @apiName Post-New-Log
 * @apiGroup Logs
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 *
 * @apiParam (Request Body) {String} cnt          이용자 도큐먼트 id
 * @apiParam (Request Body) {String} time         기록 시간 (YYYY-MM-DD HH:MM)
 * @apiParam (Request Body) {Number} inner_opened 개봉 속기저귀 재고량
 * @apiParam (Request Body) {Number} inner_new    미개봉 속기저귀 재고량
 * @apiParam (Request Body) {Number} outer_opened 개봉 겉기저귀 재고량
 * @apiParam (Request Body) {Number} outer_new    미개봉 겉기저귀 재고량
 * @apiParam (Request Body) {String} comment      비고
 * @apiParamExample {json} Request-Example:
 *     {
 *     }
 * 
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 */

/**
 * @api {get} /api/logs/:log_id 로그 조회
 * @apiName Get-Log-Info
 * @apiGroup Logs
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 *
 * @apiParam {String} log_id 이용자 도큐먼트 id
 * 
 * @apiSuccess {Boolean} success      요청 성공 여부
 * @apiSuccess {String} cnt          이용자 도큐먼트 id
 * @apiSuccess {String} time         기록 시간 (YYYY-MM-DD HH:MM)
 * @apiSuccess {Number} inner_opened 개봉 속기저귀 재고량
 * @apiSuccess {Number} inner_new    미개봉 속기저귀 재고량
 * @apiSuccess {Number} outer_opened 개봉 겉기저귀 재고량
 * @apiSuccess {Number} outer_new    미개봉 겉기저귀 재고량
 * @apiSuccess {String} comment      비고
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *    
 *     }
 */

/**
 * @api {patch} /api/logs/:log_id 이용자 정보 수정
 * @apiName Patch-Log
 * @apiGroup Logs
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 * @apiDescription 로그 정보를 수정한다. 수정하고 싶은 필드의 데이터만 body에 담아서 요청한다.
 *
 * @apiParam {String} log_id 로그 도큐먼트 id
 * @apiParam (Request Body) {String} [cnt]          이용자 도큐먼트 id
 * @apiParam (Request Body) {String} [time]         기록 시간 (YYYY-MM-DD HH:MM)
 * @apiParam (Request Body) {Number} [inner_opened] 개봉 속기저귀 재고량
 * @apiParam (Request Body) {Number} [inner_new]    미개봉 속기저귀 재고량
 * @apiParam (Request Body) {Number} [outer_opened] 개봉 겉기저귀 재고량
 * @apiParam (Request Body) {Number} [outer_new]    미개봉 겉기저귀 재고량
 * @apiParam (Request Body) {String} [comment]      비고
 * @apiParamExample {json} Request-Example:
 *     {
 *     }
 * 
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 */

/**
 * @api {delete} /api/logs/:log_id 이용자 정보 삭제
 * @apiName Delete-Log-Info
 * @apiGroup Logs
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 * @apiPermission >= level 1
 *
 * @apiParam {String} log_id 이용자 도큐먼트 id
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *     }
 */

/**
 * @api {get} /api/logs/cnt/cnt_id 이용자별 전체 로그 조회
 * @apiName Get-All-Log-List
 * @apiGroup Logs
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 * 
 * @apiParam {String} cnt_id 이용자 도큐먼트 id
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 * @apiSuccess {List}    result  조회 결과
 */

/**
 * @api {get} /api/logs/cnt/cnt_id?page=:page&size=:size 이용자별 로그 리스트 조회
 * @apiName Get-Log-List
 * @apiGroup Logs
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 *
 * @apiParam {String} cnt_id 이용자 도큐먼트 id
 * @apiParam {Number} page 페이지
 * @apiParam {Number} size 한 페이지 당 표시 개수
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 * @apiSuccess {List}    result  조회 결과
 * @apiSuccess {Boolean} last    마지막 페이지 여부
 */

 /**
 * @api {post} /api/users 사용자 추가
 * @apiName Post-New-User
 * @apiGroup Users
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 * @apiPermission >= level 1
 *
 * @apiParam (Request Body) {String} username    유저 아이디
 * @apiParam (Request Body) {String} password    비밀번호
 * @apiParam (Request Body) {String} realname    실제 이름
 * @apiParam (Request Body) {String} description 계정 설명
 * @apiParam (Request Body) {String} level       계정 권한 (2 = 시스템 관리자, 1 = 매니저, 0 = 일반 직원)
 * @apiParam (Request Body) {String} deactivated 비활성화 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *       
 *     }
 * 
 * 
 * @apiSuccess {Boolean} success      요청 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 */

/**
 * @api {get} /api/users/:user_id 사용자 조회
 * @apiName Get-User-Info
 * @apiGroup Users
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 *
 * @apiParam {String} user_id 사용자 도큐먼트 id
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     
 *     }
 */

/**
 * @api {patch} /api/users/:user_id 사용자 정보 수정
 * @apiName Patch-User
 * @apiGroup Users
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 * @apiDescription 사용자의 정보를 수정한다. 수정하고 싶은 필드의 데이터만 body에 담아서 요청한다.
 *
 * @apiPermission >= level 1
 *
 * @apiParam {String} user_id                      도큐먼트 아이디
 * @apiParam (Request Body) {String} [username]    유저 아이디
 * @apiParam (Request Body) {String} [password]    비밀번호
 * @apiParam (Request Body) {String} [realname]    실제 이름
 * @apiParam (Request Body) {String} [description] 계정 설명
 * @apiParam (Request Body) {String} [level]       계정 권한 (2 = 시스템 관리자, 1 = 매니저, 0 = 일반 직원)
 * @apiParam (Request Body) {String} [deactivated] 비활성화 여부
 * @apiParamExample {json} Request-Example:
 *     {
 *       
 *     }
 * 
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 */

/**
 * @api {delete} /api/users/:user_id 사용자 정보 삭제
 * @apiName Delete-User-Info
 * @apiGroup Users
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 * @apiPermission >= level 1
 *
 * @apiParam {String} user_id 사용자 도큐먼트 id
 * 
 * @apiSuccess {Boolean} success      요청 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *     }
 */

/**
 * @api {get} /api/users 전체 사용자 조회
 * @apiName Get-All-User-List
 * @apiGroup Users
 * @apiHeader Authorization Bearer <JWT_TOKEN>
 * 
 * @apiSuccess {Boolean} success 요청 성공 여부
 * @apiSuccess {List}    result  조회 결과
 */
