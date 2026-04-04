# Community Engage — 커뮤니티 잠입 & 리드 헌팅

Reddit, Twitter, 커뮤니티에서 **이미 제품이 필요한 사람**을 찾아 도움을 주면서 자연스럽게 제품을 노출합니다.

## 설명

> "직접 팔려고 하지 말고, 너의 제품이 필요한 사람을 찾아서 다가가라. 나머지는 입소문이 알아서 해준다."

새 글을 작성하는 것(write-reddit, write-twitter)과 달리, 이 스킬은 **기존 대화에 참여**하는 전략입니다. 제품이 해결하는 문제로 고민하는 사람들의 글을 찾아서, 진짜 도움이 되는 답글을 작성합니다.

핵심 원칙:
- **판매자가 아닌 도움 주는 사람**으로 포지셔닝
- 먼저 가치를 주고, 제품은 자연스럽게 언급
- 답글 10개 중 1개만 제품 언급 (나머지는 순수 도움)

## 입력

> **참고**: 아래 리서치 산출물이 존재하면 반드시 참조합니다:
> - `outputs/promotion/channel-research.md` — 채널별 규칙, 셀프프로모 정책
> - `outputs/promotion/audience-language.md` — 유저가 문제를 표현하는 실제 언어

- 제품명, 해결하는 문제, 핵심 기능, 라이브 URL
- 타겟 채널 (reddit / twitter / both, 기본: both)

## 실행 내용

### 1. 리드 탐색 — 검색 키워드 설계

```
제품이 해결하는 문제를 기반으로 사람들이 도움을 요청할 때 쓰는 검색어를 설계합니다.

[키워드 유형]
A. 문제 호소형
   - "how do I {문제}?"
   - "struggling with {문제}"
   - "is there a tool for {문제}?"
   - "looking for {솔루션 카테고리}"
   - "any recommendations for {카테고리}?"

B. 불만 표출형
   - "{경쟁사} alternative"
   - "{경쟁사} sucks"
   - "tired of {기존 방식}"
   - "{문제} is so frustrating"

C. 비교/탐색형
   - "{카테고리} vs {카테고리}"
   - "best {카테고리} 2025/2026"
   - "what do you use for {문제}?"

audience-language.md가 있으면 유저 실제 표현을 키워드에 반영합니다.
```

### 2. 채널별 리드 탐색 방법

```
[Reddit]
웹 서치로 다음을 검색합니다:
- site:reddit.com "{키워드}" — 최근 1-3개월 필터
- 타겟 서브레딧별: r/{서브레딧} "{키워드}"
- 각 검색 결과에서:
  1. 아직 답변이 부족한 글 (댓글 0-5개)
  2. 최근 글 우선 (1-4주 이내)
  3. 질문/도움요청 글 위주
  4. upvote가 있는 글 (최소한의 관심 증거)

수집 정보:
- 글 URL, 서브레딧, 제목
- 작성자가 겪는 구체적 문제
- 기존 답변 현황 (어떤 솔루션이 추천되었는지)
- 우리 제품이 도움될 수 있는 각도

[Twitter/X]
웹 서치로 다음을 검색합니다:
- site:twitter.com "{키워드}" — 최근 1개월
- "{문제}" looking for recommendations
- 각 검색 결과에서:
  1. 도움 요청 트윗
  2. 불만 토로 트윗
  3. 추천 요청 트윗

수집 정보:
- 트윗 URL, 작성자
- 작성자의 팔로워 규모 (영향력 판단)
- 문맥 (대화 스레드인지, 단독 트윗인지)

[국내 커뮤니티 — 해당 시]
- 네이버 카페, 블라인드, OKKY 등에서 키워드 검색
- "site:{커뮤니티} {한국어 키워드}"
```

### 3. 리드 우선순위 매기기

