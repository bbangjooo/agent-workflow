# Hugeicons

최대 규모의 아이콘 라이브러리로, 10가지 스타일과 Figma 연동을 제공합니다.

## 개요

- **아이콘 수**: 4,600+ (무료) / 51,000+ (Pro)
- **스타일**: Rounded (Stroke, Two-Tone, Solid, Bulk, Duotone), Sharp (Stroke, Solid), Standard (Stroke, Solid) 총 10가지
- **라이선스**: 무료 (오픈소스) + Pro (유료)
- **공식 사이트**: https://hugeicons.com

### 특징

- 51,000+ 아이콘으로 업계 최대 규모
- 10가지 스타일 변형으로 디자인 시스템 유연성
- 59개 카테고리로 체계적 분류
- Figma 플러그인 제공 (디자인 시스템 파일 포함)
- Tree-shakable, TypeScript 지원
- React, Vue, Svelte, Flutter, WordPress, Webflow 지원

### 적합한 프로젝트

- 대규모 프로젝트 (다양한 아이콘 필요)
- 디자인 시스템 구축 (Figma-first 워크플로우)
- 여러 스타일 변형이 필요한 브랜딩
- Pro 라이선스로 상업 프로젝트

---

## 설치

### React / Next.js

```bash
npm install hugeicons-react
```

### Vue

```bash
npm install hugeicons-vue
```

---

## 사용법

### 기본 사용

```tsx
import { Home01Icon, SearchIcon, SettingsIcon } from 'hugeicons-react';

function App() {
  return (
    <nav>
      <Home01Icon size={24} />
      <SearchIcon size={24} />
      <SettingsIcon size={24} />
    </nav>
  );
}
```

### 스타일 변형

```tsx
import { Home01Icon } from 'hugeicons-react';

// Stroke (기본)
<Home01Icon size={24} variant="stroke" />

// Solid
<Home01Icon size={24} variant="solid" />

// Two-Tone
<Home01Icon size={24} variant="twotone" />

// Duotone
<Home01Icon size={24} variant="duotone" />

// Bulk
<Home01Icon size={24} variant="bulk" />
```

### 색상 및 크기

```tsx
<Home01Icon size={32} color="#3b82f6" />

// Tailwind CSS
<Home01Icon className="w-6 h-6 text-blue-500" />
```

---

## Free vs Pro 비교

| 항목 | Free | Pro |
|------|------|-----|
| 아이콘 수 | 4,600+ | 51,000+ |
| 스타일 | 일부 | 10가지 전체 |
| Figma 파일 | X | O (디자인 시스템) |
| 상업적 사용 | O | O |
| 업데이트 | 커뮤니티 | 우선 접근 |

---

## 참고 자료

- [Hugeicons 공식 사이트](https://hugeicons.com)
- [GitHub 저장소](https://github.com/hugeicons/hugeicons-react)
- [Figma 플러그인](https://www.figma.com/community/plugin/hugeicons)
