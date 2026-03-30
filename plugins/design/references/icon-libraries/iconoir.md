# Iconoir

모던하고 깔끔한 오픈소스 SVG 아이콘 라이브러리입니다.

## 개요

- **아이콘 수**: 1,600+
- **스타일**: Outline (24x24 grid, 1.5px stroke)
- **라이선스**: MIT
- **공식 사이트**: https://iconoir.com

### 특징

- 모던하고 일관된 미니멀 디자인
- Framer에 네이티브 통합 (Insert > Graphics > Iconoir)
- React, React Native, Vue, Flutter, Svelte 지원
- Tree-shakable, TypeScript 지원
- 활발한 커뮤니티 개발 (2025-2026 빠른 성장)

### 적합한 프로젝트

- 미니멀/모던 UI 프로젝트
- Framer 기반 프로토타이핑
- React Native 크로스플랫폼 앱
- Lucide/Heroicons 대안을 찾을 때

---

## 설치

### React / Next.js

```bash
npm install iconoir-react
```

### React Native

```bash
npm install iconoir-react-native
```

### Vue

```bash
npm install @iconoir/vue
```

### Flutter

```bash
flutter pub add iconoir_flutter
```

---

## 사용법

### 기본 사용

```tsx
import { Home, Search, Settings, User } from 'iconoir-react';

function App() {
  return (
    <nav>
      <Home width={24} height={24} />
      <Search width={24} height={24} />
      <Settings width={24} height={24} />
      <User width={24} height={24} />
    </nav>
  );
}
```

### 크기 및 색상 조절

```tsx
import { Heart } from 'iconoir-react';

// props로 조절
<Heart width={16} height={16} color="#ef4444" strokeWidth={2} />

// Tailwind CSS 클래스
<Heart className="w-5 h-5 text-red-500" />
```

### React Native

```tsx
import { Home, Bell } from 'iconoir-react-native';

<Home width={24} height={24} color="black" />
<Bell width={24} height={24} color="gray" />
```

---

## 자주 사용하는 아이콘

| 용도 | 아이콘 이름 |
|------|-----------|
| 홈 | `Home` |
| 검색 | `Search` |
| 설정 | `Settings` |
| 사용자 | `User` |
| 알림 | `Bell` |
| 추가 | `Plus` |
| 삭제 | `Trash` |
| 닫기 | `Xmark` |
| 체크 | `Check` |
| 화살표 | `ArrowLeft`, `ArrowRight` |

---

## 참고 자료

- [Iconoir 공식 사이트](https://iconoir.com/)
- [GitHub 저장소](https://github.com/iconoir-icons/iconoir)
- [Framer 통합 가이드](https://iconoir.com/docs/introduction)