```
발견된 리드를 다음 기준으로 우선순위를 매깁니다:

[우선순위 높음]
- 직접적으로 우리 제품이 해결하는 문제를 언급
- 아직 좋은 답변을 못 받음
- 최근 글 (1-2주 이내)
- 활발한 서브레딧/커뮤니티

[우선순위 중간]
- 간접적으로 관련된 문제
- 이미 답변이 있지만 우리 관점을 추가할 수 있음
- 2-4주 전 글

[스킵]
- 이미 완전한 답변이 있음
- 1개월 이상 오래된 글
- 커뮤니티 규칙상 외부 링크/제품 추천 금지
```

### 4. 답글 작성 — 3단계 구조

```
모든 답글은 다음 3단계 구조를 따릅니다:

[Step 1] 공감 & 경험 공유 (필수)
- 상대방의 문제에 공감
- 비슷한 경험이 있음을 보여줌
- 예: "I ran into the same issue when..."

[Step 2] 실질적 도움 (필수)
- 제품 언급 없이 진짜 도움이 되는 조언
- 구체적 팁, 방법, 리소스 제공
- 예: "What worked for me was..."

[Step 3] 자연스러운 제품 언급 (선택적 — 10개 중 3개만)
- "I ended up hacking together a little script/tool for this"
- "제품"이 아닌 "내가 살려고 만든 것" 톤으로 (personal survival tool 프레이밍)
  → "I built a product" ❌ → "I hacked together a ruthless little macOS thing" ✅
- **링크를 먼저 주지 않는다** — 상대가 "어디서 받아?" 하고 물어올 때만 공유
  → 먼저 링크를 던지면 그 순간 광고가 됨
  → 상대가 요청하면 그때 "here you go: {URL}" — 이러면 전환율도 높음
- 절대 "Check out my product!" 식의 직접 홍보 금지
- 맥락상 자연스러울 때만 언급

[답글 톤]
- 1인칭 경험담 ("I found that...")
- 캐주얼하고 진정성 있게
- 전문가 느낌이 아닌 동료 느낌
- 해당 커뮤니티의 톤에 맞춤 (channel-research.md 참조)
```

### 5. 답글 유형별 템플릿

```
[Type A: 순수 도움 — 제품 언급 없음]
"{공감 1-2문장}

{구체적 팁/방법 2-3문장}

{추가 리소스나 팁 1문장}"

→ 목적: 신뢰 구축, 커뮤니티 기여, 카르마/팔로워 확보

[Type B: 경험 공유 + 자연 언급]
"{공감 1-2문장}

{문제 해결 과정 2-3문장}

I ended up hacking together a {제품을 비공식적으로 묘사} that {구체적으로 어떻게 해결하는지 1문장}.

{상대방 상황에 맞는 추가 팁 1문장}"

→ 링크 없음. 관심 있으면 상대가 물어봄. 그때 공유.
→ "제품을 런칭했다"가 아니라 "내가 살려고 만든 것" 톤 유지
→ 예시: "I ended up hacking together a ruthless little macOS thing that literally locks my keyboard when my screen time goes past a threshold."

[Type C: 질문 응답형]
"Great question. {짧은 답변}

{구체적 추천 2-3개 — 경쟁사 포함해도 OK}

I've been using {제품명} for {use case} and it works well for {specific scenario}. But {경쟁사}도 {장점} 면에서 좋아요.

Depends on your needs — happy to share more if you have specific requirements."

→ 목적: 공정한 비교 속에서 제품을 하나의 선택지로 포지셔닝
```

### 6. 주간 루틴 설계

```
지속 가능한 커뮤니티 참여를 위한 주간 루틴을 설계합니다.

[Daily — 10-15분]
- 키워드 알림 확인 (설정 가이드 포함)
- 새로운 리드 1-2개 발견 시 답글 작성
- 기존 답글에 대한 반응 확인 & 후속 응답

[Weekly — 30분]
- 새로운 키워드 추가 (트렌드 변화 반영)
- 성과 체크: 어떤 답글이 upvote/좋아요를 받았는지
- Type A vs B vs C 비율 조정

[키워드 알림 & 모니터링 도구]

무료:
- F5Bot (f5bot.com): Reddit 키워드 알림. 무료. 키워드 등록하면 이메일로 알림
- Google Alerts: site:reddit.com "{키워드}" 설정
- Twitter 검색 저장: TweetDeck 또는 Twitter Advanced Search 북마크

유료 (효과 검증된 도구):
- Pulse for Reddit: Reddit 스레드를 키워드로 서핑. 작은 스레드까지 발굴 가능
  → 댓글에서 devs가 불만 토로하는 tiny threads를 자동으로 서피싱해줌
- GummySearch: Reddit 오디언스 리서치. 서브레딧별 pain point, 요청, 추천 분류
- ParseStream: 여러 플랫폼(Reddit, X, 포럼) 크로스 모니터링. 키워드 알림

→ 초기에는 F5Bot(무료)로 시작, 효과 확인 후 Pulse/GummySearch로 확장 권장
```

