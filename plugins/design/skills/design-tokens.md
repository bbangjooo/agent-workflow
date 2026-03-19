# Design Tokens

Step 2.4: 디자인 토큰 — 확정된 구조 위에 톤 정리

## 설명

와이어프레임으로 확정된 구조 위에 시각적 톤을 입히는 스킬입니다. 컬러, 폰트, 사이즈, 라인, R값 등 모든 디자인 토큰을 정의하고 **ShadCN 호환 globals.css**로 출력합니다.

> 핵심: "구조가 확정된 후에 톤을 입힌다. 집 설계도 없이 벽지부터 고르지 않는다."
> ShadCN의 CSS 키 이름은 유지하고 **값만 변경**한다.

## 트리거

- Step 2.3 (Wireframes) 완료 후

## 입력

- `outputs/stage-2/wireframes-{platform}.md` — 확정된 구조
- `outputs/stage-2/references.md` — 레퍼런스 분석
- `outputs/stage-2/screen-analysis.md` — 화면별 정보 위계

## 실행 내용

### 1. 색상 토큰 (3단계 토큰 구조)

```
[Base Token] — 기본 팔레트
Gray-900: #111827    Gray-100: #F3F4F6
Gray-800: #1F2937    Gray-50:  #F9FAFB
Gray-700: #374151    White:    #FFFFFF
Gray-600: #4B5563
Gray-500: #6B7280    (비활성 전용)

Primary-50 ~ Primary-900 (브랜드 색상 팔레트)

[Semantic Token] — 용도 기반 이름
├── Text
│   ├── text-default:    Gray-900  (기본 텍스트)
│   ├── text-secondary:  Gray-700  (보조 텍스트)
│   ├── text-tertiary:   Gray-600  (약한 텍스트)
│   ├── text-disabled:   Gray-500  (비활성 — WCAG AA 미충족 허용)
│   └── text-inverse:    White     (어두운 배경 위 텍스트)
├── Background
│   ├── bg-default:      White
│   ├── bg-subtle:       Gray-50
│   ├── bg-muted:        Gray-100
│   └── bg-inverse:      Gray-900
├── Border
│   ├── border-default:  Gray-200
│   ├── border-strong:   Gray-300
│   └── border-focus:    Primary-500
├── Icon
│   ├── icon-default:    Gray-700
│   ├── icon-muted:      Gray-500
│   └── icon-inverse:    White
└── Interactive
    ├── interactive-default:  Primary-600
    ├── interactive-hover:    Primary-700
    └── interactive-active:   Primary-800

[Component Token] — 특정 컴포넌트용 (필요시)
├── button-primary-bg:    → interactive-default
├── button-primary-text:  → text-inverse
├── card-bg:              → bg-default
└── card-border:          → border-default
```

### 2. WCAG 접근성 검증 (필수)

```
모든 텍스트 색상에 대해 배경색 기준 명암비 체크:

[WCAG AA 기준]
- 일반 텍스트 (16px 미만): 최소 4.5:1
- 큰 텍스트 (18px+) 또는 굵은 텍스트 (14px+ Bold): 최소 3:1

[WCAG AAA 기준 — 권장]
- 일반 텍스트: 최소 7:1
- 큰 텍스트: 최소 4.5:1

검증 결과 테이블:
| Semantic Token | Base Color | 배경색 | 명암비 | AA | AAA |
|---------------|-----------|--------|--------|-----|-----|
| text-default | Gray-900 | White | 17.4:1 | ✅ | ✅ |
| text-secondary | Gray-700 | White | 9.1:1 | ✅ | ✅ |
| text-tertiary | Gray-600 | White | 5.7:1 | ✅ | ❌ |
| text-disabled | Gray-500 | White | 4.0:1 | ❌ | ❌ |

→ text-disabled만 AA 미충족 허용 (비활성 상태 표시 목적)
→ 나머지 텍스트 색상은 AA 필수 충족

접근성 체크 도구:
- Coolors Contrast Checker: coolors.co/contrast-checker
- Leonardo Color: leonardocolor.io/theme.html
- Accessible Web: accessibleweb.com/color-contrast-checker/
```

### 3. 타이포그래피 토큰

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

### 4. 간격/레이아웃 토큰

