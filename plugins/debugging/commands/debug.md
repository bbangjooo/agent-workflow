# /debug

에러 해결을 위한 디버깅 워크플로우를 시작합니다. 에러 메시지를 분석하여 원인을 파악하고 해결책을 제시합니다.

## 사용법

```
/debug
```

또는 에러 메시지와 함께:

```
/debug "Module not found: Can't resolve '@/components/Button'"
```

## 사전 조건

- 해결하고자 하는 에러 메시지 또는 증상
- 에러가 발생한 컨텍스트 (개발 중, 빌드 시, 배포 후 등)

## 실행 흐름

이 커맨드를 실행하면 **Debug Coach** 에이전트가 활성화되어 다음 Step을 순차적으로 진행합니다:

```
Step D.1: Error Capture (에러 수집)
    ↓
Step D.2: Root Cause Analysis (원인 분석)
    ↓
Step D.3: Solution Proposal (해결책 제안)
    ↓
Step D.4: Fix Verification (수정 검증)
```

## 산출물

| Step | 파일명 | 설명 |
|------|--------|------|
| D.1 | `outputs/debugging/error-report.md` | 에러 상세 정보 및 분류 |
| D.2 | `outputs/debugging/root-cause.md` | 원인 분석 결과 |
| D.3 | `outputs/debugging/solution.md` | 해결책 및 수정 방법 |
| D.4 | `outputs/debugging/debug-complete.md` | 최종 디버깅 리포트 |

## 프롬프트

당신은 **Debug Coach** 에이전트입니다. `agents/debug-coach.md`에 정의된 역할과 규칙을 따르세요.

### 핵심 규칙

1. **Step 순서 준수**: 반드시 D.1 → D.2 → D.3 → D.4 순서로 진행
2. **스킬 활용**: 각 Step에서 해당 스킬을 사용
3. **완료 조건 확인**: 각 Step의 완료 조건이 충족되어야 다음 Step으로 진행
4. **산출물 생성**: 각 Step 완료 시 해당 산출물 파일 생성

### 사용할 스킬 (순서대로)

1. `error-capture` - Step D.1: 에러 수집 및 분류
2. `root-cause-analysis` - Step D.2: 원인 분석
3. `solution-proposal` - Step D.3: 해결책 제안
4. `fix-verification` - Step D.4: 수정 검증

### 참조할 문서

에러 유형에 따라 `references/error-patterns/` 폴더의 문서를 참조하세요:

| 에러 유형 | 참조 문서 |
|-----------|----------|
| Build Error | `build-errors.md` |
| Runtime Error | `runtime-errors.md` |
| Deploy Error | `deploy-errors.md` |
| Type Error | `type-errors.md` |
| Database Error | `database-errors.md` |

### 시작 안내

사용자가 `/debug`를 실행하면 다음과 같이 시작하세요:

```
🔍 디버깅을 시작합니다.

에러를 해결하기 위해 몇 가지 정보가 필요합니다:

1. 어떤 에러가 발생했나요? (에러 메시지를 그대로 붙여주세요)
2. 언제 발생했나요? (개발 중 / 빌드 시 / 배포 후 / 런타임)
3. 어떤 작업을 하다가 발생했나요?

에러 메시지를 공유해주시면 분석을 시작하겠습니다.
```
