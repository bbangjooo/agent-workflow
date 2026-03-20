# Write Show HN

Hacker News "Show HN" 포스트를 생성합니다.

## 설명

HN 커뮤니티의 높은 기술 수준과 직접적 문화에 맞춘 포스트를 작성합니다. 과장 없이 기술적으로 정직한 톤으로, 바로 제출할 수 있는 형태로 출력합니다.

## 입력

> **참고**: `outputs/promotion/copy-research.md`가 존재하면 경쟁사/성공 사례의 실제 카피 패턴을 참조하여 콘텐츠를 생성합니다. 검증된 패턴을 우리 제품에 맞게 변형합니다.

- 제품명, 한줄 설명, 기술 스택, 해결하는 문제, 라이브 URL

## 실행 내용

### 1. Title

```
포맷: "Show HN: {제품명} – {한줄 설명}"
제한: 80자 이내
원칙:
- 마케팅 용어 금지 (revolutionary, game-changing 등)
- 기술적으로 무엇인지 직접적으로 설명
- "I built..." 보다 제품 자체를 설명

좋은 예:
- "Show HN: Cal.com – Open-source Calendly alternative"
- "Show HN: Hatchet – Open-source distributed task queue"

나쁜 예:
- "Show HN: The revolutionary AI that changes everything"
```

### 2. Body Text

```
구조 (200-400단어):

[문제] (1-2문장)
나 또는 우리가 겪은 구체적 문제

[해결책] (2-3문장)
무엇을 만들었고 어떻게 작동하는지

[기술 스택] (1-2문장)
사용한 기술과 아키텍처 결정의 이유

[현재 상태] (1문장)
Alpha/Beta/Production, 오픈소스 여부

[피드백 요청] (1문장)
구체적으로 어떤 피드백을 원하는지

톤 규칙:
- 1인칭 사용 ("I built", "We made")
- 기술적 디테일 포함 (HN 유저는 기술에 관심)
- 정직하게 한계점도 언급
- 절대 upvote 요청 금지
```

### 3. 댓글 대응 준비

```
예상 질문과 답변 초안:
- "How is this different from X?" → 차별점 명확히
- "What's the tech stack?" → 상세 설명
- "Is this open source?" → 라이선스/오픈소스 계획
- "How do you plan to monetize?" → 수익 모델 솔직히
- "What about privacy/security?" → 데이터 처리 방식
```

## 산출물

`outputs/promotion/show-hn/post.md`

```markdown
# Show HN Post

## Title
Show HN: {제품명} – {설명}

## Body
{본문 전체}

## URL
{라이브 URL}

## FAQ 대응
### "How is this different from X?"
{답변}

### "What's the tech stack?"
{답변}

### "How do you plan to monetize?"
{답변}
```

## 완료 조건

- Title 80자 이내, 마케팅 용어 미사용
- Body 200-400단어, 기술 디테일 포함
- FAQ 대응 최소 3개 준비
