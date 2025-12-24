# Phosphor Icons

6가지 weight를 제공하는 유연하고 일관된 아이콘 패밀리입니다.

## 개요

- **아이콘 수**: 7,000+ (1,100+ 베이스 아이콘 x 6 weights)
- **스타일**: Thin, Light, Regular, Bold, Fill, Duotone
- **라이선스**: MIT
- **공식 사이트**: https://phosphoricons.com

### 특징

- 6가지 weight로 다양한 표현 가능
- Duotone 스타일 지원 (두 가지 색상)
- 모든 주요 프레임워크 지원
- Tree-shakable
- 일관된 24px 그리드

### 적합한 프로젝트

- 다양한 weight 표현이 필요한 UI
- Duotone 아이콘을 사용하고 싶은 경우
- 대규모 아이콘셋이 필요한 경우
- React, Vue, Svelte, React Native 등 다양한 환경

---

## 설치

### React

```bash
npm install @phosphor-icons/react
```

### Vue

```bash
npm install @phosphor-icons/vue
```

### Svelte

```bash
npm install phosphor-svelte
```

### React Native

```bash
npm install phosphor-react-native
npm install react-native-svg
```

### Flutter

```bash
flutter pub add phosphor_flutter
```

---

## 사용법

### 기본 사용 (React)

```tsx
import { Heart, HouseSimple, MagnifyingGlass } from '@phosphor-icons/react';

function App() {
  return (
    <div>
      <Heart />
      <HouseSimple />
      <MagnifyingGlass />
    </div>
  );
}
```

### Weight 변경

Phosphor의 핵심 기능은 6가지 weight입니다:

```tsx
import { Heart } from '@phosphor-icons/react';

// 6가지 weight
<Heart weight="thin" />      // 가장 얇음
<Heart weight="light" />     // 얇음
<Heart weight="regular" />   // 기본 (default)
<Heart weight="bold" />      // 굵음
<Heart weight="fill" />      // 채움
<Heart weight="duotone" />   // 두 가지 색상
```

### 크기 조절

```tsx
import { Heart } from '@phosphor-icons/react';

// size prop
<Heart size={16} />
<Heart size={24} />   // 기본값
<Heart size={32} />
<Heart size={48} />

// 또는 CSS
<Heart className="w-6 h-6" />
```

### 색상 변경

```tsx
import { Heart } from '@phosphor-icons/react';

// color prop
<Heart color="#e63946" />
<Heart color="currentColor" />   // 부모 색상 상속

// Tailwind
<Heart className="text-red-500" />
```

### Duotone 스타일

Duotone은 두 가지 색상 레이어를 가진 특별한 스타일입니다:

```tsx
import { Heart } from '@phosphor-icons/react';

// 기본 duotone (primary color + 20% opacity)
<Heart weight="duotone" color="#3b82f6" />

// 커스텀 duotone 색상
<Heart
  weight="duotone"
  color="#3b82f6"
  duotoneColor="#93c5fd"
  duotoneOpacity={0.3}
/>
```

### Mirrored (좌우 반전)

```tsx
import { ArrowRight } from '@phosphor-icons/react';

<ArrowRight mirrored />  // 좌우 반전
```

---

## Weight 선택 가이드

| Weight | 용도 | 예시 |
|--------|------|------|
| `thin` | 섬세한 UI, 배경 패턴 | 장식용 아이콘 |
| `light` | 가벼운 느낌, 보조 아이콘 | 비활성 상태 |
| `regular` | 일반적인 사용 | 기본 UI 요소 |
| `bold` | 강조, 중요한 요소 | CTA 버튼 |
| `fill` | 선택된 상태, 활성화 | 활성 탭, 좋아요 |
| `duotone` | 시각적 풍부함 | 특징 아이콘, 히어로 섹션 |

### Weight 전환 예시

```tsx
// 좋아요 버튼 - 선택 상태에 따라 weight 변경
<Heart
  weight={isLiked ? "fill" : "regular"}
  color={isLiked ? "#e63946" : "#6b7280"}
/>

// 네비게이션 - 활성 상태
<HouseSimple weight={isActive ? "fill" : "regular"} />
```

