# 랜딩 페이지 디자인 레퍼런스: Conductor 스타일

> 레퍼런스 URL: https://www.conductor.build/
> 카테고리: 개발자 도구 B2B SaaS 랜딩 페이지, AI 에이전트 오케스트레이션

## 핵심 디자인 원칙

1. **다크 모드 기본 + 클린 레이아웃** — 어두운 배경에 정제된 여백과 계층 구조
2. **최대폭 제약 그리드** — 콘텐츠를 중앙에 고정하여 시선 집중
3. **미묘한 인터랙션** — 호버 시 화살표 이동, 투명도 변화 등 절제된 피드백
4. **자기증명 메시징** — "We built Conductor using Conductor" 자신감 있는 카피
5. **사회적 증거** — 유명 기업 로고 + 실사용자 testimonial 배치

## 레이아웃 구조

```
[Nav] 고정, 로고 좌측 + Changelog/Docs/Join Us 우측
  ↓
[Version Badge] "See what's new in 0.44.0" 경로 표시 링크
  ↓
[Hero] 로고 + H1 "Run a team of coding agents on your Mac"
       + 설명 문단 + 듀얼 CTA 버튼 + 제품 스크린샷
  ↓
[Social Proof] 기업 로고 배너 (Linear, Vercel, Notion, Stripe 등)
  ↓
[Testimonials] 사용자 후기 슬라이드 (프로필 + 직무)
  ↓
[How It Works] 3단계: Add repo → Deploy agents → Conduct
  ↓
[FAQ] 정의 목록(dl) 구조 + "└" 시각적 마커
  ↓
[Recursive CTA] "We built Conductor using Conductor" + 최종 CTA
  ↓
[Footer] 간결, 링크 모음
```

## 색상 팔레트

| 용도 | 색상 | Tailwind |
|------|------|----------|
| 배경 (기본) | 다크 (bg-background) | `bg-background` (CSS 변수) |
| 배경 (보조) | 뮤트 다크 (bg-muted) | `bg-muted` |
| 텍스트 (제목) | 밝은 foreground | `text-foreground` |
| 텍스트 (본문) | 중간 밝기 | `text-muted-foreground` |
| 텍스트 (호버) | 70% 투명도 | `hover:text-foreground/70` |
| 보더 | 미묘한 경계 | `border-border` |
| 팁 박스 | secondary 악센트 | `bg-tip-secondary` |
| 포인트 | 50% 투명도 기본 → 호버 시 100% | `opacity-50 hover:opacity-100` |

## 타이포그래피

```
헤딩: text-xl font-bold tracking-tight (커닝 조정으로 세련된 인상)
본문: text-sm, 읽기 쉬운 소형 글꼴
모노: font-mono (기술적 신뢰감)
강조: font-semibold (시각적 계층화)
버전 라벨: text-xs, muted color
```

## 컴포넌트 패턴

### 듀얼 CTA 버튼
```tsx
{/* Primary: 다운로드 */}
<a className="flex items-center gap-2 rounded-md px-6 py-3 bg-foreground text-background font-medium group justify-between w-full">
  Download Conductor
  <ArrowRight className="transition-transform group-hover:translate-x-1" />
</a>

{/* Secondary: 학습 */}
<a className="flex items-center gap-2 rounded-md px-6 py-3 border border-border text-foreground/70 hover:text-foreground transition-colors group justify-between w-full">
  Learn how it works
  <ArrowRight className="transition-transform group-hover:translate-x-1" />
</a>
```

### 기업 로고 배너 (Social Proof)
```tsx
<div className="flex items-center justify-center gap-8 opacity-50">
  <img src="/logos/linear.svg" alt="Linear" className="h-6" />
  <img src="/logos/vercel.svg" alt="Vercel" className="h-6" />
  <img src="/logos/notion.svg" alt="Notion" className="h-6" />
  <img src="/logos/stripe.svg" alt="Stripe" className="h-6" />
</div>
```

### How It Works 넘버링
```tsx
<div className="grid md:grid-cols-3 gap-8">
  <div>
    <span className="text-sm font-mono text-muted-foreground">01</span>
    <h3 className="text-lg font-bold mt-2">Add your repo</h3>
    <p className="text-sm text-muted-foreground mt-2">설명</p>
  </div>
  {/* 02, 03 동일 구조 */}
</div>
```

### FAQ (└ 마커)
```tsx
<dl className="space-y-6">
  <div>
    <dt className="font-semibold text-foreground">질문?</dt>
    <dd className="text-muted-foreground text-sm mt-1">
      <span className="mr-2">└</span>답변 내용
    </dd>
  </div>
</dl>
```

### Testimonial 카드
```tsx
<div className="border border-border rounded-lg p-6 bg-muted">
  <p className="text-sm text-foreground/80 italic">"후기 내용"</p>
  <div className="flex items-center gap-3 mt-4">
    <img src="/avatar.jpg" className="w-8 h-8 rounded-full" />
    <div>
      <p className="text-sm font-semibold">이름</p>
      <p className="text-xs text-muted-foreground">직무 @ 회사</p>
    </div>
  </div>
</div>
```

## 디자인 톤앤무드

**엔지니어링 중심 + 세련된 신뢰감**
- 모노스페이스 폰트와 다크 테마로 개발자 친화적 분위기
- 절제된 애니메이션 (화살표 translate, opacity 변화만)
- 기업 로고 + testimonial로 실증적 신뢰 구축
- "We built X using X" 자기증명으로 자신감 표현
- 복잡한 기능을 3단계로 단순화하여 명확하게 전달

## 참고 포인트

- **B2B SaaS 랜딩 페이지** 신뢰 구축 패턴 (로고 배너 + testimonial)
- **듀얼 CTA** 전략 (Primary: 다운로드 / Secondary: 학습)
- **3단계 How It Works** 구조로 복잡한 제품을 단순화
- **FAQ** "└" 마커를 활용한 시각적 구분
- **자기증명 메시징** 패턴 ("We built X using X")
- **CSS 변수 기반** 다크/라이트 모드 대응 디자인 토큰 시스템
