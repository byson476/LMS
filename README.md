
#### 프로젝트명: JWT 기반 인증과 권한 관리를 적용한 학습 관리 시스템(LMS)
#### 개발자: 손보연  

---

## 목차
- [프로젝트 소개](#프로젝트-소개)
- [프로젝트 설계](#프로젝트-설계)
- [기술 스펙](#기술-스펙)
- [주요 기능](#주요-기능)
- [시스템 아키텍처](#시스템-아키텍처)
- [API 문서](#api-문서)
- [실행 방법](#실행-방법)
- [폴더 구조](#폴더-구조)
- [Advanced CI CD Pipeline](#advanced-ci-cd-pipeline)
- [LIMITREE 시연](#limitree-시연)

---

## 프로젝트 소개
**LMS**는 Learning Management System의 핵심 기능(학생의 강의 수강, 강사의 강의 등록, 관리자의 강의 및 사용자 관리)을 구현한 개인 프로젝트입니다.  
Mermaid로 설계하고, 프론트는 React 기반으로 UX를 구성했으며, 백엔드는 Spring Boot REST API로 도메인별 책임을 분리했습니다.

---

## 프로젝트 설계
Learning Management System (개인 프로젝트)
1. 요구사항 명세서 
#### [LMS 사용자 관리 (User Management)]
| ID | 요구사항명 | 상세 설명 | 관련 엔티티 |
|:---:|:---|:---|:---:|
USR-01 | 사용자 통합 관리 | 사용자 ID, 비밀번호, 성명, 이메일 등 기본 계정 정보 관리 | User |
USR-02 | 권한별 서브 타입 관리| 계정 유형에 따라 학생(Student), 강사(Tutor), 관리자(Admin) 정보 분리 관리	| Student, Tutor, Admin |
USR-03 | 접근 권한 제어| Spring Security와 연동하여 Role 기반(STUDENT, TUTOR, ADMIN) 페이지 접근 제어| UserRole |

#### [인사 관리 (Human Resources)]
| ID | 요구사항명 | 상세 설명 | 관련 엔티티 |
|:---:|:---|:---|:---:|
HR-01 | 강사 채용/이력 관리 |강 사 전공(Major), 고용일(HiredDate) 등 상세 인사 데이터 기록| Tutor |
HR-02 | 학생 학적 관리 | 학생 학년(Grade), 가입일 등 학적 상태 정보 관리| Student |

#### [강좌 및 수강 관리 (Course & Enrollment)]
| ID | 요구사항명 | 상세 설명 | 관련 엔티티 |
|:---:|:---|:---|:---:|
CRS-01 | 강좌 마스터 관리|강좌명, 설명, 최대 수강 인원, 시작일 등 강좌 기본 정보 관리|Course|
CRS-02|강사 매핑|각 강좌에 담당 강사(Tutor)를 배정하고 관리|Course, Tutor|
ENR-01|수강 신청 프로세스|학생이 원하는 강좌를 선택하여 수강 신청 및 목록 유지|CourseEnrollment|
ENR-02|수강 이력 기록|학생별, 강좌별 수강 신청 일자 및 상태 관리|CourseEnrollment|


2. 화면 정의서 (Wireframe / 화면설계서)

<img width="100" alt="관리자-강의관리" src="https://github.com/user-attachments/assets/518b2623-6728-4097-a5a5-4c82c681e3f4" />
<img width="100" alt="관리자-사용자관리" src="https://github.com/user-attachments/assets/ff9c7ce0-025e-42b8-8e8b-b6a31e84291e" />
<img width="100" alt="관리자-수강생관리" src="https://github.com/user-attachments/assets/857508c1-4abf-4f29-a697-1f1b60b558f9" />


3. (UML) 유스케이스 다이어그램 - Usecase Diagram 

<img width="1214" alt="LMS-유즈케이스" src="https://github.com/user-attachments/assets/603121e0-6150-4785-a6f8-10368ecfd7da" />


4. (UML) 시퀀스 다이어그램 - Sequence Diagram 

<img width="1214" alt="LMS-씨퀀스" src="https://github.com/user-attachments/assets/a199dfc5-ff25-4f93-ab0d-ce0f6e78a2e7" />



5. (UML) 클래스 다이어그램 - Class Diagram 

<img width="1214" alt="LMS-클래스" src="https://github.com/user-attachments/assets/5af9f6d7-4c0b-4e1f-8307-cb61e7ecd035" />


6. ERD Diagram 

### 데이터베이스 (ERD Diagram) 
1. logical
<img width="1214" alt="LMS-ERD노지컬" src="https://github.com/user-attachments/assets/8b4e798d-c1c7-4ab2-9d50-29c079cd40b4" />


2. physical.jpg
<img width="1214" alt="LMS-erd피지컬" src="https://github.com/user-attachments/assets/472b01f2-f030-4dd5-8448-115a3f72e299" />







## 기술 스펙

### 🔹 Backend (API & Core Service)
> **비즈니스 로직 / 인증·인가 / 데이터 접근 계층 중심**  
> REST API 제공, Spring Security로 인증/인가 처리, JPA로 DB 연동을 담당합니다.

| Category | Tech | Version / Usage | Badge |
|---|---|---|---|
| Language | Java | **Java 21 (LTS)** | ![Java](https://img.shields.io/badge/Java-21-007396?style=for-the-badge&logo=java&logoColor=white) |
| Framework | Spring Framework | Core / DI / AOP | ![Spring](https://img.shields.io/badge/Spring-Framework-6DB33F?style=for-the-badge&logo=spring&logoColor=white) |
| Framework | Spring Boot | **3.4.4** (API Server) | ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) |
| Security | Spring Security | 인증/인가, Filter 기반 보호 | ![Spring Security](https://img.shields.io/badge/Spring%20Security-Auth%2FAuthorization-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white) |
| ORM | JPA | Entity 설계 / 연관관계 매핑 | ![JPA](https://img.shields.io/badge/JPA-ORM-59666C?style=for-the-badge&logo=hibernate&logoColor=white) |
| ORM | Hibernate | JPA Provider / Lazy Loading | ![Hibernate](https://img.shields.io/badge/Hibernate-JPA%20Provider-59666C?style=for-the-badge&logo=hibernate&logoColor=white) |
| Runtime | Node.js | **18** (서브 API/연동 서비스) | ![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js&logoColor=white) |
| Framework | Express | 라우팅/미들웨어 기반 API | ![Express](https://img.shields.io/badge/Express-Node%20Framework-000000?style=for-the-badge&logo=express&logoColor=white) |

---

### 🔹 Frontend (Web UI)
> **React/Next 기반 UI + 상태관리 + 반응형 스타일링**  
> 화면 구성, 컴포넌트 구조화, 전역 상태 관리 및 UX 최적화를 담당합니다.

| Category | Tech | Version / Usage | Badge |
|---|---|---|---|
| Markup | HTML5 | Semantic Markup | ![HTML5](https://img.shields.io/badge/HTML5-Markup-E34F26?style=for-the-badge&logo=html5&logoColor=white) |
| Style | CSS3 | Layout / Responsive | ![CSS3](https://img.shields.io/badge/CSS3-Style-1572B6?style=for-the-badge&logo=css3&logoColor=white) |
| Language | JavaScript | ES6+ | ![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) |
| Language | TypeScript | 타입 안정성 / DX 개선 | ![TypeScript](https://img.shields.io/badge/TypeScript-Typed%20JS-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| Library | React | **18** (SPA UI) | ![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white) |
| Framework | Next.js | SSR/CSR, Routing | ![Next.js](https://img.shields.io/badge/Next.js-React%20Framework-000000?style=for-the-badge&logo=next.js&logoColor=white) |
| State | Redux | 전역 상태관리 / Store | ![Redux](https://img.shields.io/badge/Redux-State%20Management-764ABC?style=for-the-badge&logo=redux&logoColor=white) |
| CSS | Tailwind CSS | Utility CSS | ![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-Utility%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) |

---

### 🔹 Database (Persistence)
> **Oracle 기반 RDB 설계 & 트랜잭션 기반 데이터 운영**  
> 무결성/정합성을 고려한 테이블 설계, 제약조건 및 관계 모델링을 적용합니다.

| Category | Tech | Usage | Badge |
|---|---|---|---|
| RDBMS | Oracle DB | Schema / Relations / Transaction | ![Oracle](https://img.shields.io/badge/Oracle-Database-F80000?style=for-the-badge&logo=oracle&logoColor=white) |

---

### 🔹 Version Control & Collaboration
> **Git 브랜치 전략 + GitHub PR 중심 협업 프로세스**  
> 이슈 단위 작업 → PR → 리뷰 → 머지 흐름으로 품질을 관리합니다.

| Category | Tech | Usage | Badge |
|---|---|---|---|
| VCS | Git | Branch / Merge / Tag | ![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?style=for-the-badge&logo=git&logoColor=white) |
| Platform | GitHub | PR / Review / Issue | ![GitHub](https://img.shields.io/badge/GitHub-Collaboration-181717?style=for-the-badge&logo=github&logoColor=white) |

---

## CI/CD & Infra

### 🔹 CI/CD Pipeline (GitHub Actions)
> **Push → Test → Build → Docker Image → Registry Push → Deploy**  
> 변경사항이 GitHub에 Push 되면 Actions가 자동으로 실행되어 빌드/테스트 후 이미지 배포까지 자동화합니다.

| Category | Tech | Usage | Badge |
|---|---|---|---|
| CI/CD | GitHub Actions | 자동 빌드/테스트/배포 | ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white) |
| Container | Docker | 서비스별 이미지 패키징 | ![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge&logo=docker&logoColor=white) |
| Orchestration | Docker Compose | 멀티 컨테이너 배포 | ![Docker Compose](https://img.shields.io/badge/Docker%20Compose-Orchestration-2496ED?style=for-the-badge&logo=docker&logoColor=white) |
| Web Server | Nginx | Reverse Proxy / Routing | ![Nginx](https://img.shields.io/badge/Nginx-Reverse%20Proxy-009639?style=for-the-badge&logo=nginx&logoColor=white) |
| Registry | Docker Registry | 이미지 저장/배포 | ![Docker](https://img.shields.io/badge/Docker%20Registry-Image%20Store-2496ED?style=for-the-badge&logo=docker&logoColor=white) |

---

## 주요 기능
### 1) 수깅생
- 수강 중인 강의 목록 보기/ 수강 신청하기/ 자기정보 보기
<img width="200"alt="학생-수강목록" src="https://github.com/user-attachments/assets/b4aeb1b3-77ac-494c-b1e0-3cf9d8c45b58" />
<img width="200" alt="학생-수강신청&#39;" src="https://github.com/user-attachments/assets/4dec846c-c3c9-4b12-9f7b-ad41047a9127" />

### 2) 강사 
- 강의 목록 보기 / 강의 등록 / 자기 정보 보기
<img width="200" alt="강사-강의등록" src="https://github.com/user-attachments/assets/db823f58-5959-42d3-9e0e-397ef8b62037" />
<img width="200" alt="강사-강의목록" src="https://github.com/user-attachments/assets/56c43360-a575-4705-b027-a8fd10292365" />

### 관리자
- 강의 등록 / 강의 관리 / 수강생, 강사, 관리자 등록
- 수강생, 강사 관리
<img width="200" alt="관리자-강의관리" src="https://github.com/user-attachments/assets/2418f141-aa3c-4848-ab52-eea96d2b14d6" />
<img width="200" alt="관리자-강의등록" src="https://github.com/user-attachments/assets/d8cfe4a2-1537-45ec-93ad-610b95c29369" />
<img width="200" alt="관리자-사용자관리" src="https://github.com/user-attachments/assets/9c844bfd-c4ca-43eb-87a4-dd3feeade388" />
<img width="200" alt="관리자-수강생관리" src="https://github.com/user-attachments/assets/a5285a97-f271-4201-a335-066b6a840e71" />
<img width="200" alt="관리자-강사관리" src="https://github.com/user-attachments/assets/2e827947-cb2e-421c-b0cd-edff791fd1cd" />



---

## 시스템 아키텍처
```text
[React (Frontend)]
        |
        |  Axios (REST API)
        v
[Spring Boot (Backend)]
        |
        |  JPA (Repository)
        v
[Oracle DB]
```
<img width="500" height="1024" alt="아키텍처" src="https://github.com/user-attachments/assets/33e6a9dc-e7e2-4a0d-8789-d9d1946135b4" />

---

## API 문서
- Swagger UI(OpenAPI): `springdoc-openapi-starter-webmvc-ui` 사용  
  > 실행 후 `/swagger-ui` 혹은 프로젝트 설정에 맞는 경로에서 확인

<img width="510" height="920" alt="swagger" src="https://github.com/user-attachments/assets/e396e62d-e669-45e9-b8bf-1aa8c3062697" />




---

## 실행 방법
> 로컬 개발 기준 (환경에 따라 포트/DB 계정은 변경될 수 있습니다)

### 1) Backend (Spring Boot)
```bash
cd backend
./gradlew bootRun
```
- DB 설정: `backend/src/main/resources/application.properties`
- 현재 프로젝트 프로퍼티의 DB URL 예시: `jdbc:oracle:thin:@localhost:1521:xe`

### 2) Frontend (React)
```bash
cd frontend
npm i --legacy-peer-deps
npm i xlsx
npm start
```
---

## 폴더 구조
```text
team_project_Limitree/
  ├─ backend/          # Spring Boot (REST API)
  └─ frontend/         # React (UI/UX)
```
---
## Advanced CI CD Pipeline

<img width="1536" height="1024" alt="PI" src="https://github.com/user-attachments/assets/04e8ff4d-a72a-4fae-8953-b6794c976824" />

### Pipeline Description
1. 개발자가 기능 구현 후 GitHub에 Push
2. GitHub Actions를 통해 CI 파이프라인 자동 실행
3. Backend(Spring Boot)는 Gradle 기반 빌드 및 테스트 수행
4. Frontend(React/Next.js)는 빌드 후 정적 리소스 생성
5. 각 서비스별 Docker Image 생성
6. Docker Registry로 이미지 Push
7. 운영 서버에서 최신 이미지 Pull 후 배포
8. Backend는 Oracle DB와 연동되어 서비스 제공

본 프로젝트는 GitHub Actions 기반 CI/CD 파이프라인을 구축하여
코드 변경 시 자동 빌드, 테스트, Docker 이미지 생성 및 배포가
이루어지도록 구성하였습니다.

## LIMITREE 시연
https://github.com/user-attachments/assets/a095d075-e0a3-43f2-9e69-42faf59850e7

## LIMITREE 프레젠테이션
- [발표자료 보기](_260122.LIMITREE._REV1.pdf)

