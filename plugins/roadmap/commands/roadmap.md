# /roadmap

프로젝트 목표를 파악하고 ROADMAP을 생성하거나, 기존 ROADMAP을 조회합니다.

## 사용법

```
/roadmap          # 새 ROADMAP 생성 또는 기존 ROADMAP 조회
/roadmap update   # 기존 ROADMAP 수정
```

## 설명

프로젝트의 최종 목표를 사용자와의 대화를 통해 명확히 정의하고, 그 목표를 달성하기 위한 단계별 ROADMAP을 생성합니다. 이미 ROADMAP이 존재하면 현재 상태를 보여주고, `update` 인자가 주어지면 기존 ROADMAP을 수정합니다.

## 트리거 키워드

- "로드맵 만들어줘"
- "프로젝트 계획 세워줘"
- "목표 정리해줘"
- "로드맵 보여줘"
- "어디까지 해야 하는 거야"

## 실행 스킬 순서

1. `goal-capture.md` - 프로젝트 목표를 대화를 통해 파악하고 `outputs/roadmap/goal.md`에 저장
2. `roadmap-generate.md` - 목표를 기반으로 ROADMAP을 생성하고 `outputs/roadmap/roadmap.md`에 저장

## Agent

`roadmap-coach.md`

## 입력

- 사용자와의 대화 (프로젝트 목표, 배경, 제약 조건 등)
- 기존 코드베이스 (있는 경우)
- 기존 `outputs/roadmap/goal.md`, `outputs/roadmap/roadmap.md` (있는 경우)

## 산출물

- `outputs/roadmap/goal.md` - 프로젝트 목표 정의서
- `outputs/roadmap/roadmap.md` - 단계별 ROADMAP

### goal.md 형식

```markdown
# 프로젝트 목표

## 한 줄 요약
[프로젝트가 달성하려는 것을 한 문장으로]

## 목표 상세
### 핵심 목표
- [구체적이고 측정 가능한 목표 1]
- [구체적이고 측정 가능한 목표 2]

### 성공 기준
- [이것이 되면 목표 달성이라고 볼 수 있는 기준 1]
- [기준 2]

### 범위 밖 (Non-goals)
- [명시적으로 하지 않을 것 1]
- [하지 않을 것 2]

## 배경 및 맥락
[왜 이 프로젝트를 하는지, 어떤 문제를 해결하는지]

## 제약 조건
- [시간, 기술, 리소스 등의 제약]
```

### roadmap.md 형식

```markdown
# ROADMAP

## 개요
[ROADMAP 전체를 한눈에 보는 요약]

## Phase 1: [이름]
> 목표: [이 Phase가 달성하려는 것]
> 기여하는 핵심 목표: [goal.md의 어떤 목표에 기여하는지]

- [ ] Step 1.1: [구체적인 작업]
- [ ] Step 1.2: [구체적인 작업]
- [ ] Step 1.3: [구체적인 작업]

**완료 기준**: [이 Phase가 끝났다고 볼 수 있는 조건]

## Phase 2: [이름]
...

## Phase N: [이름]
...

---
마지막 업데이트: [날짜]
```

## 완료 조건

- `outputs/roadmap/goal.md`가 생성되었고, 사용자가 목표에 동의함
- `outputs/roadmap/roadmap.md`가 생성되었고, 모든 Phase가 최소 하나의 핵심 목표와 연결됨
- 사용자가 ROADMAP을 확인하고 승인함

## 다음 단계

- `/where` - 현재 진행 위치 확인
- `/align` - 목표 정렬 검증
- `/develop` - 개발 시작
