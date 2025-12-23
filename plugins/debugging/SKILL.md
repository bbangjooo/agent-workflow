# Debugging Plugin

1인 창업자를 위한 에러 해결 워크플로우. 개발 또는 배포 중 발생한 에러를 체계적으로 분석하고 해결합니다.

## 개요

| 항목 | 설명 |
|------|------|
| 목적 | 에러 메시지를 분석하여 근본 원인을 파악하고 해결책 제시 |
| 대상 | 개발/배포 중 에러를 만난 1인 창업자 |
| 진입점 | `/debug` 커맨드 |
| 에이전트 | Debug Coach |

## 사전 조건

- 에러 메시지 또는 스크린샷
- 프로젝트 컨텍스트 (어떤 작업 중 발생했는지)

## 워크플로우

```
/debug
    │
    ▼
┌─────────────────────────────────────────────┐
│  Step D.1: Error Capture (에러 수집)         │
│  - 에러 메시지 수집                          │
│  - 컨텍스트 파악 (언제, 어디서 발생)          │
│  - 에러 유형 분류                            │
└─────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────┐
│  Step D.2: Root Cause Analysis (원인 분석)   │
│  - 에러 메시지 해석                          │
│  - 스택 트레이스 분석                        │
│  - 관련 코드/설정 검토                       │
└─────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────┐
│  Step D.3: Solution Proposal (해결책 제안)   │
│  - 해결 방법 제시                            │
│  - 코드 수정 또는 설정 변경 안내              │
│  - 예방책 제안                               │
└─────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────┐
│  Step D.4: Fix Verification (수정 검증)      │
│  - 수정 적용 확인                            │
│  - 재발 방지 체크리스트                      │
│  - 디버깅 리포트 생성                        │
└─────────────────────────────────────────────┘
```

## 주요 컴포넌트

### 커맨드

| 커맨드 | 설명 |
|--------|------|
| `/debug` | 디버깅 워크플로우 시작 (유일한 진입점) |

### 에이전트

| 에이전트 | 역할 |
|----------|------|
| Debug Coach | 에러 해결 전문가, Step 순서 관리 |

### 스킬

| 스킬 | Step | 설명 |
|------|------|------|
| error-capture | D.1 | 에러 메시지 수집 및 분류 |
| root-cause-analysis | D.2 | 원인 분석 및 관련 코드 검토 |
| solution-proposal | D.3 | 해결책 제안 및 수정 안내 |
| fix-verification | D.4 | 수정 검증 및 리포트 생성 |

### 레퍼런스

| 카테고리 | 파일 | 설명 |
|----------|------|------|
| error-patterns | build-errors.md | 빌드 에러 패턴 및 해결책 |
| error-patterns | runtime-errors.md | 런타임 에러 패턴 및 해결책 |
| error-patterns | deploy-errors.md | 배포 에러 패턴 및 해결책 |
| error-patterns | type-errors.md | TypeScript 타입 에러 해결책 |
| error-patterns | database-errors.md | 데이터베이스 연결/쿼리 에러 해결책 |

## 산출물

| Step | 파일명 | 설명 |
|------|--------|------|
| D.1 | `error-report.md` | 에러 상세 정보 및 분류 |
| D.2 | `root-cause.md` | 원인 분석 결과 |
| D.3 | `solution.md` | 해결책 및 수정 방법 |
| D.4 | `debug-complete.md` | 최종 디버깅 리포트 |

모든 산출물은 `outputs/debugging/` 폴더에 저장됩니다.

## 에러 유형별 대응

| 에러 유형 | 주요 원인 | 참조 문서 |
|-----------|----------|-----------|
| Build Error | 문법 오류, 타입 오류, 의존성 문제 | `build-errors.md` |
| Runtime Error | null/undefined, API 오류, 상태 관리 | `runtime-errors.md` |
| Deploy Error | 환경변수, 빌드 설정, 권한 | `deploy-errors.md` |
| Type Error | 타입 불일치, 제네릭, any 사용 | `type-errors.md` |
| Database Error | 연결 실패, 쿼리 오류, 마이그레이션 | `database-errors.md` |

## 핵심 원칙

1. **차분한 안내**: 에러를 만난 사용자를 안심시킴
2. **체계적 접근**: 에러 → 원인 → 해결 순서 준수
3. **실용적 해결**: 복잡한 설명보다 실행 가능한 해결책
4. **학습 기회**: 같은 에러 재발 방지를 위한 이해 돕기

## 다른 Stage와의 연계

- **Stage 3 (Development)**: 개발 중 에러 발생 시 `/debug` 호출
- **Stage 4 (Deployment)**: 배포 에러 발생 시 `/debug` 호출
- 디버깅 완료 후 원래 Stage로 복귀

## 사용 예시

```
사용자: 배포했는데 "Module not found: Can't resolve '@/components/Button'" 에러가 나요

Debug Coach:
🔍 에러를 분석하겠습니다.

[Step D.1 시작]
에러 유형: Build Error
발생 위치: 빌드 단계
에러 메시지: Module not found

[Step D.2 진행]
원인 분석:
- tsconfig.json의 paths 설정과 실제 파일 경로 불일치
- 또는 빌드 환경에서 path alias가 인식되지 않음

[Step D.3 진행]
해결책:
1. tsconfig.json에서 baseUrl과 paths 확인
2. next.config.js에 필요시 webpack alias 추가
...
```
