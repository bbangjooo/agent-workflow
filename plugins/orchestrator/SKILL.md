# Orchestrator (프로젝트 오케스트레이터)

1인 창업자를 위한 End-to-End 프로젝트 빌더. **하나의 커맨드로 아이디어부터 유저 획득까지** 전체 워크플로우를 연결합니다.

## 개요

이 플러그인은 7개의 Stage 플러그인(ideation, monetization, planning, design, development, deployment, growth)을 연결하여 전체 프로젝트 빌드 과정을 자동으로 진행합니다. workflow-state-manager와 연동하여 진행 상황을 추적하고, 중간에 끊겨도 이어서 진행할 수 있습니다.

## 사용 방법

```
/build-project
```

이 커맨드 하나로 전체 프로젝트 빌드를 시작합니다.

## 전체 워크플로우

```
/build-project 실행
    |
+-------------------------------------------------------------+
|  Progress Check (진행 상황 확인)                              |
|  - .workflow/state.json 로드                                |
|  - outputs/ 폴더 스캔                                       |
|  - 시작 지점 결정                                           |
+-------------------------------------------------------------+
    |
+-------------------------------------------------------------+
|  Stage 0: Ideation (아이디어 고도화)                         |
|  커맨드: /ideate                                            |
|  산출물: idea-brief.md                                      |
+-------------------------------------------------------------+
    |
+-------------------------------------------------------------+
|  Stage 1: Monetization (사업 전략)                            |
|  커맨드: /monetize                                          |
|  산출물: business-model.md                                  |
+-------------------------------------------------------------+
    |
+-------------------------------------------------------------+
|  Stage 2: Planning (기획)                                    |
|  커맨드: /plan                                              |
|  산출물: prd.md (수익 모델 반영)                             |
+-------------------------------------------------------------+
    |
+-------------------------------------------------------------+
|  Stage 3: Design (디자인)                                    |
|  커맨드: /design                                            |
|  산출물: design-spec.md                                     |
+-------------------------------------------------------------+
    |
+-------------------------------------------------------------+
|  Stage 4: Development (개발)                                 |
|  커맨드: /develop                                           |
|  산출물: build-config.md + 코드                             |
+-------------------------------------------------------------+
    |
+-------------------------------------------------------------+
|  Stage 5: Deployment (배포)                                  |
|  커맨드: /deploy                                            |
|  산출물: deployment-complete.md + 라이브 URL                |
+-------------------------------------------------------------+
    |
+-------------------------------------------------------------+
|  Stage 6: User Acquisition (유저 획득)                       |
|  커맨드: /grow                                              |
|  산출물: acquisition-plan.md                                |
+-------------------------------------------------------------+
    |
    v
프로젝트 완료!
```

## 주요 컴포넌트

### Command

- **/build-project**: 전체 워크플로우 시작 (유일한 진입점)

### Agent

- **Project Orchestrator**: 전체 워크플로우를 관리하는 총괄 에이전트. 각 Stage를 순차적으로 호출하고 상태를 추적합니다.

### Skills

| 스킬 | 설명 |
|------|------|
| progress-check | 현재 진행 상황 확인 및 시작 지점 결정 |
| stage-router | Stage 간 전환 및 상태 업데이트 |

> **Note**: Design-to-Dev Bridge는 Stage 3 (Development)의 Step 3.1로 통합되었습니다.

## 상태 관리

### 상태 파일 위치

```
.workflow/
└── state.json
```

### 상태 구조

```json
{
  "workflowId": "solo-founder-workflow",
  "workflowName": "Solo Founder Project Builder",
  "projectName": "my-awesome-app",
  "version": "1.0.0",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastModifiedAt": "2024-01-01T00:00:00.000Z",
  "currentPhaseId": "ideation",
  "phases": [
    {
      "id": "ideation",
      "name": "Stage 0: Ideation",
      "status": "completed",
      "order": 0,
      "steps": [...],
      "artifacts": ["outputs/stage-0/idea-brief.md"]
    },
    ...
  ]
}
```

### 상태 자동 업데이트

| 시점 | 동작 |
|------|------|
| Stage 시작 | phase.status = "in_progress" |
| Stage 완료 | phase.status = "completed", artifacts 추가 |
| 워크플로우 완료 | 모든 phase.status = "completed" |

## 시작 시나리오

| 상황 | 동작 |
|------|------|
| 처음 시작 | Stage 0부터 순차 진행 |
| idea-brief.md 존재 | Stage 1 (Monetization)부터 시작 |
| business-model.md 존재 | Stage 2 (Planning)부터 시작 |
| prd.md 존재 | Stage 3 (Design)부터 시작 |
| design-spec.md 존재 | Stage 4 (Development)부터 시작 |
| build-config.md 존재 | Stage 5 (Deployment)부터 시작 |
| deployment-complete.md 존재 | Stage 6 (Growth)부터 시작 |
| 모두 완료 | "이미 모든 Stage 완료됨" 안내 |

## Prefix Trigger

사용자 메시지가 `orch::` 로 시작하면, 접두사를 제거한 나머지 텍스트를 프롬프트로 하여 `orchestrator:build-project` 스킬을 즉시 호출합니다. 다른 작업 없이 바로 스킬을 실행합니다.

```
예시:
  orch:: 할일 관리 앱 만들어줘
  → "할일 관리 앱 만들어줘" 를 프롬프트로 orchestrator:build-project 스킬 호출
```

## 의존성

- `ideation` 플러그인
- `monetization` 플러그인
- `planning` 플러그인
- `design` 플러그인
- `development` 플러그인
- `deployment` 플러그인
- `growth` 플러그인
- `workflow-state-manager` 플러그인

## 1인 창업자를 위한 핵심 포인트

1. **원커맨드**: `/build-project` 하나로 전체 진행
2. **자동 연결**: Stage 간 자동 전환
3. **중단/재개**: 언제든 중단하고 이어서 진행 가능
4. **진행 상황 추적**: 현재 위치를 항상 알 수 있음
5. **유연한 시작**: 이미 있는 산출물을 인식하여 중간부터 시작
