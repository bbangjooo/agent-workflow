# Heroicons

Tailwind CSS 팀이 제작한 고품질 SVG 아이콘 라이브러리입니다.

## 개요

- **아이콘 수**: 300+
- **스타일**: Outline (24px), Solid (24px), Mini (20px), Micro (16px)
- **라이선스**: MIT
- **공식 사이트**: https://heroicons.com

### 특징

- Tailwind CSS 팀 제작으로 스타일 일관성 보장
- 4가지 스타일 변형 제공
- Tree-shakable
- React, Vue 공식 지원
- Figma 플러그인 제공

### 적합한 프로젝트

- Tailwind CSS 사용 프로젝트
- 깔끔하고 현대적인 UI
- Outline/Solid 스타일 모두 필요한 경우
- 다양한 크기 변형 필요 시

---

## 설치

### React / Next.js

```bash
npm install @heroicons/react
```

### Vue

```bash
npm install @heroicons/vue
```

---

## 사용법

### 기본 사용

Heroicons는 4가지 스타일을 제공합니다:

```tsx
// Outline - 24px, 1.5px stroke
import { BeakerIcon } from '@heroicons/react/24/outline';

// Solid - 24px, filled
import { BeakerIcon } from '@heroicons/react/24/solid';

// Mini - 20px, for smaller UI
import { BeakerIcon } from '@heroicons/react/20/solid';

// Micro - 16px, for very small UI
import { BeakerIcon } from '@heroicons/react/16/solid';
```

### 크기 조절

```tsx
import { HeartIcon } from '@heroicons/react/24/solid';

// className으로 크기 조절 (Tailwind 권장)
<HeartIcon className="h-5 w-5" />
<HeartIcon className="h-6 w-6" />
<HeartIcon className="h-8 w-8" />

// 인라인 스타일
<HeartIcon style={{ height: 24, width: 24 }} />
```

### 색상 변경

```tsx
import { HeartIcon } from '@heroicons/react/24/solid';

// Tailwind 색상 클래스
<HeartIcon className="h-6 w-6 text-red-500" />
<HeartIcon className="h-6 w-6 text-blue-600" />
<HeartIcon className="h-6 w-6 text-gray-400" />

// 호버 효과
<HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
```

### 애니메이션

```tsx
import { ArrowPathIcon } from '@heroicons/react/24/outline';

// 로딩 스피너
<ArrowPathIcon className="h-5 w-5 animate-spin" />

// 펄스 효과
<BellIcon className="h-6 w-6 animate-pulse" />
```

---

## Tailwind CSS와 함께 사용

### Button with Icon

```tsx
<button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  <PlusIcon className="h-5 w-5" />
  새로 만들기
</button>

// 아이콘만 있는 버튼
<button className="p-2 rounded-lg hover:bg-gray-100">
  <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
</button>
```

### Input with Icon

```tsx
<div className="relative">
  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
  <input
    type="text"
    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
    placeholder="검색..."
  />
</div>
```

### Badge with Icon

```tsx
<span className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-green-100 text-green-700 rounded-full">
  <CheckCircleIcon className="h-4 w-4" />
  완료
</span>
```

### Navigation

```tsx
<nav className="flex flex-col gap-1">
  <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
    <HomeIcon className="h-5 w-5" />
    홈
  </a>
  <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
    <UserIcon className="h-5 w-5" />
    프로필
  </a>
  <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
    <Cog6ToothIcon className="h-5 w-5" />
    설정
  </a>
</nav>
```

---

## 스타일 선택 가이드

| 스타일 | 크기 | 용도 |
|--------|------|------|
| `24/outline` | 24px | 일반 UI, 네비게이션, 액션 버튼 |
| `24/solid` | 24px | 강조, 선택된 상태, 활성 탭 |
| `20/solid` | 20px | 작은 버튼, 폼 요소, 태그 |
| `16/solid` | 16px | 인라인 텍스트, 매우 작은 공간 |

### Outline vs Solid 사용 예시

```tsx
// 탭 네비게이션 - 선택되지 않음 (outline), 선택됨 (solid)
<button className="flex items-center gap-2">
  {isActive ? (
    <HomeIcon className="h-5 w-5" /> // from @heroicons/react/24/solid
  ) : (
    <HomeIcon className="h-5 w-5" /> // from @heroicons/react/24/outline
  )}
  홈
</button>
```

---

## 자주 사용하는 아이콘

### 네비게이션

| 아이콘 | Outline | Solid |
|--------|---------|-------|
| 홈 | `HomeIcon` | `HomeIcon` |
| 뒤로 | `ArrowLeftIcon` | - |
| 메뉴 | `Bars3Icon` | - |
| 닫기 | `XMarkIcon` | - |
| 설정 | `Cog6ToothIcon` | `Cog6ToothIcon` |

### 액션

| 아이콘 | Outline | Solid |
|--------|---------|-------|
| 추가 | `PlusIcon` | `PlusIcon` |
| 삭제 | `TrashIcon` | `TrashIcon` |
| 수정 | `PencilIcon` | `PencilIcon` |
| 검색 | `MagnifyingGlassIcon` | - |
| 공유 | `ShareIcon` | `ShareIcon` |

### 상태/피드백

| 아이콘 | Outline | Solid |
|--------|---------|-------|
| 성공 | `CheckCircleIcon` | `CheckCircleIcon` |
| 경고 | `ExclamationTriangleIcon` | `ExclamationTriangleIcon` |
| 정보 | `InformationCircleIcon` | `InformationCircleIcon` |
| 에러 | `XCircleIcon` | `XCircleIcon` |
| 로딩 | `ArrowPathIcon` | - |

### 사용자/소셜

| 아이콘 | Outline | Solid |
|--------|---------|-------|
| 사용자 | `UserIcon` | `UserIcon` |
| 그룹 | `UserGroupIcon` | `UserGroupIcon` |
| 알림 | `BellIcon` | `BellIcon` |
| 좋아요 | `HeartIcon` | `HeartIcon` |
| 채팅 | `ChatBubbleLeftIcon` | `ChatBubbleLeftIcon` |

---

## Vue에서 사용

```vue
<template>
  <button class="flex items-center gap-2">
    <BeakerIcon class="h-5 w-5" />
    버튼
  </button>
</template>

<script setup>
import { BeakerIcon } from '@heroicons/vue/24/solid'
</script>
```

---

## 참고 자료

- [Heroicons 공식 사이트](https://heroicons.com)
- [GitHub 저장소](https://github.com/tailwindlabs/heroicons)
- [Figma 플러그인](https://www.figma.com/community/plugin/1143115224073498594)
