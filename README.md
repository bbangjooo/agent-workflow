# AI 기반 제품 개발 워크플로우

1인 창업자를 위한 End-to-End AI 지원 제품 개발 플랫폼입니다. 아이디어 구체화부터 배포까지 전 과정을 Claude Code 플러그인을 통해 단계별로 안내하며, **목표 기반 이터레이션**을 통해 제품을 지속적으로 발전시킬 수 있습니다.

```
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    ▼                                                         │
아이디어 → 기획 → 디자인 → 개발 → 배포 → 피드백/회고 ─────────┘
(Stage 0)  (Stage 1)  (Stage 2)  (Stage 3)  (Stage 4)    ↓
    │                                              목표 정렬 검증
    └─ 목표 설정                                         ↓
                                                    이터레이션
                                                  (이전 단계로)
```

## 설치 방법

Claude Code에서 다음 명령어를 실행합니다:

```bash
claude plugin marketplace add https://github.com/bbangjooo/agent-workflow.git
```

## 플러그인 목록

### 핵심 워크플로우

| 명령어 | 플러그인 | 설명 |
|--------|----------|------|
| `/ideate` | ideation | 막연한 아이디어를 구체적인 제품 컨셉으로 발전 |
| `/plan` | planning | 아이디어를 PRD(기획서)로 변환 |
| `/design` | design | 개발자가 바로 구현 가능한 디자인 스펙 생성 |
| `/develop` | development | 디자인 스펙 기반 MVP 코드 구현 |
| `/deploy` | deployment | 무료 호스팅에 자동 배포 |

### 피드백 & 이터레이션

| 명령어 | 플러그인 | 설명 |
|--------|----------|------|
| `/reflect` | feedback | 각 Stage 완료 후 회고 - 학습점과 개선점 수집 |
| `/decide` | feedback | 중요 의사결정 기록 및 추적 |
| `/review` | feedback | Stage 간 산출물 정합성 검토 |
| `/iterate {stage}` | iteration | 이전 Stage로 돌아가 개선 |
| `/next-version` | iteration | 현재 버전 완료 후 새 버전(v2) 시작 |
| `/new-product` | iteration | 완전히 새로운 제품 시작 |

### 보조 도구

| 명령어 | 플러그인 | 설명 |
|--------|----------|------|
| `/build-project` | orchestrator | 모든 단계를 자동으로 연결하여 실행 |
| `/debug` | debugging | 개발/배포 중 오류 체계적 해결 |
| `/check-ui-spec` | debugging | UI가 디자인 스펙과 일치하는지 검증 |
| `/workflow-status` | workflow-state-manager | 현재 진행 상황 확인 |
| `/workflow-resume` | workflow-state-manager | 마지막 지점부터 재개 |
| `/workflow-reset` | workflow-state-manager | 처음부터 다시 시작 |

## 빠른 시작

**전체 자동 실행**:
```
/build-project
```

**단계별 실행**:
```
/ideate → /plan → /design → /develop → /deploy
```

**피드백 루프 활용**:
```
/reflect          # 완료된 Stage 회고
/iterate planning # 기획 단계로 돌아가 개선
/next-version     # v2 시작
```

## 목표 기반 이터레이션

무한 피드백 루프가 목표에서 벗어나 발산하지 않도록, **매 피드백마다 목표 정렬 검증**을 수행합니다.

### 동작 방식

```
[Ideation 완료]
     ↓
목표 자동 추출 (idea-brief.md → goals)
     ↓
[각 Stage 진행]
     ↓
[/reflect 실행]
     ↓
┌─────────────────────────────────────┐
│ 1. 학습점 수집                       │
│ 2. 개선점 도출                       │
│ 3. 목표 정렬 검증 ← NEW             │
│    - 개선점이 목표에 기여하는가?      │
│    - 목표 진척도 업데이트            │
│    - 발산 감지 (3회 연속 진척 없음)   │
│ 4. 다음 액션 제안                    │
└─────────────────────────────────────┘
```

### 목표 진척도 추적

각 Stage 완료 후 `/reflect`를 실행하면:

| 목표 | 이전 | 현재 | 변화 |
|------|------|------|------|
| 온보딩 3분 내 완료 | 30% | 45% | +15% |
| MVP 핵심 기능 구현 | 50% | 50% | ±0% |

### 발산 감지 및 대응

3회 연속 목표 진척이 없으면 경고와 함께 추가 옵션 제시:

```
🚨 최근 3번의 이터레이션 동안 목표 진척이 없었어요.

추가 옵션:
4️⃣ 목표 재검토 - 목표가 여전히 유효한지 확인
5️⃣ 목표 수정 - 현실에 맞게 목표 조정
6️⃣ 이터레이션 중단 - 현 상태로 버전 완료
```

### 관련 타입 (TypeScript)

```typescript
interface Goal {
  id: string;
  description: string;
  successIndicators: string[];  // 성공 지표
  currentProgress: number;      // 0-100%
  progressHistory: ProgressEntry[];
  status: 'active' | 'achieved' | 'abandoned' | 'revised';
}

interface WorkflowState {
  // ...기존 필드
  goals: Goal[];
  consecutiveNoProgress: number;  // 발산 감지용
}
```

## 라이선스

MIT License
