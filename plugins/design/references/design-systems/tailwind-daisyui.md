# Tailwind CSS + DaisyUI Design System

Tailwind CSS에 테마와 컴포넌트를 추가하는 플러그인 기반 디자인 시스템입니다.

## 개요

DaisyUI는 Tailwind CSS 위에 구축된 컴포넌트 라이브러리로, semantic한 클래스 이름과 다양한 테마를 제공합니다. JavaScript 없이 순수 CSS 클래스만으로 아름다운 UI를 구현할 수 있습니다.

### 특징

- **Zero JavaScript**: 순수 CSS 클래스 기반
- **29+ 테마**: 미리 만들어진 테마 제공
- **시맨틱 클래스**: `btn-primary`, `card` 등 직관적인 이름
- **Tailwind 호환**: 기존 Tailwind 유틸리티와 함께 사용
- **가벼움**: 번들 사이즈 최소화

### 적합한 프로젝트

- 빠른 프로토타이핑
- 다양한 테마가 필요한 프로젝트
- JavaScript 프레임워크에 종속되지 않는 프로젝트
- HTML/CSS 중심 개발

---

## 색상 시스템

### 테마 색상 변수

DaisyUI는 시맨틱한 색상 변수를 사용합니다:

| 색상 | 용도 |
|------|------|
| `primary` | 주요 브랜드 색상, 주요 버튼 |
| `primary-content` | primary 위의 텍스트 색상 |
| `secondary` | 보조 색상 |
| `accent` | 강조 색상 |
| `neutral` | 중립 색상 (헤더, 푸터 등) |
| `base-100` | 기본 배경색 |
| `base-200` | 약간 어두운 배경 |
| `base-300` | 더 어두운 배경 |
| `base-content` | 기본 텍스트 색상 |
| `info` | 정보성 메시지 |
| `success` | 성공 상태 |
| `warning` | 경고 상태 |
| `error` | 에러 상태 |

### 사용 예시

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>
```

---

## 기본 제공 테마

### 인기 테마

| 테마 | 특징 |
|------|------|
| `light` | 밝은 기본 테마 |
| `dark` | 어두운 테마 |
| `cupcake` | 파스텔, 부드러운 느낌 |
| `corporate` | 전문적, 비즈니스 |
| `synthwave` | 80년대 레트로 |
| `retro` | 빈티지 스타일 |
| `cyberpunk` | 네온, 사이버펑크 |
| `valentine` | 핑크, 로맨틱 |
| `garden` | 자연, 녹색 톤 |
| `forest` | 깊은 녹색 |
| `aqua` | 청록색, 시원한 느낌 |
| `lofi` | 저채도, 차분한 느낌 |
| `pastel` | 파스텔 색상 |
| `fantasy` | 판타지 느낌 |
| `wireframe` | 와이어프레임 스타일 |
| `black` | 검정색 기반 |
| `luxury` | 고급스러운 골드 포인트 |
| `dracula` | 드라큘라 다크 테마 |
| `business` | 비즈니스 블루 |
| `night` | 야간 모드 |
| `nord` | Nord 색상 팔레트 |

### 테마 적용

```html
<!-- HTML에서 테마 적용 -->
<html data-theme="cupcake">

<!-- 특정 요소에만 테마 적용 -->
<div data-theme="dark">
  <button class="btn btn-primary">다크 테마 버튼</button>
</div>
```

---

## 핵심 컴포넌트

### Button

```html
<!-- 기본 버튼 -->
<button class="btn">Button</button>

<!-- 색상 변형 -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-link">Link</button>

<!-- 아웃라인 -->
<button class="btn btn-outline btn-primary">Outline</button>

<!-- 크기 -->
<button class="btn btn-lg">Large</button>
<button class="btn btn-md">Medium</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-xs">Tiny</button>

<!-- 상태 -->
<button class="btn loading">Loading</button>
<button class="btn btn-disabled">Disabled</button>
```

### Card

```html
<div class="card w-96 bg-base-100 shadow-xl">
  <figure>
    <img src="image.jpg" alt="Image" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">카드 제목</h2>
    <p>카드 내용이 여기에 들어갑니다.</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">액션</button>
    </div>
  </div>
</div>

<!-- 컴팩트 카드 -->
<div class="card card-compact bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">컴팩트</h2>
    <p>더 작은 패딩</p>
  </div>
</div>
```

### Form 요소

```html
<!-- Input -->
<input type="text" placeholder="입력하세요" class="input input-bordered w-full max-w-xs" />
<input type="text" class="input input-primary" />
<input type="text" class="input input-error" />

