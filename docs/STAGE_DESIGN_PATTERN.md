# Stage/Step 설계 패턴 가이드

이 문서는 1인 창업자용 End-to-End 워크플로우 플러그인을 설계할 때 참고하는 패턴 가이드입니다.

## 전체 워크플로우 구조

```
/build-project (메인 오케스트레이터)
    ↓
Stage 0: 아이디어 고도화 → idea-brief.md
    ↓
Stage 1: 기획 → PRD, feature-spec 등
    ↓
Stage 2: 디자인 → 디자인 시스템, 와이어프레임
    ↓
Stage 3: 개발 → 실제 코드
    ↓
Stage 4: 배포 → 라이브 서비스
```

---

## 1. Stage 설계 원칙

### 1.1 Stage 정의

각 Stage는 **독립적인 플러그인**으로 배포됩니다.

| 속성 | 설명 |
|------|------|
| 목적 | Stage가 달성하려는 명확한 목표 |
| 입력 | 이전 Stage의 산출물 또는 사용자 입력 |
| 산출물 | 필수: markdown 문서 + 선택: 추가 자산 (코드, 이미지 등) |
| 메인 커맨드 | Stage 전체를 실행하는 **유일한** 진입점 커맨드 |

### 1.2 Stage 네이밍 규칙

```
{영문명}/
예: ideation/
    planning/
    design/
```

### 1.3 Stage 폴더 구조

```
{name}/
├── commands/
│   └── {stage-main}.md     # Stage 메인 커맨드 (유일한 진입점)
├── agents/
│   └── {agent-name}.md     # Step 순서와 규칙이 정의된 에이전트
├── skills/
│   ├── {step-1-skill}.md   # Step 0.1 스킬
│   ├── {step-2-skill}.md   # Step 0.2 스킬
│   └── ...                 # 각 Step별 스킬
├── plugin.json
└── SKILL.md
```

---

## 2. Step 설계 원칙

### 2.1 Step은 스킬로 구현

각 Step은 **스킬(Skill)**로 구현됩니다. 에이전트가 순서대로 스킬을 호출하며 워크플로우를 진행합니다.

**왜 스킬인가?**
- 사용자는 메인 커맨드 하나만 알면 됨
- 에이전트가 자연스럽게 흐름을 이어감
- 대화가 끊기지 않음
- 복잡한 순서를 사용자가 알 필요 없음

### 2.2 Step 정의

| 속성 | 설명 |
|------|------|
| 목적 | Step이 달성하려는 구체적 목표 |
| 방식 | 대화형/자동/하이브리드 |
| 입력 | 이전 Step의 산출물 또는 사용자 입력 |
| 산출물 | markdown 문서 (필수) |
| 완료 조건 | 다음 Step으로 넘어가기 위한 조건 |
| 다음 Step | 이 Step 완료 후 진행할 Step |

### 2.3 Step 네이밍 규칙

```
Step {Stage번호}.{Step번호}: {한글명} ({영문명})
예: Step 0.1: 아이디어 수집 (Idea Capture)
    Step 0.2: 문제 정의 (Problem Definition)
```

### 2.4 Step 유형

| 유형 | 설명 | 예시 |
|------|------|------|
| 대화형 (Interactive) | 사용자와 Q&A를 통해 정보 수집 | 아이디어 수집, 요구사항 정의 |
| 자동 (Automated) | 이전 산출물을 기반으로 자동 생성 | 문서 통합, 코드 생성 |
| 하이브리드 (Hybrid) | 자동 생성 후 사용자 확인/수정 | 검증, 리뷰 |

---

## 3. 산출물 규칙

### 3.1 필수 산출물

모든 Step은 **markdown 문서**를 산출물로 생성해야 합니다.

```
outputs/
├── stage-0/
│   ├── raw-idea.md
│   ├── problem-statement.md
│   ├── solution-outline.md
│   ├── validation-report.md
│   └── idea-brief.md        # Stage 최종 산출물
├── stage-1/
│   └── ...
```

### 3.2 산출물 문서 템플릿

```markdown
# {산출물 제목}

## 메타데이터
- Stage: {Stage 번호}
- Step: {Step 번호}
- 생성일시: {timestamp}
- 상태: draft | review | final

## 내용

{실제 내용}

## 다음 단계

- [ ] {다음 Step 또는 액션}
```

### 3.3 Stage별 추가 산출물

