# DB 구조
## 컬렉션 1: cnts
이용자 정보를 저장하는 컬렉션.

* id: 도큐먼트의 ID ([예시])humcF1RDivV1pI71Dz24)
* name [string]: 이용자의 이름 ([예시])임영택)
* birth [timestamp]: 이용자의 생년월일. 동명이인이 있을 경우 구분을 위해 만든 필드. 시간은 기본값인 12:00:00으로 지정. ([예시])1998년 4월 8일 오전 12시 0분 0초 UTC+9)
* description [string]: 이용자 설명 ([예시])2층 A실 이용)
* inner_product [string]: 속기저귀 제품명 ([예시])봄날 대형)
* outer_product [string]: 겉기저귀 제품명 ([예시])봄날 대형)
* deactivated [boolean]: 비활성화 여부. 퇴소 등의 이유로 시스템에서 표시하지 않기를 원하는 경우 true로 지정. ([예시])false)

## 컬렉션 2: users
서비스 로그인 유저([예시])일반적으로 직원)의 정보를 저장하는 컬렉션.

* id: 도큐먼트의 ID ([예시])kcKJmR1wEA0zv3wqz1uk)
* username [string]: 유저 아이디 ([예시])admin)
* password [string]: 유저 비밀번호. sha256으로 해시화하여 저장. ([예시])pbkdf2:sha256:150000$UhUweGXS$65078a6f54a16286536fffe26aba314f6bc0a0619c288b31ba54f2336ab67c09)
* realname [string]: 실제 이름 ([예시])관리자)
* level [number]: 계정의 권한을 지정함. 2 - 시스템 관리자 / 1 - 관리자 / 0 - 일반 계정 ([예시])2)
* description [string]: 유저 설명 ([예시])관리자 계정)
* deactivated [boolean]: 비활성화 여부. 퇴직 등의 이유로 시스템에서 표시하지 않기를 원하는 경우 true로 지정. ([예시])false)

## 컬렉션 2: logs
기저귀 재고 정보를 저장하는 컬렉션.

* id: 도큐먼트의 ID ([예시])7hCPzfVkP0vz903T8vf4)
* cnt [string]: 대상 이용자. cnts 컬렉션의 해당 이용자 도큐먼트의 id를 지정. ([예시])humcF1RDivV1pI71Dz24)
* date [timestamp]: 기록 현재 시간 ([예시])2021년 2월 7일 오전 9시 0분 0초 UTC+9)
* inner_opened [number]: 개봉된 속기저귀 팩 수 ([예시])1)
* inner_new [number]: 미개봉 속기저귀 팩 수 ([예시])10)
* outer_opened [number]: 개봉된 겉기저귀 팩 수 ([예시])1)
* outer_new [number]: 미개봉 속기저귀 팩 수 ([예시])10)
* comment [string]: 비고란 ([예시])10팩 입고)
* created_by [string]: 최초 기록한 유저의 username ([예시])admin)
* modified_by [string]: 마지막으로 수정한 유저의 username ([예시])admin)
* hidden [boolean]: 숨김 여부. 일반 계정의 삭제 요청은 바로 받아들여지지 않고 숨김 처리. 이후 관리자가 승인하면 삭제 처리. ([예시])false)



