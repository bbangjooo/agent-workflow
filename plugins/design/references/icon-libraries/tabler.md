# Tabler Icons

6,000개 이상의 아이콘을 제공하는 대규모 오픈소스 아이콘 라이브러리입니다.

## 개요

- **아이콘 수**: 6,000+
- **스타일**: Outline, Filled
- **라이선스**: MIT
- **공식 사이트**: https://tabler.io/icons

### 특징

- 6,000+ 아이콘으로 오픈소스 중 최대 규모급
- Outline + Filled 두 가지 변형
- 활발한 업데이트 (AI, 인프라, 개발자 도구 카테고리 지속 추가)
- 깔끔하고 미니멀한 디자인
- Tree-shakable, TypeScript 지원
- React, Vue, Svelte, Preact, Angular 지원

### 적합한 프로젝트

- 대규모 프로젝트 (다양한 카테고리 필요)
- 개발자 도구 / 대시보드 UI
- 무료 오픈소스로 대규모 아이콘셋 필요 시
- Outline/Filled 토글이 필요한 UI

---

## 설치

### React / Next.js

```bash
npm install @tabler/icons-react
```

### Vue

```bash
npm install @tabler/icons-vue
```

### Svelte

```bash
npm install @tabler/icons-svelte
```

---

## 사용법

### 기본 사용

```tsx
import { IconHome, IconSearch, IconSettings } from '@tabler/icons-react';

function App() {
  return (
    <nav>
      <IconHome size={24} />
      <IconSearch size={24} />
      <IconSettings size={24} />
    </nav>
  );
}
```

### Filled 변형

```tsx
import { IconHomeFilled, IconHeartFilled } from '@tabler/icons-react';

<IconHomeFilled size={24} />
<IconHeartFilled size={24} color="red" />
```

### 크기 및 스트로크

```tsx
import { IconHome } from '@tabler/icons-react';

<IconHome size={16} stroke={1.5} />   // 작게, 얇게
<IconHome size={24} stroke={2} />     // 기본
<IconHome size={32} stroke={2.5} />   // 크게, 두껍게
```

### 색상 (Tailwind)

```tsx
<IconHome className="w-6 h-6 text-blue-500" />
<IconHome className="w-5 h-5 text-muted-foreground" />
```

---

## 자주 사용하는 아이콘

| 용도 | Outline | Filled |
|------|---------|--------|
| 홈 | `IconHome` | `IconHomeFilled` |
| 검색 | `IconSearch` | - |
| 설정 | `IconSettings` | `IconSettingsFilled` |
| 사용자 | `IconUser` | `IconUserFilled` |
| 하트 | `IconHeart` | `IconHeartFilled` |
| 추가 | `IconPlus` | - |
| 삭제 | `IconTrash` | `IconTrashFilled` |
| 알림 | `IconBell` | `IconBellFilled` |

---

## 참고 자료

- [Tabler Icons 공식 사이트](https://tabler.io/icons)
- [GitHub 저장소](https://github.com/tabler/tabler-icons)
- [아이콘 검색](https://tabler.io/icons)
