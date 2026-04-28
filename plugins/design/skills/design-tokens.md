# Design Tokens

Step 2.4: 디자인 토큰 — 확정된 구조 위에 톤 정리 (brand/ui 분할)

## 설명

와이어프레임으로 확정된 구조 위에 시각적 톤을 입히는 스킬입니다. 토큰을 brand 카테고리(컬러/타이포)와 ui 카테고리(spacing/radius/shadow + globals.css)로 분할 출력합니다.

> 핵심: "구조가 확정된 후에 톤을 입힌다. 집 설계도 없이 벽지부터 고르지 않는다."
> ShadCN의 CSS 키 이름은 유지하고 **값만 변경**한다.

## 트리거

- Step 2.3 (Wireframes) 완료 후

## 입력

- `outputs/stage-2/ui/03-wireframes-{platform}.md` — 확정된 구조
- `outputs/stage-2/ui/02-references.md` — 레퍼런스 분석
- `outputs/stage-2/ui/01-screen-analysis.md` — 화면별 정보 위계
- `outputs/stage-2/brand/01-identity.md` — 브랜드 키워드/분위기

## 산출물 (3개 파일 분할)

이 스킬은 **세 개의 파일**을 동시에 생성한다:

1. **컬러 팔레트 + WCAG 검증** → `outputs/stage-2/brand/02-color.md`
2. **타이포그래피 토큰** → `outputs/stage-2/brand/03-typography.md`
3. **spacing/radius/shadow + globals.css 정본** → `outputs/stage-2/ui/04-tokens.md`

분할 이유: brand(아이덴티티 결정 — 색/폰트)와 ui(레이아웃 시스템)를 분리하면 변경 단위가 명확해진다. 컬러·타이포는 브랜딩 결정이라 리뷰 주기가 다르고, spacing/radius/shadow는 구현 시스템이라 함께 묶여야 합니다. globals.css는 ui/04-tokens가 정본 — 모든 카테고리의 토큰이 여기서 합쳐지므로 brand 색/폰트 값이 변경되면 ui/04-tokens도 함께 갱신해야 한다.

---

## 실행 내용

### 1. 색상 토큰 (3단계 토큰 구조) — `brand/02-color.md`로 출력

```
[Base Token] — 기본 팔레트
Gray-900: #111827    Gray-100: #F3F4F6
Gray-800: #1F2937    Gray-50:  #F9FAFB
Gray-700: #374151    White:    #FFFFFF
Gray-600: #4B5563
Gray-500: #6B7280    (비활성 전용)

Primary-50 ~ Primary-900 (브랜드 색상 팔레트)

[Semantic Token] — 용도 기반 이름
├── Text { text-default, text-secondary, text-tertiary, text-disabled, text-inverse }
├── Background { bg-default, bg-subtle, bg-muted, bg-inverse }
├── Border { border-default, border-strong, border-focus }
├── Icon { icon-default, icon-muted, icon-inverse }
└── Interactive { interactive-default, interactive-hover, interactive-active }

[Component Token] — 특정 컴포넌트용 (필요시)
button-primary-bg, button-primary-text, card-bg, card-border, ...
```

### 2. WCAG 접근성 검증 (필수) — `brand/02-color.md` 안에 포함

```
[WCAG AA 기준]
- 일반 텍스트 (16px 미만): 최소 4.5:1
- 큰 텍스트 (18px+) 또는 굵은 텍스트 (14px+ Bold): 최소 3:1

[WCAG AAA 기준 — 권장]
- 일반 텍스트: 최소 7:1
- 큰 텍스트: 최소 4.5:1

검증 결과 테이블 (예시):
| Semantic Token | Base Color | 배경색 | 명암비 | AA | AAA |
|---------------|-----------|--------|--------|-----|-----|
| text-default | Gray-900 | White | 17.4:1 | OK | OK |
| text-secondary | Gray-700 | White | 9.1:1 | OK | OK |
| text-tertiary | Gray-600 | White | 5.7:1 | OK | NO |
| text-disabled | Gray-500 | White | 4.0:1 | NO | NO |

→ text-disabled만 AA 미충족 허용 (비활성 상태 표시 목적)

접근성 체크 도구:
- Coolors Contrast Checker: coolors.co/contrast-checker
- Leonardo Color: leonardocolor.io/theme.html
```

### 3. 타이포그래피 토큰 — `brand/03-typography.md`로 출력

```
[Font Family]
- 한글 기본: Pretendard (권장) / SUIT / Noto Sans KR
- 영문 기본: Inter / Geist / Plus Jakarta Sans
- 모노스페이스: JetBrains Mono / Fira Code

[Type Scale]
| Token | Size | Weight | Line Height | 용도 |
|-------|------|--------|-------------|------|
| heading-1 | 32px | Bold (700) | 1.25 | 페이지 타이틀 |
| heading-2 | 24px | Semibold (600) | 1.3 | 섹션 타이틀 |
| heading-3 | 20px | Semibold (600) | 1.35 | 서브 타이틀 |
| body-lg | 18px | Regular (400) | 1.5 | 강조 본문 |
| body | 16px | Regular (400) | 1.5 | 기본 본문 |
| body-sm | 14px | Regular (400) | 1.5 | 보조 텍스트 |
| caption | 12px | Regular (400) | 1.5 | 캡션, 라벨 |
```

### 4. 간격/레이아웃 토큰 + globals.css — `ui/04-tokens.md`로 출력

