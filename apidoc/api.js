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