| Stage | 추가 산출물 |
|-------|------------|
| Stage 0 | - |
| Stage 1 | 기능 명세서, 사용자 스토리 |
| Stage 2 | 이미지, Figma 파일, 와이어프레임 |
| Stage 3 | 소스 코드 |
| Stage 4 | 배포 URL, 인프라 설정 |

---

## 4. Command 작성 규칙

### 4.1 Stage 메인 커맨드 (유일한 커맨드)

각 Stage는 **하나의 메인 커맨드**만 가집니다. 이 커맨드가 에이전트를 활성화하고, 에이전트가 스킬들을 순서대로 호출합니다.

```markdown
# /{stage-name}

{Stage 설명}

## 사용법

/{stage-name}

## 실행 흐름

이 커맨드를 실행하면 {Agent 이름} 에이전트가 활성화되어 다음 Step을 순차적으로 진행합니다:

Step {N}.1 → Step {N}.2 → ... → Step {N}.{마지막}

## 산출물

| Step | 파일명 | 설명 |
|------|--------|------|
| ... | ... | ... |

## 프롬프트

당신은 **{Agent 이름}** 에이전트입니다. `agents/{agent-name}.md`에 정의된 역할과 규칙을 따르세요.

### 핵심 규칙

1. **Step 순서 준수**: 반드시 정해진 순서대로 진행
2. **스킬 활용**: 각 Step에서 해당 스킬을 사용
3. **완료 조건 확인**: 각 Step의 완료 조건이 충족되어야 다음 Step으로 진행
4. **산출물 생성**: 각 Step 완료 시 해당 산출물 파일 생성

### 사용할 스킬 (순서대로)

1. `{step-1-skill}` - Step {N}.1
2. `{step-2-skill}` - Step {N}.2
...
```

---

## 5. Agent 작성 규칙 (핵심)

Agent 문서는 **Step 실행 순서를 명확히 정의**해야 합니다. 이것이 워크플로우의 핵심입니다.

### 5.0 필수 요구사항: Step 순서 명시

> **⚠️ 모든 Agent는 반드시 Step 실행 순서를 명시해야 합니다.**

Agent 문서에는 다음 내용이 **반드시** 포함되어야 합니다:

1. **Step 실행 순서 섹션**: 순서도 형태로 모든 Step 나열
2. **각 Step의 완료 조건**: 다음 Step으로 넘어가기 위한 조건
3. **Step 전환 규칙**: 순차 실행, 완료 확인, 산출물 생성 규칙
4. **금지 행동**: "Step 순서를 건너뛰지 않음" 명시

이 요구사항이 없으면 에이전트가 임의로 Step을 건너뛰거나 순서를 무시할 수 있습니다.

### 5.1 Agent 정의 템플릿

```markdown
# {Agent 이름}

{Agent 역할 설명}

## 역할

- {역할 1}
- {역할 2}

---

## Step 실행 순서 (필수)

이 에이전트는 반드시 아래 순서대로 Step을 실행해야 합니다.
각 Step은 이전 Step이 완료되어야만 진행할 수 있습니다.

```
┌─────────────────────────────────────────────────────────────┐
│  Step {N}.1: {Step명}                                        │
│  ─────────────────────────────────────────────────────────  │
│  스킬: {skill-name}                                         │
│  산출물: outputs/stage-{N}/{output-file}.md                 │
│  완료 조건: {조건 설명}                                      │
├─────────────────────────────────────────────────────────────┤
│                           ↓                                 │
├─────────────────────────────────────────────────────────────┤
│  Step {N}.2: {Step명}                                        │
│  ─────────────────────────────────────────────────────────  │
│  스킬: {skill-name}                                         │
│  입력: {이전 산출물}                                         │
│  산출물: outputs/stage-{N}/{output-file}.md                 │
│  완료 조건: {조건 설명}                                      │
├─────────────────────────────────────────────────────────────┤
│                           ↓                                 │
│  ... (계속)                                                 │
└─────────────────────────────────────────────────────────────┘
```

### Step 전환 규칙

1. **순차 실행**: Step은 반드시 정해진 순서로 진행
2. **완료 확인**: 각 Step의 완료 조건이 충족되어야 다음 Step으로 진행
3. **산출물 생성**: 각 Step 완료 시 해당 산출물 파일 생성 필수
4. **진행 안내**: Step 전환 시 사용자에게 현재 진행 상황 안내

---

## 성격/톤

{대화 스타일 설명}

---

## 핵심 행동

### 대화 시작
{시작 방법}

### 대화 진행
{진행 방법}

### Step 전환 멘트
{전환 시 사용할 멘트 예시}

---

## 금지 행동

- Step 순서를 건너뛰지 않음
- 완료 조건 충족 전 다음 Step으로 진행하지 않음
- ...

---

## 사용하는 스킬

| 스킬 | Step | 용도 |
|------|------|------|
| {skill-name} | {N}.1 | {용도} |
| ... | ... | ... |
```

