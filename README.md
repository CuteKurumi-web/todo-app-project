📝 Full-stack Todo List App
프론트엔드(React), 백엔드(Node.js), 데이터베이스(MongoDB)를 연결한 풀스택 할 일 관리 애플리케이션입니다.

Vercel을 통해 자동 배포 환경을 구축하였으며, 소프트웨어공학 프로세스에 따라 개발되었습니다.

🚀 바로가기
배포 주소: [todo-app-project-liard.vercel.app]

GitHub: [(https://github.com/CuteKurumi-web/todo-app-project.git)]

🛠 사용 기술 스택 (Tech Stack)
Frontend
React (Vite): 빠르고 현대적인 UI 라이브러리

Axios: 백엔드 API와의 통신을 위한 HTTP 클라이언트

Tailwind CSS: 효율적인 UI 스타일링

Backend
Node.js & Express: 안정적인 REST API 서버 구축

Mongoose: MongoDB 객체 모델링 도구

Database & Deploy
MongoDB Atlas: 클라우드 NoSQL 데이터베이스

Vercel: 프론트엔드와 백엔드(Serverless Functions) 통합 배포

✨ 핵심 기능 (MVP)
할 일 추가: 제목을 입력하여 리스트에 새로운 Todo 생성

목록 조회: DB에 저장된 할 일 목록을 실시간으로 렌더링

완료 체크: 할 일 완료 시 상태 변경 및 DB 반영

할 일 삭제: 리스트에서 항목 제거 및 DB 데이터 삭제

🏗 프로젝트 구조 (Monorepo)
Plaintext
todo-app/
├── frontend/          # React + Vite 소스 코드
├── backend/           # Express API 서버 코드
├── vercel.json        # Vercel 배포 설정 파일
└── README.md          # 프로젝트 문서
💡 주요 트러블슈팅 (AI 활용 및 디버깅)
1. Vercel 경로 인식 문제 (404 Error)
문제: 배포 후 /api/todos 경로를 찾지 못하는 현상 발생.

해결: vercel.json에서 rewrites 설정을 통해 프론트엔드와 백엔드 경로를 정확히 라우팅하여 해결.

2. MongoDB IP Access 문제
문제: 로컬에서는 연결되나 서버 배포 시 DB 연결 실패.

해결: MongoDB Atlas Network Access에서 0.0.0.0/0을 허용하여 배포 서버의 IP를 수용함.

3. 생성형 AI (Gemini) 활용
복잡한 vercel.json 설정과 배포 과정에서의 에러 스크린샷을 AI에게 공유하여 실시간으로 디버깅을 진행. 단순 코드 작성을 넘어 인프라 설정 오류를 해결하는 데 적극 활용함.

📅 마감 및 제출 정보
제출 기한: 2026년 4월 10일

개발 기간: 3주 (학습 및 구현 포함)