```
[Spacing] — 4px 기반 시스템
space-1=4px, space-2=8px, space-3=12px, space-4=16px,
space-6=24px, space-8=32px, space-12=48px, space-16=64px

[Border Radius]
radius-sm=4px (태그), radius-md=6px (버튼), radius-lg=8px (카드),
radius-xl=12px (모달), radius-full=9999px (원형)

[Shadow]
shadow-sm = 0 1px 2px rgba(0,0,0,0.05) — 미세
shadow-md = 0 4px 6px rgba(0,0,0,0.07) — 카드
shadow-lg = 0 10px 15px rgba(0,0,0,0.1) — 모달

[Border]
border-width-default=1px, border-width-strong=2px (포커스)
```

### 5. globals.css 정본 — `ui/04-tokens.md` 안의 §globals.css 섹션

```css
:root {
  /* Colors — ShadCN 호환 */
  --background: {bg-default};
  --foreground: {text-default};
  --primary: {interactive-default};
  --primary-foreground: {text-inverse};
  --secondary: {bg-muted};
  --secondary-foreground: {text-default};
  --muted: {bg-subtle};
  --muted-foreground: {text-secondary};
  --destructive: {semantic-error};
  --border: {border-default};
  --input: {border-default};
  --ring: {border-focus};

  /* Radius */
  --radius: {radius-md};

  /* Custom semantic tokens */
  --text-default: {value};
  --text-secondary: {value};
  --text-tertiary: {value};
  --text-disabled: {value};
}

.dark { /* 다크 모드 (해당 시) */ }
```

---

## 산출물 템플릿

### 1) `outputs/stage-2/brand/02-color.md`

```markdown
---
owner: 솔로 창업자
status: Draft
last_updated: {YYYY-MM-DD}
stage: 2
step: "2.4 — Color Tokens"
---

# Color

## Base Palette
{Gray + Primary 팔레트}

## Semantic Tokens
{용도별 색상 매핑 테이블}

## WCAG 접근성 검증
{명암비 체크 결과 테이블}
모든 텍스트 색상 AA 기준 충족 (text-disabled 제외).

## Component Tokens (필요시)
{button-primary-bg 등}

## 변경 이력

| 날짜 | 작성자 | 변경 |
|------|--------|------|
| {YYYY-MM-DD} | 솔로 창업자 | 최초 작성 |
```

### 2) `outputs/stage-2/brand/03-typography.md`

```markdown
---
owner: 솔로 창업자
status: Draft
last_updated: {YYYY-MM-DD}
stage: 2
step: "2.4 — Typography Tokens"
---

# Typography

## Font Family
- **한글**: {폰트}
- **영문**: {폰트}
- **모노**: {폰트}

## Type Scale
{타입 스케일 테이블}

## 위계 가이드
- heading-1 → 페이지 타이틀, 페이지당 1회
- heading-2 → 섹션 구분
- body → 본문
- caption → 메타정보, 라벨

## 변경 이력

| 날짜 | 작성자 | 변경 |
|------|--------|------|
| {YYYY-MM-DD} | 솔로 창업자 | 최초 작성 |
```

### 3) `outputs/stage-2/ui/04-tokens.md`

```markdown
---
owner: 솔로 창업자
status: Draft
last_updated: {YYYY-MM-DD}
stage: 2
step: "2.4 — UI Tokens (spacing/radius/shadow + globals.css)"
---

# UI Tokens

> 색상은 [`../brand/02-color.md`](../brand/02-color.md), 타이포는 [`../brand/03-typography.md`](../brand/03-typography.md) 참조.
> 이 문서는 spacing/radius/shadow/border + 정본 globals.css를 담는다.

## Spacing
{간격 테이블}

## Border Radius
{R값 테이블}

## Shadow
{그림자 테이블}

## Border
{보더 테이블}

## globals.css (정본 — 바로 복사 가능)

\`\`\`css
{전체 CSS — 모든 카테고리의 토큰이 합쳐진 정본}
\`\`\`

## Tailwind 확장 설정 (해당 시)

\`\`\`js
{tailwind.config.js}
\`\`\`

## 변경 이력

| 날짜 | 작성자 | 변경 |
|------|--------|------|
| {YYYY-MM-DD} | 솔로 창업자 | 최초 작성 |
```

---

## 레퍼런스: 토큰 구조 사례

```
[Toss Design System (TDS)]
- 50→900 톤 체계, 시맨틱 배경 분리
[Adobe Spectrum]
- 텍스트 4종만 사용 (Heading/Text/Subdued/Disabled)
[ShadCN/Tailwind]
- CSS 변수 기반, oklch 색상, globals.css에서 :root + .dark
```

## 완료 조건

- 3단계 토큰 구조 (Base → Semantic → Component) 정의
- **WCAG 접근성 명암비 검증 완료** (AA 기준 필수, brand/02-color.md에 포함)
- 시맨틱 네이밍 적용 (Gray-900 대신 text-default)
- **globals.css 정본은 ui/04-tokens.md에만 존재** (단일 진실원)
- **세 파일 모두 생성**: `brand/02-color.md`, `brand/03-typography.md`, `ui/04-tokens.md`
- 모든 파일에 메타 헤더 + 변경 이력 표 포함

## 다음 Step

→ Step 2.5: Component Spec (확정된 구조 + 톤으로 컴포넌트화)
