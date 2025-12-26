# Load Design Spec

Step U.1: 디자인 스펙 로드 및 토큰 추출

## 설명

디자인 스펙 문서와 Design-Dev Bridge 문서에서 모든 디자인 토큰을 추출하여 검증에 사용할 수 있는 형태로 정리하는 스킬입니다.

## 트리거

- `/check-ui-spec` 커맨드 실행 시 첫 번째로 실행
- UI Spec Checker 에이전트 시작 시

## 입력

- `outputs/stage-2/design-spec-web.md` 또는 `design-spec-mobile.md` (필수)
- `outputs/stage-3/design-dev-bridge.md` (권장)
- `outputs/stage-2/design-system.md` (참조)
- `outputs/stage-2/color-palette.md` (참조)

---

## 실행 내용

### 1. 플랫폼 확인

먼저 어떤 플랫폼의 스펙을 검사할지 확인합니다:

```
프로젝트에서 다음 디자인 스펙을 발견했습니다:

- [x] design-spec-web.md
- [ ] design-spec-mobile.md

어떤 플랫폼의 UI를 검사할까요?
```

### 2. 디자인 토큰 추출

디자인 스펙 문서에서 다음 토큰들을 추출합니다:

#### 2.1 색상 토큰

```
추출 대상:
- Primary 색상 (Primary, Light, Dark)
- Secondary 색상
- Neutral/Gray 스케일 (50-900)
- Semantic 색상 (Success, Warning, Error, Info)
```

#### 2.2 타이포그래피 토큰

```
추출 대상:
- 폰트 패밀리
- 제목 스케일 (H1-H6)
- 본문 스케일 (Body, Small, Caption)
- 폰트 굵기 (weight)
- 줄간격 (line-height)
```

#### 2.3 간격 토큰

```
추출 대상:
- Spacing 스케일 (space-1 ~ space-12)
- 기본 단위 (보통 4px 또는 8px 기반)
```

#### 2.4 기타 토큰

```
추출 대상:
- Border Radius (sm, md, lg, full)
- Shadow (sm, md, lg)
- Breakpoints (sm, md, lg, xl)
```

### 3. 시맨틱 토큰 매핑 (design-dev-bridge.md에서)

Design-Dev Bridge 문서가 있으면, 시맨틱 토큰과 실제 값의 매핑을 추출합니다:

```
예시:
button-primary-bg → #3B82F6 또는 bg-primary
text-heading-1 → 32px/700
```

### 4. Tailwind/CSS 클래스 매핑

토큰을 실제 코드에서 찾을 수 있는 형태로 변환합니다:

```markdown
## 토큰 → 코드 매핑

### 색상
| 디자인 토큰 | HEX 값 | Tailwind 클래스 | CSS 변수 |
|------------|--------|-----------------|----------|
| Primary | #3B82F6 | bg-primary, text-primary | var(--color-primary) |
| Primary Light | #DBEAFE | bg-primary-light | var(--color-primary-light) |
| Gray-900 | #111827 | text-gray-900 | var(--color-gray-900) |

### 타이포그래피
| 디자인 토큰 | 크기/굵기 | Tailwind 클래스 |
|------------|----------|-----------------|
| H1 | 32px/700 | text-3xl font-bold |
| Body | 16px/400 | text-base font-normal |

### 간격
| 디자인 토큰 | 값 | Tailwind 클래스 |
|------------|-----|-----------------|
| space-4 | 16px | p-4, m-4, gap-4 |
| space-8 | 32px | p-8, m-8, gap-8 |
```

---

## 질문 가이드

### 스펙 파일이 없을 경우

```
디자인 스펙 파일을 찾을 수 없습니다.

다음 중 해당하는 상황을 선택해주세요:

1. 디자인 스펙 파일이 다른 위치에 있음
   → 파일 경로를 알려주세요

2. 디자인 스펙 없이 기본 검사 진행
   → Tailwind 기본 토큰으로 검사합니다

3. 디자인 단계로 돌아가기
   → /design 으로 디자인 스펙을 먼저 만듭니다
```

### 커스텀 토큰이 있을 경우

```
프로젝트에서 커스텀 디자인 토큰을 발견했습니다:

- globals.css의 @theme 블록
- tailwind.config.ts의 확장 설정

이 설정도 검사에 포함할까요?
```

---

## 산출물

`outputs/debugging/spec-tokens.md`