---

## 컴포넌트 예시

### Icon Button

```tsx
import { DotsThree, Heart, Share } from '@phosphor-icons/react';

function IconButton({ icon: Icon, ...props }) {
  return (
    <button
      className="p-2 rounded-full hover:bg-gray-100"
      {...props}
    >
      <Icon size={20} weight="regular" />
    </button>
  );
}

// 사용
<IconButton icon={Heart} onClick={handleLike} />
<IconButton icon={Share} onClick={handleShare} />
<IconButton icon={DotsThree} onClick={handleMore} />
```

### 상태별 아이콘

```tsx
import { CheckCircle, XCircle, Warning, Info } from '@phosphor-icons/react';

const statusIcons = {
  success: { icon: CheckCircle, color: '#10b981' },
  error: { icon: XCircle, color: '#ef4444' },
  warning: { icon: Warning, color: '#f59e0b' },
  info: { icon: Info, color: '#3b82f6' },
};

function StatusBadge({ status, message }) {
  const { icon: Icon, color } = statusIcons[status];

  return (
    <div className="flex items-center gap-2">
      <Icon size={20} weight="fill" color={color} />
      <span>{message}</span>
    </div>
  );
}
```

### Feature Card with Duotone

```tsx
import { Rocket, Shield, Lightning } from '@phosphor-icons/react';

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="p-6 border rounded-xl">
      <Icon
        size={48}
        weight="duotone"
        className="text-blue-500 mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
```

---

## React Native에서 사용

```tsx
import { Heart, House } from 'phosphor-react-native';

function App() {
  return (
    <View>
      <Heart size={32} color="#e63946" weight="fill" />
      <House size={32} color="#000" weight="regular" />
    </View>
  );
}
```

---

## Flutter에서 사용

```dart
import 'package:phosphor_flutter/phosphor_flutter.dart';

// Regular weight
Icon(PhosphorIconsRegular.heart, size: 24)

// Bold weight
Icon(PhosphorIconsBold.heart, size: 24)

// Fill weight
Icon(PhosphorIconsFill.heart, size: 24, color: Colors.red)

// Duotone weight
Icon(PhosphorIconsDuotone.heart, size: 24)
```

---

## 자주 사용하는 아이콘

### 네비게이션

| 이름 | Regular | Fill | 용도 |
|------|---------|------|------|
| `House` | ○ | ● | 홈 |
| `MagnifyingGlass` | ○ | ● | 검색 |
| `GearSix` | ○ | ● | 설정 |
| `CaretLeft` | ○ | ● | 뒤로 |
| `List` | ○ | ● | 메뉴 |

### 액션

| 이름 | Regular | Fill | 용도 |
|------|---------|------|------|
| `Plus` | ○ | ● | 추가 |
| `Trash` | ○ | ● | 삭제 |
| `PencilSimple` | ○ | ● | 수정 |
| `DownloadSimple` | ○ | ● | 다운로드 |
| `ShareNetwork` | ○ | ● | 공유 |

### 상태

| 이름 | Regular | Fill | 용도 |
|------|---------|------|------|
| `CheckCircle` | ○ | ● | 성공 |
| `WarningCircle` | ○ | ● | 경고 |
| `Info` | ○ | ● | 정보 |
| `XCircle` | ○ | ● | 에러 |
| `SpinnerGap` | ○ | - | 로딩 |

### 소셜/유저

| 이름 | Regular | Fill | 용도 |
|------|---------|------|------|
| `Heart` | ○ | ● | 좋아요 |
| `ChatCircle` | ○ | ● | 댓글 |
| `User` | ○ | ● | 사용자 |
| `Bell` | ○ | ● | 알림 |
| `BookmarkSimple` | ○ | ● | 북마크 |

---

## 참고 자료

- [Phosphor 공식 사이트](https://phosphoricons.com)
- [GitHub 저장소](https://github.com/phosphor-icons/homepage)
- [React 패키지](https://github.com/phosphor-icons/react)
- [Figma 플러그인](https://www.figma.com/community/plugin/898620911119764089)
