# Analyze UI Code

Step U.2: UI 코드 스타일 사용 분석

## 설명

프로젝트의 소스 코드를 분석하여 사용 중인 스타일 값들을 추출하고 정리하는 스킬입니다. 이 정보는 디자인 스펙 준수 여부를 검사하는 데 사용됩니다.

## 트리거

- Step U.1 (Load Design Spec) 완료 후 자동 실행
- `spec-tokens.md` 파일이 존재할 때

## 입력

- `outputs/debugging/spec-tokens.md` (필수)
- 프로젝트 소스 코드 (자동 탐색)

---

## 실행 내용

### 1. 프로젝트 구조 파악

먼저 프로젝트의 스타일링 방식을 파악합니다:

```
프로젝트 스타일링 방식 감지 중...

감지 결과:
- Framework: Next.js / React
- Styling: Tailwind CSS v4
- UI Library: shadcn/ui
- CSS Files: globals.css, components/*.tsx
```

### 2. 분석 대상 파일 수집

```
분석할 파일 패턴:
- src/**/*.tsx
- src/**/*.jsx
- src/**/*.css
- app/**/*.tsx
- components/**/*.tsx
- styles/**/*.css
```

### 3. 스타일 사용 분석

#### 3.1 Tailwind 클래스 분석

```javascript
// 추출 대상
const tailwindPatterns = {
  // 색상 관련
  bgColor: /bg-\[?[^\s"'`]+\]?/g,
  textColor: /text-\[?[^\s"'`]+\]?/g,
  borderColor: /border-\[?[^\s"'`]+\]?/g,

  // 타이포그래피
  fontSize: /text-(xs|sm|base|lg|xl|[2-9]xl|\[[^\]]+\])/g,
  fontWeight: /font-(thin|light|normal|medium|semibold|bold|extrabold|black)/g,

  // 간격
  padding: /p[xytblr]?-\[?[^\s"'`]+\]?/g,
  margin: /m[xytblr]?-\[?[^\s"'`]+\]?/g,
  gap: /gap-\[?[^\s"'`]+\]?/g,

  // 기타
  rounded: /rounded(-[^\s"'`]+)?/g,
  shadow: /shadow(-[^\s"'`]+)?/g
};
```

#### 3.2 CSS 변수 사용 분석

```javascript
// CSS 변수 사용 추출
const cssVarUsage = /var\(--[^)]+\)/g;

// @theme 블록 분석 (Tailwind v4)
const themeBlock = /@theme\s*{[\s\S]*?}/g;
```

#### 3.3 하드코딩된 값 탐지

```javascript
// 잠재적 위반 패턴
const hardcodedPatterns = {
  // Tailwind arbitrary 값
  arbitraryColor: /\[#[0-9A-Fa-f]{3,8}\]/g,
  arbitrarySize: /\[\d+(?:px|rem|em)\]/g,

  // inline style
  inlineStyle: /style=\{?\{[^}]+\}?\}/g,

  // CSS 하드코딩
  cssHardcoded: {
    color: /color:\s*#[0-9A-Fa-f]+/g,
    bgColor: /background(?:-color)?:\s*#[0-9A-Fa-f]+/g,
    fontSize: /font-size:\s*\d+px/g,
    margin: /margin(?:-[a-z]+)?:\s*\d+px/g,
    padding: /padding(?:-[a-z]+)?:\s*\d+px/g
  }
};
```

### 4. 파일별 분석 결과 수집

각 파일에서 발견된 스타일 사용을 기록합니다:

```markdown
### src/components/Button.tsx

**클래스 사용:**
- bg-primary (line 15)
- text-white (line 15)
- rounded-lg (line 15)
- px-4 py-2 (line 15)

**잠재적 위반:**
- bg-[#3B82F6] (line 23) - 하드코딩된 색상
- text-[14px] (line 28) - 하드코딩된 폰트 크기
```

### 5. 통계 집계

```markdown
## 분석 통계

### 파일 분석
- 총 분석 파일: 45개
- 스타일 정의 포함: 38개

### 클래스 사용 현황
| 카테고리 | 토큰 사용 | 하드코딩 | 비율 |
|----------|----------|---------|------|
| 색상 | 156 | 12 | 92.9% |
| 타이포그래피 | 89 | 5 | 94.7% |
| 간격 | 234 | 18 | 92.9% |
| Radius | 67 | 3 | 95.7% |
| Shadow | 23 | 1 | 95.8% |

### 가장 많이 사용된 클래스
1. bg-primary - 45회
2. text-gray-900 - 38회
3. p-4 - 32회
4. rounded-lg - 28회
5. shadow-md - 15회

### 하드코딩 핫스팟 (가장 많은 위반 파일)
1. src/components/legacy/OldButton.tsx - 8개
2. src/pages/landing.tsx - 5개
3. src/components/Card.tsx - 4개
```

---

## 질문 가이드

### 분석 범위 확인

```
다음 디렉토리를 분석할 예정입니다:

- src/components/ (32 파일)
- src/pages/ (8 파일)
- app/ (12 파일)

추가로 분석할 디렉토리가 있나요?
제외할 디렉토리가 있나요? (예: node_modules, .next)
```

### CSS-in-JS 사용 시

```
CSS-in-JS 라이브러리 사용이 감지되었습니다:

- styled-components
- emotion

이 라이브러리의 스타일 정의도 분석에 포함할까요?
```

---

## 산출물

`outputs/debugging/style-usage-report.md`

```markdown
# Style Usage Report

## 메타데이터
- 생성일시: {현재 시간}
- 분석 파일 수: {N}개
- 프로젝트: {프로젝트명}

---

## 1. 프로젝트 스타일링 개요

### 기술 스택
- Framework: {Next.js / React / etc.}
- Styling: {Tailwind CSS v4 / v3 / CSS Modules / etc.}
- UI Library: {shadcn/ui / MUI / Chakra / etc.}

### 스타일 파일
| 파일 | 역할 | 토큰 정의 |
|------|------|----------|
| globals.css | 전역 스타일 | @theme 블록 |
| tailwind.config.ts | Tailwind 설정 | 확장 테마 |

---

## 2. 색상 사용 현황

### 토큰 기반 색상 (정상)
| 클래스 | 사용 횟수 | 파일 수 |
|--------|----------|--------|
| bg-primary | 45 | 12 |
| text-gray-900 | 38 | 15 |
| bg-white | 34 | 10 |
| text-primary | 28 | 8 |
| bg-gray-100 | 22 | 7 |

### 하드코딩된 색상 (검토 필요)
| 값 | 클래스/스타일 | 파일 | 라인 |
|-----|--------------|------|------|
| #3B82F6 | bg-[#3B82F6] | Button.tsx | 23 |
| #1F2937 | text-[#1F2937] | Card.tsx | 15 |
| rgb(59,130,246) | style={{ color: ... }} | Hero.tsx | 8 |

---

## 3. 타이포그래피 사용 현황

### 토큰 기반 (정상)
| 클래스 조합 | 용도 | 사용 횟수 |
|------------|------|----------|
| text-3xl font-bold | H1 | 12 |
| text-2xl font-semibold | H2 | 18 |
| text-base | Body | 45 |
| text-sm | Small | 23 |

### 하드코딩된 크기 (검토 필요)
| 값 | 클래스/스타일 | 파일 | 라인 |
|-----|--------------|------|------|
| 30px | text-[30px] | Heading.tsx | 5 |
| 14px | text-[14px] | Caption.tsx | 12 |

---

## 4. 간격 사용 현황

### 토큰 기반 (정상)
| 클래스 | 값 | 사용 횟수 |
|--------|-----|----------|
| p-4 | 16px | 89 |
| p-6 | 24px | 45 |
| gap-4 | 16px | 34 |
| m-2 | 8px | 28 |

### 비표준 간격 (검토 필요)
| 값 | 클래스 | 파일 | 라인 |
|-----|-------|------|------|
| 20px | p-[20px] | Layout.tsx | 22 |
| 10px | gap-[10px] | Grid.tsx | 8 |

---

## 5. 기타 스타일 현황

### Border Radius
| 클래스 | 사용 횟수 | 비표준 값 |
|--------|----------|----------|
| rounded-lg | 45 | - |
| rounded-md | 32 | - |
| rounded-[10px] | 3 | 비표준 |

### Shadow
| 클래스 | 사용 횟수 |
|--------|----------|
| shadow-md | 23 |
| shadow-sm | 15 |
| shadow-lg | 8 |

---

## 6. 파일별 상세 분석

### 하드코딩 많은 파일 (우선 수정 필요)

#### src/components/legacy/OldButton.tsx
```
발견된 하드코딩:
- Line 5: bg-[#3B82F6]
- Line 8: text-[14px]
- Line 12: p-[10px]
- Line 15: rounded-[6px]
- Line 18: shadow-[0_2px_4px_rgba(0,0,0,0.1)]
```

#### src/pages/landing.tsx
```
발견된 하드코딩:
- Line 23: bg-[#1D4ED8]
- Line 45: text-[32px]
- Line 67: mb-[30px]
```

---

## 7. 요약

### 전체 준수율
| 카테고리 | 토큰 사용 | 하드코딩 | 준수율 |
|----------|----------|---------|--------|
| 색상 | 312 | 15 | 95.4% |
| 타이포그래피 | 156 | 8 | 95.1% |
| 간격 | 423 | 22 | 95.0% |
| Radius | 80 | 5 | 94.1% |
| Shadow | 46 | 2 | 95.8% |
| **전체** | **1017** | **52** | **95.1%** |

### 다음 단계
- 총 52개의 잠재적 위반 사항 발견
- Step U.3에서 상세 검사 및 심각도 분류 진행

---

## 다음 단계

→ Step U.3: Spec Compliance Check (스펙 준수 검사)
```

---

## 완료 조건

- [ ] 프로젝트 스타일링 방식 파악 완료
- [ ] 모든 대상 파일 분석 완료
- [ ] 색상 사용 현황 정리 완료
- [ ] 타이포그래피 사용 현황 정리 완료
- [ ] 간격 사용 현황 정리 완료
- [ ] 하드코딩된 값 목록 추출 완료
- [ ] `style-usage-report.md` 파일 생성됨

## 다음 Step

→ Step U.3: Spec Compliance Check (check-spec-compliance)
