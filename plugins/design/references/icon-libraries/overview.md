# SVG 아이콘 라이브러리 가이드

앱 개발 시 자주 사용되는 SVG 기반 아이콘 라이브러리를 정리한 가이드입니다.

## 핵심 원칙

> **이모지 사용 금지.** UI에서 시각적 요소가 필요할 때는 반드시 아이콘 라이브러리의 SVG 아이콘을 사용한다.
> 이모지는 플랫폼별 렌더링이 다르고, 디자인 시스템과 일관성을 유지할 수 없다.

## 라이브러리 비교 요약

| 라이브러리 | 아이콘 수 | 스타일 | 프레임워크 지원 | 라이선스 | 특징 |
|-----------|---------|--------|---------------|---------|------|
| Lucide | 1,500+ | Outline | React, Vue, Svelte, Flutter, etc. | ISC | shadcn/ui 기본, Feather 후속 |
| Heroicons | 888 (변형 포함) | Outline/Solid/Mini/Micro | React, Vue | MIT | Tailwind CSS 팀 제작 |
| Phosphor | 6,000+ | 6가지 weight | React, Vue, Flutter, etc. | MIT | 다양한 weight 제공 |
| Tabler Icons | 6,000+ | Outline/Filled | React, Vue, etc. | MIT | 대규모, 활발한 업데이트 |
| Iconoir | 1,600+ | Outline | React, React Native, Vue, Flutter | MIT | 모던, Framer 통합 |
| Hugeicons | 4,600+ (free) / 51,000+ (pro) | 10가지 스타일 | React, Vue, Svelte, Flutter | Free+Pro | 최대 규모, Figma 연동 |
| React Icons | 40,000+ | 다양함 | React | MIT | 여러 아이콘셋 통합 |
| Radix Icons | 300+ | Outline | React | MIT | Radix UI와 통합 (유지보수 불확실) |

---

## 프로젝트별 추천

### Web (React/Next.js)

| 사용 사례 | 추천 라이브러리 | 이유 |
|----------|---------------|------|
| shadcn/ui 사용 | Lucide React | 공식 통합 |
| Tailwind CSS 사용 | Heroicons | Tailwind 팀 제작, 스타일 일관성 |
| 대규모 아이콘 필요 | Tabler Icons, Hugeicons | 6,000+ 아이콘, 다양한 카테고리 |
| 다양한 아이콘 필요 | React Icons | 여러 아이콘셋 통합 |
| 일관된 디자인 | Phosphor | 6가지 weight로 통일성 |
| 모던/미니멀 | Iconoir | 깔끔한 스타일, Framer 통합 |

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
- [Iconoir](./iconoir.md) - 모던 오픈소스, Framer 통합
- [Hugeicons](./hugeicons.md) - 최대 규모, 10가지 스타일
- [Tabler Icons](./tabler.md) - 6,000+ 아이콘, Outline/Filled
- [React Native Vector Icons](./react-native-vector-icons.md) - RN 모바일 아이콘

---

## 선택 기준

### 1. 프레임워크와의 통합

- **shadcn/ui**: Lucide (기본 통합)
- **Tailwind CSS**: Heroicons (공식 연동)
- **Radix UI**: Lucide 또는 Radix Icons
- **Material UI**: Material Icons
- **Framer**: Iconoir (네이티브 통합)

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
