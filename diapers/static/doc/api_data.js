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
    "type": "delete",
    "url": "/api/cnts/:cnt_id",
    "title": "이용자 정보 삭제",
    "name": "Delete-Cnt-Info",
    "group": "Cnts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": ">= level 1"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cnt_id",
            "description": "<p>이용자 도큐먼트 id</p>"
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
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Cnts"
  },
  {
    "type": "get",
    "url": "/api/cnts",
    "title": "전체 이용자 조회",
    "name": "Get-All-Cnt-List",
    "group": "Cnts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
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
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "result",
            "description": "<p>조회 결과</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Cnts"
  },
  {
    "type": "get",
    "url": "/api/cnts/:cnt_id",
    "title": "이용자 조회",
    "name": "Get-Cnt-Info",
    "group": "Cnts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cnt_id",
            "description": "<p>이용자 도큐먼트 id</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"result\": \"{'inner_product': '봄날 대형 패드', 'deactivated': False, 'description': '2층 A실 이용자', 'name': '홍길동', 'outer_product': '봄날 대형 테이프', 'birth': '1998-02-23T00:00:00+00:00'}\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Cnts"
  },
  {
    "type": "get",
    "url": "/api/cnts?page=:page&size=:size",
    "title": "이용자 조회",
    "name": "Get-Cnt-List",
    "group": "Cnts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>페이지</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>한 페이지 당 표시 개수</p>"
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
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "result",
            "description": "<p>조회 결과</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "last",
            "description": "<p>마지막 페이지 여부</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Cnts"
  },
  {
    "type": "patch",
    "url": "/api/cnts/:cnt_id",
    "title": "이용자 정보 수정",
    "name": "Patch-Cnt",
    "group": "Cnts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "description": "<p>이용자의 정보를 수정한다. 수정하고 싶은 필드의 데이터만 body에 담아서 요청한다.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cnt_id",
            "description": "<p>이용자 도큐먼트 id</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>이용자 이름</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "birth",
            "description": "<p>이용자 생년월일 (YYYY-MM-DD)</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>이용자 설명</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "inner_product",
            "description": "<p>기본 사용 속기저귀 제품명</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "outer_product",
            "description": "<p>기본 사용 겉기저귀 제품명</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "deacivated",
            "description": "<p>비활성화 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"inner_product\": \"봄날 특대형 패드\",\n  \"outer_product\": \"봄날 특대형 테이프\"\n}",
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
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Cnts"
  },
  {
    "type": "post",
    "url": "/api/cnts",
    "title": "이용자 추가",
    "name": "Post-New-Cnt",
    "group": "Cnts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>이용자 이름</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "birth",
            "description": "<p>이용자 생년월일 (YYYY-MM-DD)</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>이용자 설명</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "inner_product",
            "description": "<p>기본 사용 속기저귀 제품명</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "outer_product",
            "description": "<p>기본 사용 겉기저귀 제품명</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"홍길동\",\n  \"birth\": \"2000-01-01\",\n  \"description\": \"2층 A실 이용자\",\n  \"inner_product\": \"봄날 대형 패드\",\n  \"outer_product\": \"봄날 대형 테이프\"\n}",
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
            "optional": true,
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
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"msg\": \"Missing required parameter in the JSON body\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Cnts"
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
  },
  {
    "type": "delete",
    "url": "/api/logs/:log_id",
    "title": "이용자 정보 삭제",
    "name": "Delete-Log-Info",
    "group": "Logs",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": ">= level 1"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "log_id",
            "description": "<p>이용자 도큐먼트 id</p>"
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
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Logs"
  },
  {
    "type": "get",
    "url": "/api/logs/cnt/cnt_id",
    "title": "이용자별 전체 로그 조회",
    "name": "Get-All-Log-List",
    "group": "Logs",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cnt_id",
            "description": "<p>이용자 도큐먼트 id</p>"
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
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "result",
            "description": "<p>조회 결과</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Logs"
  },
  {
    "type": "get",
    "url": "/api/logs/:log_id",
    "title": "로그 조회",
    "name": "Get-Log-Info",
    "group": "Logs",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "log_id",
            "description": "<p>이용자 도큐먼트 id</p>"
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
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cnt",
            "description": "<p>이용자 도큐먼트 id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>기록 시간 (YYYY-MM-DD)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "inner_opened",
            "description": "<p>개봉 속기저귀 재고량</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "inner_new",
            "description": "<p>미개봉 속기저귀 재고량</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "outer_opened",
            "description": "<p>개봉 겉기저귀 재고량</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "outer_new",
            "description": "<p>미개봉 겉기저귀 재고량</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>비고</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Logs"
  },
  {
    "type": "get",
    "url": "/api/logs/cnt/cnt_id?page=:page&size=:size",
    "title": "이용자별 로그 리스트 조회",
    "name": "Get-Log-List",
    "group": "Logs",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cnt_id",
            "description": "<p>이용자 도큐먼트 id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>페이지</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>한 페이지 당 표시 개수</p>"
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
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "result",
            "description": "<p>조회 결과</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "last",
            "description": "<p>마지막 페이지 여부</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Logs"
  },
  {
    "type": "patch",
    "url": "/api/logs/:log_id",
    "title": "이용자 정보 수정",
    "name": "Patch-Log",
    "group": "Logs",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "description": "<p>로그 정보를 수정한다. 수정하고 싶은 필드의 데이터만 body에 담아서 요청한다.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "log_id",
            "description": "<p>로그 도큐먼트 id</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "cnt",
            "description": "<p>이용자 도큐먼트 id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "time",
            "description": "<p>기록 시간 (YYYY-MM-DD)</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": true,
            "field": "inner_opened",
            "description": "<p>개봉 속기저귀 재고량</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": true,
            "field": "inner_new",
            "description": "<p>미개봉 속기저귀 재고량</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": true,
            "field": "outer_opened",
            "description": "<p>개봉 겉기저귀 재고량</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": true,
            "field": "outer_new",
            "description": "<p>미개봉 겉기저귀 재고량</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "comment",
            "description": "<p>비고</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n}",
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
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Logs"
  },
  {
    "type": "post",
    "url": "/api/logs",
    "title": "로그 추가",
    "name": "Post-New-Log",
    "group": "Logs",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "cnt",
            "description": "<p>이용자 도큐먼트 id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>기록 시간 (YYYY-MM-DD)</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "inner_opened",
            "description": "<p>개봉 속기저귀 재고량</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "inner_new",
            "description": "<p>미개봉 속기저귀 재고량</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "outer_opened",
            "description": "<p>개봉 겉기저귀 재고량</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "outer_new",
            "description": "<p>미개봉 겉기저귀 재고량</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>비고</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n}",
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
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Logs"
  },
  {
    "type": "delete",
    "url": "/api/users/:user_id",
    "title": "사용자 정보 삭제",
    "name": "Delete-User-Info",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": ">= level 1"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>사용자 도큐먼트 id</p>"
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
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "전체 사용자 조회",
    "name": "Get-All-User-List",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
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
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "result",
            "description": "<p>조회 결과</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users/:user_id",
    "title": "사용자 조회",
    "name": "Get-User-Info",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>사용자 도큐먼트 id</p>"
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
            "field": "success",
            "description": "<p>요청 성공 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "patch",
    "url": "/api/users/:user_id",
    "title": "사용자 정보 수정",
    "name": "Patch-User",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "description": "<p>사용자의 정보를 수정한다. 수정하고 싶은 필드의 데이터만 body에 담아서 요청한다.</p>",
    "permission": [
      {
        "name": ">= level 1"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>도큐먼트 아이디</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>유저 아이디</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>비밀번호</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "realname",
            "description": "<p>실제 이름</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>계정 설명</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "level",
            "description": "<p>계정 권한 (2 = 시스템 관리자, 1 = 매니저, 0 = 일반 직원)</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "deactivated",
            "description": "<p>비활성화 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \n}",
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
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "사용자 추가",
    "name": "Post-New-User",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;JWT_TOKEN&gt;</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": ">= level 1"
      }
    ],
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
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>계정 권한 (2 = 시스템 관리자, 1 = 매니저, 0 = 일반 직원)</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "deactivated",
            "description": "<p>비활성화 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \n}",
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
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  }
] });
