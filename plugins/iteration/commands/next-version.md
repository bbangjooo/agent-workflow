# /next-version

새 버전을 시작하는 커맨드

## 사용법

```
/next-version         # v1 → v2, v2 → v3, ...
```

## 설명

현재 버전을 완료하고 새 버전을 시작합니다. 이전 버전의 모든 산출물은 아카이브되고, 학습된 내용을 바탕으로 새로운 사이클을 시작합니다.

## 트리거

- Deploy 완료 후 제안
- `/reflect` 후 큰 방향 수정이 필요할 때 제안
- 사용자가 직접 호출

## 실행 스킬 순서

1. `archive-version.md` - 현재 버전 아카이브
2. 새 버전 상태 초기화
3. `/ideate` 실행

## Agent

- `iteration-coach.md` 사용

## 입력

- 없음 (대화로 수집)

## 실행 내용

### 1. 버전 완료 확인

```
"v{n}을 완료하고 v{n+1}을 시작하려고 해요.

현재 v{n} 상태:
- Ideation: ✅
- Planning: ✅
- Design: ✅
- Development: ✅
- Deployment: {상태}

새 버전을 시작할까요?"
```

### 2. 버전 회고 (선택적)

```
"새 버전을 시작하기 전에, v{n} 전체를 돌아볼까요?

1. v{n}에서 가장 큰 성과는?
2. v{n+1}에서 가장 개선하고 싶은 건?
3. v{n}에서 유지하고 싶은 건?
"
```

### 3. v{n+1} 목표 설정

```
"v{n+1}의 핵심 목표가 뭐예요?

예:
- '사용자 온보딩 개선'
- '결제 기능 추가'
- 'B2B 확장'
"
```

### 4. 아카이브 실행

```
현재 outputs/를 outputs/versions/v{n}/으로 이동:

outputs/
├── versions/
│   └── v{n}/
│       ├── stage-0/
│       ├── stage-1/
│       ├── stage-2/
│       ├── stage-3/
│       ├── stage-4/
│       ├── feedback/
│       └── decisions/
│
├── stage-0/           # 비어있음 (새 버전용)
├── stage-1/
├── ...
├── feedback/
└── decisions/
```

### 5. 상태 초기화

`.workflow/state.json` 업데이트:

```json
{
  "productVersion": 2,
  "archivedVersions": ["outputs/versions/v1"],
  "currentPhaseId": "ideation",
  "phases": [
    { "id": "ideation", "status": "pending", ... },
    { "id": "planning", "status": "pending", ... },
    ...
  ],
  "iterations": [],
  "decisions": []
}
```

### 6. 컨텍스트 전달

```
"v{n+1}을 시작해요!

📚 v{n}에서 배운 것들:
{핵심 피드백 요약}

🎯 v{n+1} 목표:
{설정한 목표}

💡 v{n} 의사결정 중 재고할 것:
{관련 의사결정 목록}

준비되셨으면 아이디어 단계부터 시작할게요!"
```

### 7. Ideation 시작

```
"이전 버전의 아이디어를 발전시킬 건가요,
아니면 새로운 방향으로 갈 건가요?

1. v{n} 아이디어 발전시키기 → 이전 idea-brief.md 참조
2. 새로운 방향으로 → 백지에서 시작
"
```

## 산출물

1. `outputs/versions/v{n}/` - 이전 버전 아카이브
2. `.workflow/state.json` 업데이트 - 새 버전 상태
3. `outputs/decisions/v{n+1}-goals.md` - 새 버전 목표

### v{n+1}-goals.md 템플릿

```markdown
# v{n+1} Goals

## 메타데이터
- 이전 버전: v{n}
- 시작일: {날짜}
- 목표 완료일: {예상}

---

## 핵심 목표

1. {목표 1}
2. {목표 2}
3. {목표 3}

---

## v{n}에서 가져올 것

- {유지할 것 1}
- {유지할 것 2}

---

## v{n}에서 바꿀 것

- {변경할 것 1} → {새로운 방향}
- {변경할 것 2} → {새로운 방향}

---

## 재고할 의사결정

- DEC-{id}: {제목} - {재고 이유}

---

## 성공 지표

- [ ] {지표 1}
- [ ] {지표 2}
```

## 완료 조건

- 사용자 확인 완료
- 이전 버전 아카이브 완료
- 새 버전 목표 설정 완료
- 상태 초기화 완료
- Ideation 시작됨

## 이전 버전 참조

새 버전 진행 중 언제든 이전 버전 참조 가능:

```
이전 버전의 {stage} 산출물을 참고하려면:
→ outputs/versions/v{n}/stage-{x}/{파일}.md
```

## 주의사항

1. **비파괴적**: 이전 버전은 삭제되지 않고 아카이브됨
2. **선택적 상속**: 이전 버전 내용을 참조할지 말지는 사용자 선택
3. **깨끗한 시작**: 새 버전은 빈 상태로 시작하여 명확한 구분