```
[Spacing] — 4px 기반 시스템
| Token | Value | 용도 |
|-------|-------|------|
| space-1 | 4px | 최소 간격 (아이콘-텍스트) |
| space-2 | 8px | 관련 요소 간격 |
| space-3 | 12px | 컴포넌트 내부 패딩 |
| space-4 | 16px | 기본 간격 |
| space-6 | 24px | 섹션 내 그룹 간격 |
| space-8 | 32px | 섹션 간 간격 |
| space-12 | 48px | 큰 섹션 간격 |
| space-16 | 64px | 페이지 레벨 간격 |

[Border Radius]
| Token | Value | 용도 |
|-------|-------|------|
| radius-sm | 4px | 태그, 뱃지 |
| radius-md | 6px | 버튼, 입력 필드 |
| radius-lg | 8px | 카드 |
| radius-xl | 12px | 모달, 시트 |
| radius-full | 9999px | 원형 (아바타) |

[Shadow]
| Token | Value | 용도 |
|-------|-------|------|
| shadow-sm | 0 1px 2px rgba(0,0,0,0.05) | 미세 깊이감 |
| shadow-md | 0 4px 6px rgba(0,0,0,0.07) | 카드 |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | 모달, 드롭다운 |

[Border]
| Token | Value | 용도 |
|-------|-------|------|
| border-width-default | 1px | 기본 보더 |
| border-width-strong | 2px | 강조 보더 (포커스) |
```

### 5. globals.css 출력

```css
:root {
  /* Colors — ShadCN 호환 */
  --background: {bg-default};
  --foreground: {text-default};
  --card: {bg-default};
  --card-foreground: {text-default};
  --primary: {interactive-default};
  --primary-foreground: {text-inverse};
  --secondary: {bg-muted};
  --secondary-foreground: {text-default};
  --muted: {bg-subtle};
  --muted-foreground: {text-secondary};
  --accent: {bg-subtle};
  --accent-foreground: {text-default};
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

.dark {
  /* 다크 모드 (해당 시) */
}
```

### 6. 레퍼런스: 토큰 구조 사례

```
[Toss Design System (TDS)]
- 50→900 톤 체계 (50 밝음, 900 어두움)
- 네이밍: colors.[색상명][톤값] (예: colors.grey700, colors.blue500)
- Opacity 변형: greyOpacity50~900 (오버레이/스크림용)
- 시맨틱 배경: background, greyBackground, layeredBackground, floatedBackground
- 참고: tossmini-docs.toss.im/tds-react-native/foundation/colors/

[Adobe Spectrum]
- 텍스트 색상 4종만 사용: Gray-900(Heading), 800(Text), 700(Subdued), 500(Disabled)
- Gray-500 이하는 비활성 전용 (WCAG AA 미충족 허용)
- 참고: spectrum.adobe.com

[ShadCN/Tailwind]
- CSS 변수 기반: --background, --foreground, --primary 등
- oklch 색상 형식 권장
- globals.css에서 :root와 .dark로 테마 분리
```

## 산출물

`outputs/stage-2/design-tokens.md`

```markdown
# Design Tokens

## 메타데이터
- Stage: 2
- Step: 2.4 - 디자인 토큰
- 생성일시: {현재 시간}

## Color Tokens

### Base Palette
{Gray 팔레트 + Primary 팔레트 + Semantic Colors}

### Semantic Tokens
{용도별 색상 매핑 테이블}

### WCAG 접근성 검증
{명암비 체크 결과 테이블}
✅ 모든 텍스트 색상 AA 기준 충족 (text-disabled 제외)

## Typography Tokens
{폰트, 타입 스케일 테이블}

## Spacing & Layout Tokens
{간격, 보더반경, 그림자, 보더}

## globals.css (바로 복사 가능)
\`\`\`css
{전체 CSS}
\`\`\`

## Tailwind 확장 설정 (해당 시)
\`\`\`js
{tailwind.config.js}
\`\`\`
```

## 완료 조건

- 3단계 토큰 구조 (Base → Semantic → Component) 정의
- **WCAG 접근성 명암비 검증 완료** (AA 기준 필수)
- 시맨틱 네이밍 적용 (Gray-900 대신 text-default)
- **globals.css 형식으로 바로 복사 가능한 코드 포함**
- `design-tokens.md` 파일 생성

## 다음 Step

→ Step 2.5: Component Spec (확정된 구조 + 톤으로 컴포넌트화)