```markdown
# Design Spec Tokens

## 메타데이터
- 생성일시: {현재 시간}
- 플랫폼: {Web/Mobile}
- 소스 문서: design-spec-{platform}.md

---

## 1. 색상 토큰

### Primary
| 토큰명 | HEX | RGB | Tailwind | CSS 변수 |
|--------|-----|-----|----------|----------|
| primary | #3B82F6 | rgb(59,130,246) | bg-primary | --color-primary |
| primary-light | #DBEAFE | rgb(219,234,254) | bg-primary-light | --color-primary-light |
| primary-dark | #1D4ED8 | rgb(29,78,216) | bg-primary-dark | --color-primary-dark |

### Neutral
| 토큰명 | HEX | Tailwind | CSS 변수 |
|--------|-----|----------|----------|
| gray-50 | #F9FAFB | bg-gray-50 | --color-gray-50 |
| gray-100 | #F3F4F6 | bg-gray-100 | --color-gray-100 |
| ... | ... | ... | ... |
| gray-900 | #111827 | bg-gray-900 | --color-gray-900 |

### Semantic
| 토큰명 | HEX | Tailwind | CSS 변수 | 용도 |
|--------|-----|----------|----------|------|
| success | #10B981 | text-success | --color-success | 성공 |
| warning | #F59E0B | text-warning | --color-warning | 경고 |
| error | #EF4444 | text-error | --color-error | 에러 |

---

## 2. 타이포그래피 토큰

### 폰트 패밀리
- Primary: {폰트명}, system-ui, sans-serif
- Tailwind: font-sans

### 타입 스케일
| 토큰명 | 크기 | 굵기 | 줄간격 | Tailwind |
|--------|------|------|--------|----------|
| h1 | 32px | 700 | 40px | text-3xl font-bold leading-10 |
| h2 | 24px | 600 | 32px | text-2xl font-semibold leading-8 |
| h3 | 20px | 600 | 28px | text-xl font-semibold leading-7 |
| body | 16px | 400 | 24px | text-base font-normal leading-6 |
| small | 14px | 400 | 20px | text-sm font-normal leading-5 |
| caption | 12px | 400 | 16px | text-xs font-normal leading-4 |

---

## 3. 간격 토큰

### Spacing Scale
| 토큰명 | 값 | Tailwind | 용도 |
|--------|-----|----------|------|
| space-1 | 4px | p-1, m-1 | 최소 간격 |
| space-2 | 8px | p-2, m-2 | 작은 간격 |
| space-3 | 12px | p-3, m-3 | |
| space-4 | 16px | p-4, m-4 | 기본 간격 |
| space-6 | 24px | p-6, m-6 | |
| space-8 | 32px | p-8, m-8 | 큰 간격 |
| space-12 | 48px | p-12, m-12 | 섹션 간격 |

---

## 4. 기타 토큰

### Border Radius
| 토큰명 | 값 | Tailwind |
|--------|-----|----------|
| radius-sm | 4px | rounded-sm |
| radius-md | 8px | rounded-md |
| radius-lg | 12px | rounded-lg |
| radius-full | 9999px | rounded-full |

### Shadow
| 토큰명 | 값 | Tailwind |
|--------|-----|----------|
| shadow-sm | 0 1px 2px rgba(0,0,0,0.05) | shadow-sm |
| shadow-md | 0 4px 6px rgba(0,0,0,0.1) | shadow-md |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | shadow-lg |

### Breakpoints
| 토큰명 | 값 | Tailwind prefix |
|--------|-----|-----------------|
| mobile | < 640px | (default) |
| tablet | >= 640px | sm: |
| desktop | >= 1024px | lg: |

---

## 5. 검사 패턴 (내부용)

### 하드코딩 탐지 정규식

```javascript
const PATTERNS = {
  // 색상 하드코딩
  hexColor: /#[0-9A-Fa-f]{3,8}/g,
  rgbColor: /rgb\([^)]+\)/g,
  rgbaColor: /rgba\([^)]+\)/g,

  // 숫자 하드코딩 (px 단위)
  pxValue: /:\s*\d+px/g,
  arbitraryTailwind: /\[[\d.]+(?:px|rem|em)\]/g,

  // 허용되는 색상 (검사에서 제외)
  allowedColors: [
    '#FFFFFF', '#FFF', '#000000', '#000',  // 순수 흰/검
    'transparent', 'currentColor', 'inherit'
  ]
};
```

### 매핑 테이블 (검증용)

```javascript
const TOKEN_MAP = {
  colors: {
    '#3B82F6': ['bg-primary', 'text-primary', 'border-primary'],
    '#111827': ['bg-gray-900', 'text-gray-900'],
    // ... 모든 색상 매핑
  },
  spacing: {
    '4px': ['p-1', 'm-1', 'gap-1'],
    '16px': ['p-4', 'm-4', 'gap-4'],
    // ... 모든 간격 매핑
  }
};
```

---

## 다음 단계

→ Step U.2: Code Analysis (코드 분석)
```

---

## 완료 조건

- [ ] 플랫폼 확인 완료 (Web/Mobile)
- [ ] 모든 색상 토큰 추출 완료
- [ ] 모든 타이포그래피 토큰 추출 완료
- [ ] 모든 간격 토큰 추출 완료
- [ ] 기타 토큰 (radius, shadow, breakpoint) 추출 완료
- [ ] 토큰 → 코드 매핑 테이블 생성 완료
- [ ] `spec-tokens.md` 파일 생성됨

## 다음 Step

→ Step U.2: Code Analysis (analyze-ui-code)