## 산출물

`outputs/promotion/community-engage/`

### engage-playbook.md

```markdown
# Community Engage Playbook

## 메타데이터
- 생성일시: {현재 시간}
- 타겟 채널: {Reddit/Twitter/Both}

## 1. 검색 키워드

### 문제 호소형
| 키워드 | 예상 채널 | 검색 쿼리 |
|--------|----------|-----------|
| {키워드} | r/{sub} | site:reddit.com "{키워드}" |
| ... | ... | ... |

### 불만 표출형
| 키워드 | 예상 채널 | 검색 쿼리 |
|--------|----------|-----------|
| ... | ... | ... |

### 비교/탐색형
| 키워드 | 예상 채널 | 검색 쿼리 |
|--------|----------|-----------|
| ... | ... | ... |

---

## 2. 발견된 리드

### 우선순위 높음 🔴
| # | 채널 | 글 제목 | URL | 문제 요약 | 답글 유형 |
|---|------|---------|-----|----------|----------|
| 1 | r/{sub} | "{제목}" | {URL} | {문제} | Type B |
| 2 | Twitter | "{트윗 요약}" | {URL} | {문제} | Type C |

### 우선순위 중간 🟡
| # | 채널 | 글 제목 | URL | 문제 요약 | 답글 유형 |
|---|------|---------|-----|----------|----------|
| ... | ... | ... | ... | ... | ... |

---

## 3. 답글 템플릿 (바로 복붙 가능)

### 리드 #1 — r/{sub}: "{제목}"

**유형**: Type B (경험 공유 + 자연 언급)

**답글**:
{전체 답글 텍스트 — 복붙 가능}

**후속 대응 준비**:
- "어떤 점이 다른가요?" → {답변}
- "가격은?" → {답변}

---

### 리드 #2 — Twitter: "{트윗 요약}"

**유형**: Type C (질문 응답형)

**답글**:
{전체 답글 텍스트}

---

## 4. 주간 루틴

### 키워드 알림 설정
- [ ] Reddit: {F5Bot 등 설정 방법}
- [ ] Twitter: {검색 저장 방법}
- [ ] Google Alerts: {설정할 알림 목록}

### 주간 체크리스트
- [ ] 월-금: 키워드 알림 확인 (10-15분)
- [ ] 답글 작성: Type A 7개 + Type B/C 3개 목표
- [ ] 주말: 성과 리뷰 & 키워드 업데이트

### 추적 지표
- 답글 수 (주간)
- Upvote/좋아요 받은 답글 수
- 제품 URL 클릭 (UTM 추적 권장: ?utm_source=reddit&utm_medium=comment)
- DM/문의 전환
```

## 완료 조건

- 최소 10개 검색 키워드 설계
- 최소 5개 리드 발견 & 우선순위 지정
- 각 리드별 바로 복붙 가능한 답글 작성
- Type A(순수 도움) : Type B/C(제품 언급) = 7:3 비율 준수
- 주간 루틴 & 키워드 알림 설정 가이드 포함
- 모든 답글이 해당 채널 커뮤니티 규칙 준수

## 사용처

- `/promote community-engage` — 리드 헌팅 & 답글 생성
- `/promote` 전체 실행 시 Step 5 이후에 실행
- write-reddit, write-twitter와 병행 (새 글 + 기존 글 답글 = 2트랙)
