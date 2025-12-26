# Suggest Spec Fixes

Step U.4: 디자인 스펙 위반 수정 제안

## 설명

검사에서 발견된 위반 사항들에 대해 구체적인 수정 방법을 제안하고, 자동화 도구 설정 가이드를 제공하는 스킬입니다.

## 트리거

- Step U.3 (Check Spec Compliance) 완료 후 자동 실행
- `compliance-report.md` 파일이 존재할 때

## 입력

- `outputs/debugging/compliance-report.md` (필수)
- `outputs/debugging/spec-tokens.md` (참조)

---

## 실행 내용

### 1. 위반별 수정 코드 생성

각 위반 사항에 대해 Before/After 코드를 생성합니다:

```markdown
## 수정 예시

### VIOLATION-001: Primary 색상 하드코딩

**파일:** `src/components/Button.tsx`

**Before:**
```tsx
<button className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg">
  Click me
</button>
```

**After:**
```tsx
<button className="bg-primary text-white px-4 py-2 rounded-lg">
  Click me
</button>
```

**변경 사항:**
- `bg-[#3B82F6]` → `bg-primary`

**이유:**
- 디자인 토큰을 사용하면 테마 변경 시 자동 적용
- 다크 모드 지원 용이
- 코드 가독성 향상
```

### 2. 일괄 수정 스크립트 생성

반복되는 패턴에 대해 일괄 수정 방법을 제안합니다:

```markdown
## 일괄 수정

### 패턴: #3B82F6 → bg-primary

**영향 파일:** 5개

**VS Code 검색/치환:**
```
검색: bg-\[#3B82F6\]
치환: bg-primary
파일 패턴: src/**/*.tsx
```

**sed 명령어:**
```bash
find src -name "*.tsx" -exec sed -i '' 's/bg-\[#3B82F6\]/bg-primary/g' {} +
```

**주의:** 일괄 수정 후 반드시 테스트 실행
```

### 3. 토큰 추가 제안

디자인 시스템에 없지만 자주 사용되는 값에 대해 토큰 추가를 제안합니다:

```markdown
## 토큰 추가 제안

### 제안 1: space-5 (20px) 추가

**현황:**
- 20px가 8회 사용됨
- 현재 spacing 스케일: 4, 8, 12, 16, 24, 32, 48px

**제안:**
```css
/* globals.css - @theme 블록에 추가 */
@theme {
  /* 기존 spacing */
  --spacing-4: 16px;
  --spacing-5: 20px;  /* 신규 추가 */
  --spacing-6: 24px;
}
```

**영향:**
- p-[20px] → p-5 로 변경 가능
- 스케일 일관성 유지
```

### 4. 자동화 도구 설정

향후 위반 방지를 위한 도구 설정을 안내합니다:

```markdown
## 자동화 설정 가이드

### 1. Stylelint 설정

```javascript
// .stylelintrc.cjs
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    // 하드코딩된 색상 금지
    'color-no-hex': true,

    // 또는 허용 목록 사용
    'declaration-property-value-disallowed-list': {
      'color': ['/^#(?!fff|000)/i'],
      'background-color': ['/^#(?!fff|000)/i'],
      'border-color': ['/^#/i'],
    },
  },
};
```

### 2. ESLint 플러그인 (Tailwind arbitrary 값 제한)

```bash
npm install -D eslint-plugin-tailwindcss
```

```javascript
// eslint.config.js
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  {
    plugins: { tailwindcss },
    rules: {
      'tailwindcss/no-arbitrary-value': 'warn',
    },
  },
];
```

### 3. Git Hook 설정 (lint-staged)

```json
// package.json
{
  "lint-staged": {
    "*.{tsx,jsx}": [
      "eslint --fix",
      "stylelint --fix"
    ],
    "*.css": [
      "stylelint --fix"
    ]
  }
}
```

### 4. CI/CD 통합

```yaml
# .github/workflows/design-check.yml
name: Design Spec Check

on:
  pull_request:
    paths:
      - 'src/**/*.tsx'
      - 'src/**/*.css'

jobs:
  check-design-spec:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install dependencies
        run: npm ci

      - name: Run Stylelint
        run: npx stylelint "src/**/*.css"

      - name: Run ESLint (Tailwind)
        run: npx eslint "src/**/*.tsx" --max-warnings 0
```
```

### 5. Visual Regression Testing 설정

```markdown
## Visual Regression Testing

### Chromatic 설정 (Storybook 사용 시)

```bash
npm install -D chromatic
```

```yaml
# .github/workflows/chromatic.yml
name: Chromatic

on: push

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install dependencies
        run: npm ci

      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

### Percy 설정 (일반 프로젝트)

```bash
npm install -D @percy/cli @percy/playwright
```

```javascript
// tests/visual.spec.ts
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('homepage visual', async ({ page }) => {
  await page.goto('/');
  await percySnapshot(page, 'Homepage');
});
```
```

---

## 산출물

`outputs/debugging/spec-fix-suggestions.md`

```markdown
# Design Spec Fix Suggestions

## 메타데이터
- 생성일시: {현재 시간}
- 총 위반 수: 52개
- 수정 제안 수: 52개

---

## 1. 즉시 수정 (Critical)

### 수정 1: Button.tsx - Primary 색상

**파일:** `src/components/Button.tsx:23`

**Before:**
```tsx
<button className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg">
```

**After:**
```tsx
<button className="bg-primary text-white px-4 py-2 rounded-lg">
```

---

### 수정 2: Link.tsx - Primary 색상

**파일:** `src/components/Link.tsx:8`

**Before:**
```tsx
<a className="text-[#3B82F6] hover:underline">
```

**After:**
```tsx
<a className="text-primary hover:underline">
```

---

### 수정 3: Heading.tsx - 폰트 패밀리

**파일:** `src/components/Heading.tsx:5`

**Before:**
```tsx
<h1 className="font-['Arial'] text-3xl">
```

**After:**
```tsx
<h1 className="font-sans text-3xl">
```

---

## 2. 빠른 수정 (High)

### 수정 4: Alert.tsx - Error 색상

**파일:** `src/components/Alert.tsx:12`

**Before:**
```tsx
<div className="bg-[#EF4444] text-white p-4">
```

**After:**
```tsx
<div className="bg-error text-white p-4">
```

---

### 수정 5: Title.tsx - 폰트 크기

**파일:** `src/components/Title.tsx:8`

**Before:**
```tsx
<h2 className="text-[30px] font-bold">
```

**After:**
```tsx
<h2 className="text-3xl font-bold">  {/* 32px */}
```

**참고:** 30px → 32px로 약간의 크기 차이 발생. 디자인 검토 권장.

---

## 3. 일괄 수정 가이드

### Primary 색상 일괄 수정

**영향 파일 5개:**
- src/components/Button.tsx
- src/components/Link.tsx
- src/components/Badge.tsx
- src/components/Tab.tsx
- src/pages/index.tsx

**VS Code 검색/치환:**
```
검색 정규식: (bg|text|border)-\[#3B82F6\]
치환: $1-primary
```

**CLI 명령어:**
```bash
# 미리보기
grep -rn "\\[#3B82F6\\]" src/

# 실행
find src -name "*.tsx" -exec sed -i '' \
  's/bg-\[#3B82F6\]/bg-primary/g; s/text-\[#3B82F6\]/text-primary/g' {} +
```

---

### 간격 하드코딩 일괄 수정

**20px → p-5 변환 (8개):**

```bash
find src -name "*.tsx" -exec sed -i '' \
  's/p-\[20px\]/p-5/g; s/m-\[20px\]/m-5/g' {} +
```

**단, globals.css에 space-5 추가 필요:**

```css
@theme {
  --spacing-5: 20px;
}
```

---

## 4. 토큰 추가 제안

### 제안 1: spacing-5 추가

```css
/* globals.css */
@theme {
  --spacing-5: 20px;
}
```

**효과:** 8개의 하드코딩 해결

---

### 제안 2: radius-10 추가 (선택)

```css
@theme {
  --radius-10: 10px;
}
```

**효과:** 3개의 하드코딩 해결
**대안:** rounded-lg(12px)로 통일 권장

---

## 5. 자동화 설정

### ESLint 설정 추가

```javascript
// eslint.config.js
export default [
  {
    plugins: { tailwindcss: require('eslint-plugin-tailwindcss') },
    rules: {
      'tailwindcss/no-arbitrary-value': ['warn', {
        ignore: ['before:', 'after:']  // 예외 패턴
      }],
    },
  },
];
```

### Stylelint 설정 추가

```javascript
// .stylelintrc.cjs
module.exports = {
  rules: {
    'color-no-hex': [true, {
      severity: 'warning',
      message: 'Use design tokens instead of hex colors'
    }],
  },
};
```

### Pre-commit Hook

```bash
npm install -D husky lint-staged
npx husky init
```

```json
// package.json
{
  "lint-staged": {
    "*.tsx": ["eslint --fix"],
    "*.css": ["stylelint --fix"]
  }
}
```

---

## 6. 수정 체크리스트

### Critical (3개)
- [ ] Button.tsx:23 - bg-[#3B82F6] → bg-primary
- [ ] Link.tsx:8 - text-[#3B82F6] → text-primary
- [ ] Heading.tsx:5 - font-['Arial'] → font-sans

### High (12개)
- [ ] Alert.tsx:12 - bg-[#EF4444] → bg-error
- [ ] Title.tsx:8 - text-[30px] → text-3xl
- [ ] ... (나머지 항목)

### 자동화 설정
- [ ] ESLint tailwindcss 플러그인 설치
- [ ] Stylelint 설정 추가
- [ ] lint-staged 설정
- [ ] CI 워크플로우 추가

---

## 7. 다음 단계

1. **즉시**: Critical 3개 수정
2. **이번 주**: High 12개 수정 + ESLint 설정
3. **다음 스프린트**: Medium/Low 수정 + CI 통합
4. **지속**: Visual Regression Testing 도입 검토

---

## 검증 명령어

수정 후 다음 명령어로 검증:

```bash
# ESLint 검사
npx eslint src/ --ext .tsx

# 빌드 테스트
npm run build

# UI 테스트 (있는 경우)
npm run test
```

---

## UI Spec Check 완료

모든 위반 사항에 대한 수정 방법이 제안되었습니다.

수정 진행 중 도움이 필요하면 `/debug` 명령어로 Debug Coach를 호출하세요.
```

---

## 완료 조건

- [ ] 모든 Critical 위반에 대한 수정 코드 제공
- [ ] 모든 High 위반에 대한 수정 코드 제공
- [ ] 일괄 수정 가이드 제공 (해당되는 경우)
- [ ] 토큰 추가 제안 (필요한 경우)
- [ ] 자동화 도구 설정 가이드 제공
- [ ] 수정 체크리스트 생성
- [ ] `spec-fix-suggestions.md` 파일 생성됨

---

## 추가 기능

### 수정 적용 지원

사용자가 원하면 직접 수정을 도와줄 수 있습니다:

```
수정 적용을 도와드릴까요?

1. 자동 수정 (권장)
   - Critical/High 항목 자동 수정
   - 변경 사항 Git diff로 검토

2. 파일별 수정
   - 하나씩 확인하며 수정

3. 수동 수정
   - 제안 문서 참고하여 직접 수정
```

### 수정 후 재검증

```
수정이 완료되면 재검증할까요?

/check-ui-spec 명령어로 다시 검사할 수 있습니다.
```
