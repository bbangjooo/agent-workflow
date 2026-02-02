# Iteration Plugin

무한 이터레이션을 위한 버전 관리 플러그인

## 개요

제품 개발은 선형적이지 않습니다. 개발 중에 기획을 수정해야 할 수도 있고, 배포 후에 v2를 시작해야 할 수도 있습니다. 이 플러그인은 언제든 이전 Stage로 돌아가거나 새로운 버전을 시작할 수 있는 유연한 이터레이션을 지원합니다.

## 핵심 개념

### Version (버전)

제품의 전체 사이클 (Idea → Deploy)을 완료한 단위입니다.
- v1: 최초 버전
- v2: v1 피드백을 반영한 개선 버전
- v3, v4, ...

### Iteration (이터레이션)

버전 내에서 특정 Stage로 돌아가 개선하는 것입니다.
- "개발 중인데 기획을 수정하고 싶어" → Planning으로 iterate
- "디자인을 다시 보고 싶어" → Design으로 iterate

### Archive (아카이브)

이전 버전의 산출물을 보존하는 것입니다.
- `outputs/versions/v1/` - v1의 모든 산출물
- `outputs/versions/v2/` - v2의 모든 산출물

## 커맨드

### `/iterate {stage}` - 이전 Stage로 돌아가기

```
/iterate planning     # Planning Stage부터 다시
/iterate design       # Design Stage부터 다시
/iterate ideation     # Ideation부터 다시 (거의 새 버전과 동일)
```

동작:
1. 현재까지의 산출물을 restore point로 저장
2. 해당 Stage 이후의 상태를 초기화
3. 해당 Stage부터 다시 시작
4. 이전 피드백을 참조하여 개선 방향 제시

### `/next-version` - 새 버전 시작

```
/next-version         # v1 → v2 시작
```

동작:
1. 현재 모든 산출물을 `versions/v{n}/`으로 아카이브
2. 이전 버전 피드백 요약
3. v{n+1} 목표 설정
4. Stage 0 (Ideation)부터 새로 시작

### `/new-product` - 새 제품 시작

```
/new-product          # 완전히 새로운 제품
```

동작:
1. 현재 프로젝트 전체를 아카이브
2. 새로운 `.workflow/state.json` 생성
3. 완전히 새로운 Ideation부터 시작

## 산출물 구조

```
outputs/
├── versions/                    # 버전 아카이브
│   ├── v1/
│   │   ├── stage-0/
│   │   ├── stage-1/
│   │   ├── stage-2/
│   │   ├── stage-3/
│   │   ├── stage-4/
│   │   ├── feedback/
│   │   └── decisions/
│   └── v2/
│       └── ...
│
├── restore-points/              # 이터레이션 복원 지점
│   ├── 2024-01-15T10-30-00_before-iterate-planning/
│   │   └── ...
│   └── ...
│
├── stage-0/                     # 현재 버전
├── stage-1/
├── stage-2/
├── stage-3/
├── stage-4/
├── feedback/
└── decisions/
```

## Agent

### iteration-coach

이터레이션 결정을 돕는 코치입니다.

- 언제 돌아가야 하는지 vs 계속 진행해야 하는지 판단 도움
- 버전 간 변화를 추적하고 비교
- 이전 피드백을 새 이터레이션에 연결

## 상태 관리

`.workflow/state.json`에 추가되는 필드:

```json
{
  "version": 1,
  "iterations": [
    {
      "id": "iter-001",
      "fromPhase": "development",
      "toPhase": "planning",
      "reason": "기획에 누락된 기능 발견",
      "timestamp": "2024-01-15T10:30:00Z",
      "restorePoint": "restore-points/2024-01-15T10-30-00_before-iterate-planning"
    }
  ],
  "archivedVersions": ["v1"]
}
```

## 다른 플러그인과의 연계

- **feedback**: 회고 결과를 바탕으로 iterate/next-version 제안
- **orchestrator**: Stage 전환 시 iteration 히스토리 반영
- **workflow-state-manager**: 버전 및 이터레이션 상태 저장

## 워크플로우 예시

### 예시 1: 개발 중 기획 수정

```
[Development 진행 중]
User: "생각해보니 이 기능은 빠져야 할 것 같아"

→ /reflect로 문제 파악
→ "기획 수정이 필요해 보여요. /iterate planning 할까요?"

User: /iterate planning

→ 현재 상태 restore point 저장
→ Planning Stage부터 재시작
→ 이전 개발에서 발견한 문제점 참조
→ PRD 수정 → Design 수정 → Development 재개
```

### 예시 2: v2 시작

```
[Deploy 완료, v1 라이브]
User: "사용자 피드백 받았는데 v2 시작하고 싶어"

→ /reflect로 v1 전체 회고
→ /next-version

→ v1 모든 산출물 아카이브
→ "v2에서 달성하고 싶은 목표가 뭐예요?"
→ 목표 기록
→ Ideation부터 시작 (v1 피드백 참조 가능)
```