<!-- Textarea -->
<textarea class="textarea textarea-bordered" placeholder="내용"></textarea>

<!-- Select -->
<select class="select select-bordered w-full max-w-xs">
  <option disabled selected>선택하세요</option>
  <option>옵션 1</option>
  <option>옵션 2</option>
</select>

<!-- Checkbox -->
<input type="checkbox" class="checkbox checkbox-primary" />

<!-- Toggle -->
<input type="checkbox" class="toggle toggle-primary" />

<!-- Radio -->
<input type="radio" name="radio-1" class="radio radio-primary" />
```

### Modal

```html
<!-- 버튼으로 열기 -->
<button class="btn" onclick="my_modal.showModal()">모달 열기</button>

<dialog id="my_modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">안녕하세요!</h3>
    <p class="py-4">모달 내용입니다.</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">닫기</button>
      </form>
    </div>
  </div>
</dialog>
```

### Navigation

```html
<!-- Navbar -->
<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">로고</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a>메뉴 1</a></li>
      <li><a>메뉴 2</a></li>
    </ul>
  </div>
</div>

<!-- Tabs -->
<div class="tabs tabs-boxed">
  <a class="tab">탭 1</a>
  <a class="tab tab-active">탭 2</a>
  <a class="tab">탭 3</a>
</div>

<!-- Breadcrumbs -->
<div class="breadcrumbs text-sm">
  <ul>
    <li><a>홈</a></li>
    <li><a>문서</a></li>
    <li>현재 페이지</li>
  </ul>
</div>
```

### Alert / Toast

```html
<!-- Alert -->
<div class="alert alert-info">
  <span>정보 메시지입니다.</span>
</div>

<div class="alert alert-success">
  <span>성공했습니다!</span>
</div>

<div class="alert alert-warning">
  <span>주의가 필요합니다.</span>
</div>

<div class="alert alert-error">
  <span>에러가 발생했습니다.</span>
</div>

<!-- Toast (위치 지정) -->
<div class="toast toast-end">
  <div class="alert alert-success">
    <span>저장되었습니다.</span>
  </div>
</div>
```

---

## 설치 및 설정

### npm 설치

```bash
npm install -D tailwindcss postcss autoprefixer daisyui
npx tailwindcss init -p
```

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'corporate'],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
}
```

### globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 커스텀 테마

### 새 테마 정의

```javascript
// tailwind.config.js
module.exports = {
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#FF6B35',
          'primary-content': '#ffffff',
          'secondary': '#004E89',
          'secondary-content': '#ffffff',
          'accent': '#1FB2A5',
          'accent-content': '#ffffff',
          'neutral': '#191D24',
          'neutral-content': '#A6ADBB',
          'base-100': '#ffffff',
          'base-200': '#F2F2F2',
          'base-300': '#E5E6E6',
          'base-content': '#1f2937',
          'info': '#3ABFF8',
          'success': '#36D399',
          'warning': '#FBBD23',
          'error': '#F87272',
          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',
          '--btn-focus-scale': '0.95',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0.5rem',
        },
      },
      'light',
      'dark',
    ],
  },
}
```

### CSS 변수 활용

```css
/* 추가 커스터마이징 */
[data-theme="mytheme"] {
  --rounded-box: 0.5rem;
  --rounded-btn: 0.25rem;
}
```

---

## 테마 전환

### React에서 테마 전환

```tsx
'use client'

import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <label class="swap swap-rotate">
      <input
        type="checkbox"
        onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <svg class="swap-on fill-current w-6 h-6" /* sun icon */ />
      <svg class="swap-off fill-current w-6 h-6" /* moon icon */ />
    </label>
  )
}
```

### 시스템 테마 감지

```tsx
useEffect(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  setTheme(prefersDark ? 'dark' : 'light')
}, [])
```

---

## Tailwind와 함께 사용

DaisyUI 컴포넌트와 Tailwind 유틸리티를 함께 사용:

```html
<!-- DaisyUI 컴포넌트 + Tailwind 유틸리티 -->
<button class="btn btn-primary w-full mt-4 hover:scale-105 transition-transform">
  버튼
</button>

<div class="card bg-base-100 shadow-xl max-w-md mx-auto">
  <div class="card-body gap-4">
    <h2 class="card-title text-2xl font-bold">제목</h2>
    <p class="text-gray-600 leading-relaxed">내용</p>
  </div>
</div>
```

---

## 참고 자료

- [DaisyUI 공식 문서](https://daisyui.com/)
- [DaisyUI GitHub](https://github.com/saadeghi/daisyui)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI 테마 생성기](https://daisyui.com/theme-generator/)
