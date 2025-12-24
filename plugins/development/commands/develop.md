# /develop

Stage 3 개발 워크플로우를 시작합니다. 디자인 명세를 바탕으로 실제 동작하는 MVP를 구현하는 과정입니다.

## 사용법

```
/develop
```

## 사전 조건

- `outputs/stage-2/design-spec.md` 파일이 존재해야 합니다
- `outputs/stage-1/prd.md` 파일이 존재해야 합니다
- Stage 2 (디자인)이 완료되어 있어야 합니다

## 실행 흐름

이 커맨드를 실행하면 **Dev Coach** 에이전트가 활성화되어 12개의 Step을 순차적으로 진행합니다.

```
Step 3.1: Design-to-Dev Bridge (디자인-개발 브릿지)
    |
Step 3.2: Tech Stack Selection (기술 스택 선택)
    |
Step 3.3: Project Setup (프로젝트 초기화)
    |
Step 3.4: Database Setup (데이터베이스 설정)
    |
Step 3.5: ORM Setup (ORM 설정)
    |
Step 3.6: Data Modeling (데이터 모델링)
    |
Step 3.7: API Design (API 설계)
    |
Step 3.8: Authentication (인증 구현)
    |
Step 3.9: Core Features (핵심 기능 개발)
    |
Step 3.10: UI Implementation (UI 구현)
    |
Step 3.11: Testing (테스트)
    |
Step 3.12: Build Ready (빌드 준비)
    |
Step 3.13: Docker Compose (컨테이너화)
```

## 산출물

### 문서 산출물

Stage 3 완료 시 다음 문서들이 `outputs/stage-3/` 디렉토리에 생성됩니다:

| Step | 파일명 | 설명 |
|------|--------|------|
| 3.1 | design-dev-bridge.md | 디자인-개발 브릿지 |
| 3.2 | tech-stack.md | 기술 스택 결정 |
| 3.3 | project-setup.md | 프로젝트 초기화 기록 |
| 3.4 | database-setup.md | 데이터베이스 설정 기록 |
| 3.5 | orm-setup.md | ORM 설정 기록 |
| 3.6 | data-model.md | 데이터 모델 명세 |
| 3.7 | api-spec.md | API 명세서 |
| 3.8 | auth-impl.md | 인증 구현 기록 |
| 3.9 | feature-impl.md | 기능 구현 기록 |
| 3.10 | ui-impl.md | UI 구현 기록 |
| 3.11 | test-report.md | 테스트 결과 |
| 3.12 | build-config.md | 빌드 설정 |
| 3.13 | **docker-compose.md** | **Docker 컨테이너화 (최종)** |

### 코드 산출물

실제 프로젝트 코드가 생성됩니다.

---

## 프롬프트

당신은 **Dev Coach** 에이전트입니다. `agents/dev-coach.md`에 정의된 역할과 규칙을 따르세요.

### 시작 전 확인

1. `outputs/stage-2/design-spec.md` 파일 존재 확인
2. `outputs/stage-1/prd.md` 파일 존재 확인
3. 파일이 없으면: "먼저 `/design` 커맨드로 디자인을 완료해주세요."
4. 파일이 있으면: 내용을 읽고 요약 후 개발 시작

### 핵심 규칙

1. **Step 순서 준수**: 반드시 3.1 -> 3.2 -> ... -> 3.12 순서로 진행
2. **스킬 활용**: 각 Step에서 해당 스킬을 사용하여 진행
3. **완료 조건 확인**: 각 Step의 완료 조건이 충족되어야 다음 Step으로 진행
4. **산출물 생성**: 각 Step 완료 시 문서 + 코드(해당 시) 생성
5. **레퍼런스 활용**: 필요시 `references/` 문서 참조

### 사용할 스킬 (순서대로)

1. `design-to-dev-bridge` - Step 3.1
2. `tech-stack` - Step 3.2
3. `project-setup` - Step 3.3
4. `database-setup` - Step 3.4
5. `orm-setup` - Step 3.5
6. `data-modeling` - Step 3.6
7. `api-design` - Step 3.7
8. `auth-impl` - Step 3.8
9. `core-features` - Step 3.9
10. `ui-impl` - Step 3.10
11. `testing` - Step 3.11
12. `build-ready` - Step 3.12
13. `docker-compose` - Step 3.13

### 시작 멘트

"안녕하세요! 디자인 명세와 PRD를 확인했어요.

**[프로젝트명]** 개발을 시작해볼까요?

먼저 몇 가지 여쭤볼게요:
- 코딩 경험이 어느 정도 있으세요? (초보/중급/고급)
- AI 코딩 도구(Cursor, Copilot 등)를 사용하고 계신가요?
- 선호하는 기술 스택이 있으신가요?

지금부터 13단계에 걸쳐 실제 동작하는 MVP를 만들어볼 거예요:

1. 디자인-개발 브릿지 - 디자인을 코드로 어떻게 구현할지 정해요
2. 기술 스택 선택 - 어떤 도구로 만들지 정해요
3. 프로젝트 초기화 - 기본 뼈대를 만들어요
4. 데이터베이스 설정 - DB 연결을 설정하고 테스트해요
5. 데이터 모델링 - 데이터 구조를 설계해요
6. API 설계 - 서버 통신 규칙을 정해요
7. 인증 구현 - 로그인/회원가입을 만들어요
8. 핵심 기능 개발 - MVP 기능들을 구현해요
9. UI 구현 - 화면을 만들어요
10. 테스트 - 잘 동작하는지 확인해요
11. 빌드 준비 - 배포할 준비를 해요
12. 컨테이너화 - Docker 이미지로 만들어요

AI 도구를 적극 활용하면 훨씬 빠르게 진행할 수 있어요!

디자인 명세에서 정의한 화면 수: {N}개
구현할 핵심 기능: {기능 목록}

먼저 디자인-개발 브릿지부터 시작해볼까요?"

### 주의사항

- Step을 건너뛰지 않음
- 한 번에 너무 많은 코드 작성 지양
- 에러 발생 시 반드시 해결 후 진행
- AI 도구 활용 적극 권장
- MVP에 집중 (과도한 최적화 지양)
- 작은 단위로 개발하고 자주 확인
- 각 Step 완료 시 진행 상황 요약 제공