---

## 6. Skill 작성 규칙

### 6.1 Skill 정의 템플릿

```markdown
# {Skill 이름}

Step {N}.{M}: {한글명}

## 설명

{Skill이 하는 일}

## 트리거

- Step {이전} 완료 후 자동 실행
- {입력 파일}이 존재할 때

## 입력

- {필요한 입력 또는 이전 산출물}

## 실행 내용

### 질문 가이드 (대화형인 경우)

1. "{질문 1}"
2. "{질문 2}"
...

### 대화 원칙

- {원칙 1}
- {원칙 2}

## 산출물

`outputs/stage-{N}/{output-file}.md`

```markdown
# {산출물 제목}

## 메타데이터
...

## 내용
...
```

## 완료 조건

- {조건 1}
- {조건 2}
- `{output-file}.md` 파일이 생성됨

## 다음 Step

→ Step {N}.{M+1}: {다음 Step명}
```

---

## 7. plugin.json 스키마

```json
{
  "name": "stage-{N}-{name}",
  "description": "{Stage 설명}",
  "version": "1.0.0",
  "commands": [
    "./commands/{stage-main}.md"
  ],
  "skills": [
    "./"
  ],
  "agents": [
    "./agents/{agent-name}.md"
  ]
}
```

---

## 8. 상태 관리

워크플로우 상태는 `workflow-state-manager` 플러그인과 연동하여 관리합니다.

### 8.1 상태 파일 구조

```json
{
  "currentStage": 0,
  "currentStep": 1,
  "stages": {
    "0": {
      "status": "in_progress",
      "steps": {
        "1": "completed",
        "2": "in_progress",
        "3": "pending"
      }
    }
  }
}
```

---

## 9. 설계 체크리스트

새로운 Stage를 만들 때 확인할 사항:

### Stage 레벨
- [ ] Stage 목적이 명확한가?
- [ ] 입력과 최종 산출물이 정의되어 있는가?
- [ ] 메인 커맨드가 정의되어 있는가?
- [ ] 이전 Stage 산출물과 연결되는가?
- [ ] 다음 Stage로 넘길 산출물이 명확한가?

### Agent 레벨
- [ ] Step 실행 순서가 Agent 문서에 명확히 정의되어 있는가?
- [ ] 각 Step의 완료 조건이 정의되어 있는가?
- [ ] Step 전환 규칙이 명시되어 있는가?
- [ ] 사용할 스킬 목록이 순서대로 나열되어 있는가?

### Step/Skill 레벨
- [ ] 각 Step이 스킬로 구현되어 있는가?
- [ ] 각 스킬의 입력/산출물이 정의되어 있는가?
- [ ] 각 스킬의 완료 조건이 정의되어 있는가?
- [ ] 다음 Step으로의 연결이 명시되어 있는가?

---

## 10. 예시: Stage 0 설계

```
Stage 0: 아이디어 고도화 (Ideation)

목적: 막연한 아이디어를 제품화 가능한 수준으로 구체화

진입점: /ideate (유일한 커맨드)

에이전트: Idea Coach
    └── Step 순서가 정의됨 (agents/idea-coach.md)

Steps (스킬로 구현):
├── Step 0.1: Idea Capture (idea-capture) → raw-idea.md
├── Step 0.2: Problem Definition (problem-definition) → problem-statement.md
├── Step 0.3: Solution Framing (solution-framing) → solution-outline.md
├── Step 0.4: Idea Validation (idea-validation) → validation-report.md
└── Step 0.5: Brief Generation (brief-generation) → idea-brief.md

폴더 구조:
ideation/
├── commands/
│   └── ideate.md           # 유일한 진입점
├── agents/
│   └── idea-coach.md       # Step 순서 정의
├── skills/
│   ├── idea-capture.md     # Step 0.1
│   ├── problem-definition.md   # Step 0.2
│   ├── solution-framing.md     # Step 0.3
│   ├── idea-validation.md      # Step 0.4
│   └── brief-generation.md     # Step 0.5
├── plugin.json
└── SKILL.md
```
