# SVG 아이콘 라이브러리 가이드

앱 개발 시 자주 사용되는 SVG 기반 아이콘 라이브러리를 정리한 가이드입니다.

## 라이브러리 비교 요약

| 라이브러리 | 아이콘 수 | 스타일 | 프레임워크 지원 | 라이선스 | 특징 |
|-----------|---------|--------|---------------|---------|------|
| Lucide | 1,400+ | Outline | React, Vue, Svelte, etc. | ISC | Feather 후속, 활발한 개발 |
| Heroicons | 300+ | Outline/Solid | React, Vue | MIT | Tailwind CSS 팀 제작 |
| Phosphor | 7,000+ | 6가지 weight | React, Vue, etc. | MIT | 다양한 weight 제공 |
| Tabler Icons | 4,900+ | Outline | React, Vue, etc. | MIT | 대규모 아이콘셋 |
| Radix Icons | 300+ | Outline | React | MIT | Radix UI와 통합 |
| React Icons | 40,000+ | 다양함 | React | MIT | 여러 아이콘셋 통합 |

---

## 프로젝트별 추천

### Web (React/Next.js)

| 사용 사례 | 추천 라이브러리 | 이유 |
|----------|---------------|------|
| shadcn/ui 사용 | Lucide React | 공식 통합 |
| Tailwind CSS 사용 | Heroicons | Tailwind 팀 제작, 스타일 일관성 |
| Radix UI 사용 | Radix Icons | 네이티브 통합 |
| 다양한 아이콘 필요 | React Icons | 여러 아이콘셋 통합 |
| 일관된 디자인 | Phosphor | 6가지 weight로 통일성 |

### Mobile (React Native)

| 라이브러리 | 설치 | 특징 |
|-----------|------|------|
| react-native-vector-icons | `npm i react-native-vector-icons` | 가장 널리 사용됨 |
| phosphor-react-native | `npm i phosphor-react-native` | Phosphor 아이콘 |
| @expo/vector-icons | Expo 포함 | Expo 프로젝트용 |

### Mobile (Flutter)

| 라이브러리 | 사용법 | 특징 |
|-----------|--------|------|
| Material Icons | 기본 포함 | Google Material Design |
| Cupertino Icons | 기본 포함 | iOS 스타일 |
| flutter_svg | `flutter pub add flutter_svg` | 커스텀 SVG 지원 |
| phosphor_flutter | `flutter pub add phosphor_flutter` | Phosphor 아이콘 |

---

## 상세 가이드

각 라이브러리의 상세 사용법은 다음 문서를 참고하세요:

- [Lucide Icons](./lucide.md) - shadcn/ui, Feather 스타일
- [Heroicons](./heroicons.md) - Tailwind CSS 팀 제작
- [Phosphor Icons](./phosphor.md) - 6가지 weight, 다양한 프레임워크
- [React Native Vector Icons](./react-native-vector-icons.md) - RN 모바일 아이콘

---

## 선택 기준

### 1. 프레임워크와의 통합

- **shadcn/ui**: Lucide (기본 통합)
- **Tailwind CSS**: Heroicons (공식 연동)
- **Radix UI**: Radix Icons
- **Material UI**: Material Icons

### 2. 아이콘 스타일

- **Outline 스타일**: Lucide, Heroicons Outline, Tabler
- **Solid 스타일**: Heroicons Solid
- **다양한 Weight**: Phosphor (thin, light, regular, bold, fill, duotone)

### 3. 아이콘 수

- **최대한 많은 아이콘**: React Icons (40,000+)
- **큰 아이콘셋**: Tabler (4,900+), Phosphor (7,000+)
- **선별된 고품질**: Heroicons (300+), Radix Icons (300+)

### 4. 번들 사이즈

- **Tree-shakable**: Lucide, Heroicons, Phosphor
- **개별 import 권장**: React Icons

---

## 일반적인 설치 및 사용법

### React/Next.js

```bash
# Lucide (shadcn/ui 기본)
npm install lucide-react

# Heroicons
npm install @heroicons/react

# Phosphor
npm install @phosphor-icons/react

# React Icons (여러 아이콘셋 통합)
npm install react-icons
```

### Vue

```bash
npm install lucide-vue-next
npm install @heroicons/vue
npm install @phosphor-icons/vue
```

### Svelte

```bash
npm install lucide-svelte
npm install @phosphor-icons/svelte
```

---

## 커스텀 SVG 아이콘 사용

자체 SVG 아이콘을 프로젝트에 추가하는 방법:

### React

```tsx
// 1. SVG를 컴포넌트로 import
import { ReactComponent as CustomIcon } from './icons/custom.svg';

// 2. 또는 @svgr/webpack 사용
import CustomIcon from './icons/custom.svg';

// 3. inline SVG
const CustomIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="..." />
  </svg>
);
```

### React Native

```tsx
// react-native-svg-transformer 사용
import CustomIcon from './icons/custom.svg';

<CustomIcon width={24} height={24} fill="black" />
```

### Flutter

```dart
// flutter_svg 패키지 사용
import 'package:flutter_svg/flutter_svg.dart';

SvgPicture.asset(
  'assets/icons/custom.svg',
  width: 24,
  height: 24,
  colorFilter: ColorFilter.mode(Colors.black, BlendMode.srcIn),
)
```
