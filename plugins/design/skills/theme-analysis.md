# Theme Analysis

Step 2.2: 테마 분석 — 시각 스타일을 구체적 CSS 숫자로 변환

## 설명

레퍼런스 분석 결과를 바탕으로 시각적 스타일을 **AI가 재현할 수 있는 구체적인 CSS 값**으로 변환하는 스킬입니다. ShadCN/Tailwind CSS 프레임워크의 토큰 구조에 맞춰 출력합니다.

> 핵심: "시각적 스타일을 AI가 재현해낼 수 있는 구체적인 숫자로 표현하라."
> ShadCN의 CSS 키 이름은 유지하고 **값만 변경**하면 구현 단계에서 혼선이 사라진다.

## 트리거

- Step 2.1 (Reference Collection) 완료 후

## 입력

- `outputs/stage-2/references.md` — 레퍼런스 분석 결과
- `outputs/stage-2/platform-selection.md`
- `outputs/stage-0/idea-brief.md`

## 실행 내용

### 1. 색상 토큰 추출

```
레퍼런스의 공통 패턴을 기반으로 색상 결정:

[Primary Colors]
- --primary: {HEX} → oklch 변환
- --primary-foreground: {대비색}

[Background/Surface]
- --background: {메인 배경}
- --foreground: {메인 텍스트}
- --card: {카드 배경}
- --card-foreground: {카드 텍스트}
- --muted: {비활성 배경}
- --muted-foreground: {비활성 텍스트}

[Semantic Colors]
- --destructive: {에러/삭제}
- --success: {성공}
- --warning: {경고}

[Border/Input]
- --border: {기본 보더}
- --input: {입력필드 보더}
- --ring: {포커스 링}

사용자 질문:
1. "레퍼런스들의 색상 톤을 보니 {패턴}이 보여요. 이 방향이 맞나요?"
2. "Primary 색상으로 {색상}을 추천하는데, 어떠세요?"
3. "밝은 테마 / 어두운 테마 / 둘 다 중 어떤 걸 기본으로 할까요?"
```

### 2. 타이포그래피 토큰

```
[Font Family]
- 한글: Pretendard, SUIT, Noto Sans KR
- 영문: Inter, Geist, Plus Jakarta Sans
- 모노: JetBrains Mono, Fira Code

[Type Scale] — ShadCN 호환
- --font-size-xs: 12px
- --font-size-sm: 14px
- --font-size-base: 16px
- --font-size-lg: 18px
- --font-size-xl: 20px
- --font-size-2xl: 24px
- --font-size-3xl: 30px
- --font-size-4xl: 36px

[Font Weight]
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

[Line Height]
- Tight: 1.25
- Normal: 1.5
- Relaxed: 1.75
```

### 3. 간격/레이아웃 토큰

```
[Spacing] — 4px 기반
- --spacing-1: 4px
- --spacing-2: 8px
- --spacing-3: 12px
- --spacing-4: 16px
- --spacing-6: 24px
- --spacing-8: 32px
- --spacing-12: 48px
- --spacing-16: 64px

[Border Radius]
- --radius-sm: 4px (태그, 뱃지)
- --radius-md: 6px (버튼, 입력)
- --radius-lg: 8px (카드)
- --radius-xl: 12px (모달, 시트)
- --radius-full: 9999px (원형)

[Shadow]
- --shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
- --shadow-md: 0 4px 6px rgba(0,0,0,0.07)
- --shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
```

### 4. globals.css 출력

```css
/* 모든 토큰을 ShadCN 호환 globals.css 포맷으로 출력 */
:root {
  --background: oklch(...);
  --foreground: oklch(...);
  --card: oklch(...);
  --card-foreground: oklch(...);
  --primary: oklch(...);
  --primary-foreground: oklch(...);
  --secondary: oklch(...);
  --secondary-foreground: oklch(...);
  --muted: oklch(...);
  --muted-foreground: oklch(...);
  --accent: oklch(...);
  --accent-foreground: oklch(...);
  --destructive: oklch(...);
  --border: oklch(...);
  --input: oklch(...);
  --ring: oklch(...);
  --radius: 0.5rem;
}

.dark {
  /* 다크 모드 토큰 (해당 시) */
}
```

> **중요**: ShadCN의 CSS 변수명은 절대 변경하지 않는다. 값만 바꾼다.
> 이렇게 하면 ShadCN 컴포넌트가 자동으로 테마를 반영한다.

## 산출물

`outputs/stage-2/theme-tokens.md`

```markdown
# Theme Tokens

## 메타데이터
- Stage: 2
- Step: 2.2 - 테마 분석
- 생성일시: {현재 시간}
- 기반 레퍼런스: {레퍼런스 이름 목록}

## Color Tokens

### Light Mode
| Token | Value (oklch) | Value (HEX) | 용도 |
|-------|--------------|-------------|------|
| --background | oklch(...) | #... | 메인 배경 |
| --foreground | oklch(...) | #... | 메인 텍스트 |
| --primary | oklch(...) | #... | 주요 액션 |
| ... | | | |

### Dark Mode (해당 시)
| Token | Value (oklch) | Value (HEX) | 용도 |
|-------|--------------|-------------|------|
| ... | | | |

## Typography Tokens

| Token | Value | 비고 |
|-------|-------|------|
| Font Family (한글) | {폰트명} | |
| Font Family (영문) | {폰트명} | |
| ... | | |

## Spacing & Layout Tokens

| Token | Value | 용도 |
|-------|-------|------|
| --radius | {값} | 기본 보더 반경 |
| --spacing-base | {값} | 기본 간격 |
| ... | | |

## globals.css (바로 복사 가능)

\`\`\`css
{전체 globals.css — 바로 프로젝트에 붙여넣기 가능}
\`\`\`

## Tailwind Config 확장 (해당 시)

\`\`\`js
{tailwind.config.js 커스텀 설정}
\`\`\`
```

## 완료 조건

- 모든 색상 토큰 oklch + HEX 값 결정
- 타이포그래피 폰트 및 스케일 결정
- 간격/보더/그림자 토큰 결정
- **globals.css 형식으로 바로 복사 가능한 코드 포함**
- `theme-tokens.md` 파일 생성

## 다음 Step

→ Step 2.3: Visual Direction (테마 기반 비주얼 방향성 확정)
