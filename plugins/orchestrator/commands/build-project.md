# /build-project

아이디어부터 배포까지, 전체 프로젝트 빌드를 하나의 커맨드로 시작합니다.

## 사용법

```
/build-project
```

## 실행 흐름

이 커맨드를 실행하면 **Project Orchestrator** 에이전트가 활성화되어 다음을 순차적으로 진행합니다:

```
진행 상황 확인
    ↓
Stage 0: Ideation (/ideate)
    ↓
Stage 1: Planning (/plan)
    ↓
Stage 2: Design (/design)
    ↓
Stage 3: Development (/develop)
    ↓
Stage 4: Deployment (/deploy)
    ↓
프로젝트 완료!
```

## 산출물

전체 워크플로우 완료 시 생성되는 산출물:

| Stage | 최종 산출물 |
|-------|-------------|
| Stage 0 | `outputs/stage-0/idea-brief.md` |
| Stage 1 | `outputs/stage-1/prd.md` |
| Stage 2 | `outputs/stage-2/design-spec.md` |
| Stage 3 | `outputs/stage-3/build-config.md` + 코드 |
| Stage 4 | `outputs/stage-4/deployment-complete.md` + 라이브 URL |

## 프롬프트

당신은 **Project Orchestrator** 에이전트입니다. `agents/project-orchestrator.md`에 정의된 역할과 규칙을 따르세요.

### 핵심 규칙

1. **상태 관리 필수**: `.workflow/state.json`을 통해 진행 상황을 추적
2. **Stage 순서 준수**: 반드시 Stage 0 → 1 → 2 → 3 → 4 순서로 진행
3. **산출물 확인**: 각 Stage의 최종 산출물이 생성되어야 다음 Stage로 진행
4. **자동 재개**: 이미 완료된 Stage는 스킵하고 다음 Stage부터 진행

### 시작 전 확인

1. `.workflow/state.json` 파일 확인 (없으면 생성)
2. `outputs/` 폴더의 기존 산출물 확인
3. 시작할 Stage 결정

### 사용할 스킬 (순서대로)

1. `progress-check` - 진행 상황 확인 및 시작 지점 결정
2. `stage-router` - Stage 전환 및 상태 업데이트

### Stage별 호출

각 Stage는 해당 플러그인의 메인 커맨드를 호출합니다:

| Stage | 호출 | 완료 조건 |
|-------|------|-----------|
| 0 | `/ideate` 실행 | `idea-brief.md` 존재 |
| 1 | `/plan` 실행 | `prd.md` 존재 |
| 2 | `/design` 실행 | `design-spec.md` 존재 |
| 3 | `/develop` 실행 | `build-config.md` 존재 |
| 4 | `/deploy` 실행 | `deployment-complete.md` 존재 |

### 상태 업데이트 규칙

```
Stage 시작 시:
1. state.json의 해당 phase.status = "in_progress"
2. phase.startedAt = 현재 시간
3. state.currentPhaseId = 해당 phase.id

Stage 완료 시:
1. state.json의 해당 phase.status = "completed"
2. phase.completedAt = 현재 시간
3. phase.artifacts에 산출물 경로 추가
4. state.currentPhaseId = 다음 phase.id
```

### 완료 시

모든 Stage가 완료되면:

```
🎉 프로젝트 빌드 완료!

📊 결과 요약:
- 아이디어: {프로젝트명}
- PRD: outputs/stage-1/prd.md
- 디자인: outputs/stage-2/design-spec.md
- 코드: {프로젝트 폴더}
- 라이브 URL: https://your-app.vercel.app

축하합니다! 아이디어가 실제 서비스가 되었습니다!
```
