# /review

Stage 간 품질 검토 커맨드

## 사용법

```
/review                    # 전체 워크플로우 검토
/review planning design    # Planning → Design 정합성 검토
/review design develop     # Design → Development 정합성 검토
/review all                # 모든 Stage 간 교차 검토
```

## 설명

이전 Stage의 산출물과 현재 Stage의 결과물 간 정합성을 검토합니다. 누락된 항목, 불일치하는 내용, 개선이 필요한 부분을 식별합니다.

## 트리거

- Stage 완료 후 선택적 제안
- 사용자가 직접 호출
- Development 완료 후 자동 제안 (Design vs 실제 구현)

## 실행 스킬 순서

1. `cross-stage-review.md` - Stage 간 검토

## Agent

- `feedback-coach.md` 사용

## 입력

- 검토할 Stage 쌍 (선택적)

## 검토 매트릭스

| Source → Target | 검토 항목 |
|-----------------|----------|
| Ideation → Planning | 아이디어 브리프의 모든 요소가 PRD에 반영됐는가 |
| Planning → Design | PRD의 모든 화면/기능이 디자인에 포함됐는가 |
| Design → Development | 디자인 스펙의 모든 컴포넌트가 구현됐는가 |
| Development → Deployment | 빌드 설정이 배포 환경과 맞는가 |
| Planning → Development | 기능 명세가 코드에 제대로 구현됐는가 |

## 실행 내용

### 1. 검토 범위 확인

```
"어떤 부분을 검토할까요?

1. Planning → Design: 기획이 디자인에 잘 반영됐는지
2. Design → Development: 디자인이 코드에 잘 구현됐는지
3. 전체 검토: 모든 Stage 간 정합성

아니면 특정 Stage 쌍을 지정해주세요."
```

### 2. 산출물 로드

```
검토 대상 산출물 로드 중...
- Source: outputs/stage-{n}/{file}.md
- Target: outputs/stage-{m}/{file}.md
```

### 3. 항목별 검토

#### Planning → Design 검토

```
📋 Planning → Design 검토

1. 화면 구조 매칭
   PRD 화면 목록:
   - [ ] 로그인 화면 → design-spec에 있음 ✅
   - [ ] 대시보드 → design-spec에 있음 ✅
   - [ ] 설정 화면 → ⚠️ 없음

2. 기능 매칭
   PRD 기능 목록:
   - [ ] 소셜 로그인 → component-spec에 있음 ✅
   - [ ] 데이터 내보내기 → ⚠️ 디자인 없음

3. 사용자 플로우 매칭
   - 온보딩 플로우 → ✅ 일치
   - 결제 플로우 → ⚠️ 일부 누락
```

#### Design → Development 검토

```
📋 Design → Development 검토

1. 컴포넌트 구현 상태
   design-system.md 컴포넌트:
   - [ ] Button → src/components/Button.tsx ✅
   - [ ] Card → src/components/Card.tsx ✅
   - [ ] Modal → ⚠️ 미구현

2. 스타일 일치
   - 색상 팔레트 → ✅ CSS 변수와 일치
   - 타이포그래피 → ⚠️ 일부 불일치

3. 화면 구현 상태
   wireframes.md 화면:
   - [ ] LoginPage → pages/login.tsx ✅
   - [ ] Dashboard → pages/dashboard.tsx ✅
   - [ ] Settings → ⚠️ 미구현
```

### 4. 불일치 요약

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Review Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 일치 항목: 15개
⚠️ 불일치/누락: 4개
❓ 검토 필요: 2개

---

🔴 Critical (바로 수정 필요)
1. 설정 화면 디자인 누락
   - PRD에는 있으나 design-spec에 없음
   - 영향: Development에서 구현 불가

🟡 Warning (검토 권장)
1. Modal 컴포넌트 미구현
   - design-system에 정의되어 있음
   - 현재 사용처 없음, 추후 필요할 수 있음

🟢 Info (참고)
1. 색상 값 소수점 차이
   - design: #1a1a1a
   - code: #1b1b1b
   - 시각적 차이 거의 없음

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 5. 액션 제안

```
"검토 결과를 바탕으로:

1️⃣ Critical 이슈 해결
   - /iterate design으로 돌아가 설정 화면 추가

2️⃣ Warning 이슈는 기록
   - 다음 이터레이션에서 처리하도록 기록

3️⃣ 이대로 진행
   - 사소한 불일치는 무시하고 진행

어떻게 할까요?"
```

## 산출물

`outputs/feedback/review-{source}-vs-{target}.md`:

```markdown
# Review: {Source} → {Target}

## 메타데이터
- 검토일: {날짜}
- Source Stage: {source}
- Target Stage: {target}

---

## 검토 결과 요약

| 항목 | 상태 | 개수 |
|------|------|------|
| 일치 | ✅ | {n} |
| 불일치/누락 | ⚠️ | {n} |
| 검토 필요 | ❓ | {n} |

---

## Critical Issues

### {이슈 1}
- **Source**: {source 파일}의 {항목}
- **Target**: {예상 위치}에 없음
- **영향**: {영향 설명}
- **권장 조치**: {조치}

---

## Warnings

### {이슈 1}
- **설명**: {설명}
- **권장 조치**: {조치}

---

## 상세 매칭 결과

| Source 항목 | Target 항목 | 상태 | 비고 |
|------------|------------|------|------|
| {항목} | {항목} | ✅/⚠️/❓ | {비고} |

---

## 결정된 액션

- [ ] {액션 1}
- [ ] {액션 2}
```

## 완료 조건

- 지정된 Stage 쌍 검토 완료
- 불일치 항목 식별 완료
- 검토 문서 생성
- 다음 액션 결정

## 자동 검토 제안 시점

- Design 완료 후: "Planning과 비교해볼까요?"
- Development 완료 후: "Design과 비교해볼까요?"
- 전체 완료 후: "전체 정합성 검토할까요?"
