# Stage 3: Development (개발)

1인 창업자의 디자인 명세를 실제 동작하는 MVP로 구현하는 워크플로우 플러그인입니다.

## 개요

이 플러그인은 Stage 2(디자인)에서 생성된 디자인 명세를 입력으로 받아, 실제 배포 가능한 수준의 코드를 생성합니다. 코딩 경험이 적은 창업자도 AI 도구와 함께 MVP를 완성할 수 있도록 안내합니다.

## 사전 조건

- Stage 2 완료 (`/design`)
- `outputs/stage-2/design-spec.md` 파일 존재
- `outputs/stage-1/prd.md` 파일 존재

## 사용 방법

```
/develop
```

이 커맨드 하나로 Dev Coach 에이전트가 전체 워크플로우를 안내합니다.

## 워크플로우

```
/develop 실행
    |
Dev Coach 에이전트가 개발 주도
    |
+-------------------------------------------------------------+
|  Step 3.1: Tech Stack Selection (기술 스택 선택)              |
|  스킬: tech-stack                                            |
|  산출물: tech-stack.md                                       |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 3.2: Project Setup (프로젝트 초기화)                    |
|  스킬: project-setup                                         |
|  산출물: project-setup.md + 실제 코드                        |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 3.3: Data Modeling (데이터 모델링)                      |
|  스킬: data-modeling                                         |
|  산출물: data-model.md + 스키마 파일                         |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 3.4: API Design (API 설계)                             |
|  스킬: api-design                                            |
|  산출물: api-spec.md                                         |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 3.5: Authentication (인증 구현)                         |
|  스킬: auth-impl                                             |
|  산출물: auth-impl.md + 실제 코드                            |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 3.6: Core Features (핵심 기능 개발)                     |
|  스킬: core-features                                         |
|  산출물: feature-impl.md + 실제 코드                         |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 3.7: UI Implementation (UI 구현)                        |
|  스킬: ui-impl                                               |
|  산출물: ui-impl.md + 실제 코드                              |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 3.8: Testing (테스트)                                   |
|  스킬: testing                                               |
|  산출물: test-report.md                                      |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 3.9: Build Ready (빌드 준비)                            |
|  스킬: build-ready                                           |
|  산출물: build-config.md (최종)                              |
+-------------------------------------------------------------+
```

## 주요 컴포넌트

### Command

- **/develop**: Stage 3 전체 워크플로우 시작 (유일한 진입점)

### Agent

- **Dev Coach**: 실용적이고 빠른 개발을 지향하는 코치. AI 도구 활용을 적극 권장하며, MVP에 집중합니다.

### Skills

| 스킬 | Step | 역할 | 설명 |
|------|------|------|------|
| tech-stack | 3.1 | Full-stack | 기술 스택 선택 및 결정 |
| project-setup | 3.2 | Full-stack | 프로젝트 초기화 및 boilerplate |
| data-modeling | 3.3 | Backend | 데이터 모델 및 스키마 설계 |
| api-design | 3.4 | Backend | API 엔드포인트 설계 |
| auth-impl | 3.5 | Full-stack | 인증/인가 구현 (BE: 서버, FE: UI) |
| core-features | 3.6 | Full-stack | MVP 핵심 기능 구현 (BE: API, FE: 훅) |
| ui-impl | 3.7 | Frontend | UI 컴포넌트 및 화면 구현 |
| testing | 3.8 | Full-stack | 테스트 및 버그 수정 (BE: API, FE: UI) |
| build-ready | 3.9 | Full-stack | 빌드 설정 및 배포 준비 |

### References

| 카테고리 | 문서 | 설명 |
|----------|------|------|
| tech-stacks | nextjs-supabase.md | Next.js + Supabase 조합 가이드 |
| tech-stacks | nextjs-firebase.md | Next.js + Firebase 조합 가이드 |
| tech-stacks | react-express.md | React + Express 조합 가이드 |
| templates | folder-structures.md | 폴더 구조 템플릿 |
| templates | env-templates.md | 환경변수 템플릿 |
| templates | config-templates.md | 설정 파일 템플릿 |
| patterns | auth-patterns.md | 인증 구현 패턴 |
| patterns | google-auth-patterns.md | 구글 OAuth 인증 상세 가이드 |
| patterns | api-patterns.md | API 설계 패턴 |
| patterns | state-patterns.md | 상태 관리 패턴 |
| patterns | error-handling.md | 에러 처리 패턴 |
| patterns | frontend-clean-architecture.md | 프론트엔드 클린 아키텍처 가이드 |
| patterns | backend-clean-architecture.md | 백엔드 클린 아키텍처 가이드 |
| checklists | security-checklist.md | 보안 체크리스트 |
| checklists | performance-checklist.md | 성능 체크리스트 |
| checklists | launch-checklist.md | 런칭 전 체크리스트 |

## 산출물

### 문서 산출물 (`outputs/stage-3/`)

| 파일명 | Step | 설명 |
|--------|------|------|
| tech-stack.md | 3.1 | 선택된 기술 스택 |
| project-setup.md | 3.2 | 프로젝트 초기화 기록 |
| data-model.md | 3.3 | 데이터 모델 명세 |
| api-spec.md | 3.4 | API 명세서 |
| auth-impl.md | 3.5 | 인증 구현 기록 |
| feature-impl.md | 3.6 | 기능 구현 기록 |
| ui-impl.md | 3.7 | UI 구현 기록 |
| test-report.md | 3.8 | 테스트 결과 |
| **build-config.md** | 3.9 | **빌드 설정 (최종)** |

### 코드 산출물

실제 프로젝트 코드가 지정된 디렉토리에 생성됩니다:

```
{project-name}/
├── src/
│   ├── app/              # 페이지/라우트
│   ├── components/       # UI 컴포넌트
│   ├── lib/              # 유틸리티, API 클라이언트
│   ├── hooks/            # 커스텀 훅
│   └── types/            # 타입 정의
├── public/               # 정적 파일
├── .env.example          # 환경변수 예시
├── package.json
└── ...
```

## 다음 단계

Stage 3 완료 후 **Stage 4: 배포** 단계로 진행합니다.

```
/deploy  # Stage 4 시작 (예정)
```

## 의존성

- `design` 플러그인
- `planning` 플러그인
- `workflow-state-manager` 플러그인 (상태 추적용, 선택사항)

## 역할 분리 (Role Separation)

각 스킬은 다음 역할로 구분됩니다:

| 역할 | 담당 영역 | 예시 |
|------|----------|------|
| **Backend** | DB, API, 서버 로직 | 스키마, API Routes, Server Actions, RLS |
| **Frontend** | UI, 상태, 사용자 경험 | 컴포넌트, 훅, 페이지, 스타일링 |
| **Full-stack** | BE + FE 모두 | 인증(서버+UI), 테스트(API+UI) |

Full-stack 스킬은 내부적으로 `# Backend 구현`과 `# Frontend 구현` 섹션으로 분리되어 있으며, Backend를 먼저 구현한 후 Frontend를 진행하는 순서를 따릅니다.

## 1인 창업자를 위한 핵심 포인트

1. **AI 도구 활용 극대화**: Cursor, GitHub Copilot, v0 적극 활용
2. **검증된 스택 추천**: 복잡한 선택 대신 검증된 조합 제안
3. **boilerplate 활용**: 처음부터 만들지 않고 템플릿 활용
4. **MVP 집중**: 완벽한 코드보다 동작하는 코드
5. **점진적 개발**: 작은 단위로 개발하고 자주 확인
6. **문서화**: 나중을 위한 최소한의 기록 유지
