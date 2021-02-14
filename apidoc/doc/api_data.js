define({ "api": [
  {
    "type": "post",
    "url": "/api/auth/exist/:username",
    "title": "아이디 중복 검사",
    "name": "Check-Username",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>검사할 아이디</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "exists",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>결과 메시지</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"exists\": true,\n  \"msg\": \"already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "로그인",
    "name": "Login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>유저 아이디</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>비밀번호</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"admin\",\n  \"password\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>유저 아이디</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>엑세스 토큰</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"username\": \"admin\",\n  \"access_token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTMzMDY2NjIsIm5iZiI6MTYxMzMwNjY2MiwianRpIjoiN2VjMjZlMTQtMjEyNC00MzQzLWJjZmUtNjY5ZGE1MGViZDg2IiwiZXhwIjoxNjEzOTExNDYyLCJpZGVudGl0eSI6ImxpbW9yYmVhciIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImxldmVsIjoyfSwiY3NyZiI6IjM5N2FiNWFhLTZiMzktNGJhNy1iNjYyLWRhZjgyMjIzM2RiOSJ9.51P5XR-05JTWLG5L2GAhOcRMfKQOYGtyS7sEhP-UiDI\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>에러 메시지</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"success\": false,\n  \"msg\": \"Wrong username or password.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/auth/loginc",
    "title": "로그인(http-only 쿠키)",
    "name": "LoginC",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>유저 아이디</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>비밀번호</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"admin\",\n  \"password\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>결과 메시지</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"msg\": \"You loged in.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>에러 메시지</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"success\": false,\n  \"msg\": \"Wrong username or password.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/auth/logoutc",
    "title": "로그아웃(http-only 쿠키)",
    "name": "LogoutC",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>결과 메시지</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"msg\": \"You loged out.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/auth/refreshc",
    "title": "쿠키 리프레시(http-only 쿠키)",
    "name": "Refresh-Cookie",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>결과 메시지</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"msg\": \"refreshed cookie\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/auth/register",
    "title": "계정 등록",
    "name": "Register",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>유저 아이디</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>비밀번호</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "realname",
            "description": "<p>실제 이름</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>계정 설명</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"admin\",\n  \"password\": \"1234\",\n  \"realname\": \"홍길동\",\n  \"description\": \"사회보장팀 팀장\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>에러 메시지</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"success\": false,\n  \"msg\": \"The username already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Auth"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "E:\\Projects\\2021\\diapers-backend\\apidoc\\doc\\main.js",
    "groupTitle": "E:\\Projects\\2021\\diapers-backend\\apidoc\\doc\\main.js",
    "name": ""
  }
] });