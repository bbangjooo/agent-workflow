# Flutter Material Design 가이드

Flutter에서 Material Design 3 (Material You)를 구현하는 가이드입니다.

## 개요

- **문서**: https://docs.flutter.dev/ui/design/material
- **Material 3**: https://m3.material.io/
- **디자인 철학**: Material Design 3 (Dynamic Color, 더 둥근 모서리, 새로운 색상 시스템)

## 프로젝트 설정

### pubspec.yaml

```yaml
dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.1.0
  flutter_svg: ^2.0.9
```

## 테마 설정

### Material 3 테마

```dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Color Scheme
  static const Color primaryColor = Color(0xFF6750A4);
  static const Color secondaryColor = Color(0xFF625B71);
  static const Color tertiaryColor = Color(0xFF7D5260);
  static const Color errorColor = Color(0xFFB3261E);

  static ColorScheme get lightColorScheme => ColorScheme.fromSeed(
    seedColor: primaryColor,
    brightness: Brightness.light,
  );

  static ColorScheme get darkColorScheme => ColorScheme.fromSeed(
    seedColor: primaryColor,
    brightness: Brightness.dark,
  );

  static ThemeData get lightTheme => ThemeData(
    useMaterial3: true,
    colorScheme: lightColorScheme,
    textTheme: GoogleFonts.pretendardTextTheme(),
    appBarTheme: AppBarTheme(
      centerTitle: true,
      elevation: 0,
      backgroundColor: lightColorScheme.surface,
      foregroundColor: lightColorScheme.onSurface,
    ),
    cardTheme: CardTheme(
      elevation: 1,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    ),
  );

  static ThemeData get darkTheme => ThemeData(
    useMaterial3: true,
    colorScheme: darkColorScheme,
    textTheme: GoogleFonts.pretendardTextTheme(ThemeData.dark().textTheme),
    // ... 다크 테마 설정
  );
}
```

### 앱에 테마 적용

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      home: const HomePage(),
    );
  }
}
```

## 핵심 위젯

### 1. Button

```dart
// Filled Button (Primary)
FilledButton(
  onPressed: () {},
  child: const Text('Filled Button'),
)

// Filled Tonal Button
FilledButton.tonal(
  onPressed: () {},
  child: const Text('Tonal Button'),
)

// Outlined Button
OutlinedButton(
  onPressed: () {},
  child: const Text('Outlined Button'),
)

// Text Button
TextButton(
  onPressed: () {},
  child: const Text('Text Button'),
)

// Elevated Button
ElevatedButton(
  onPressed: () {},
  child: const Text('Elevated Button'),
)

// 아이콘 버튼
FilledButton.icon(
  onPressed: () {},
  icon: const Icon(Icons.add),
  label: const Text('Add Item'),
)

// 로딩 상태
FilledButton(
  onPressed: isLoading ? null : () {},
  child: isLoading
    ? const SizedBox(
        width: 20,
        height: 20,
        child: CircularProgressIndicator(strokeWidth: 2),
      )
    : const Text('Submit'),
)
```

### 2. FloatingActionButton

```dart
// 기본 FAB
FloatingActionButton(
  onPressed: () {},
  child: const Icon(Icons.add),
)

// 작은 FAB
FloatingActionButton.small(
  onPressed: () {},
  child: const Icon(Icons.add),
)

// 큰 FAB
FloatingActionButton.large(
  onPressed: () {},
  child: const Icon(Icons.add),
)

// 확장 FAB
FloatingActionButton.extended(
  onPressed: () {},
  icon: const Icon(Icons.add),
  label: const Text('Create'),
)
```

### 3. TextField

```dart
// 기본 TextField
TextField(
  decoration: const InputDecoration(
    labelText: 'Email',
    hintText: 'Enter your email',
    prefixIcon: Icon(Icons.email),
  ),
)

// Outlined TextField
TextField(
  decoration: InputDecoration(
    labelText: 'Password',
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
    ),
    suffixIcon: IconButton(
      icon: Icon(obscureText ? Icons.visibility : Icons.visibility_off),
      onPressed: () => setState(() => obscureText = !obscureText),
    ),
  ),
  obscureText: obscureText,
)

// 에러 상태
TextField(
  decoration: InputDecoration(
    labelText: 'Email',
    errorText: hasError ? 'Invalid email address' : null,
  ),
)

// TextFormField (폼 검증)
TextFormField(
  decoration: const InputDecoration(labelText: 'Name'),
  validator: (value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your name';
    }
    return null;
  },
)
```

### 4. Card

```dart
// 기본 Card
Card(
  child: Padding(
    padding: const EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Card Title', style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 8),
        Text('Card content goes here.'),
      ],
    ),
  ),
)

// 이미지 Card
Card(
  clipBehavior: Clip.antiAlias,
  child: Column(
    children: [
      Image.network(
        'https://...',
        height: 180,
        width: double.infinity,
        fit: BoxFit.cover,
      ),
      Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Title', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 4),
            Text('Subtitle', style: Theme.of(context).textTheme.bodyMedium),
          ],
        ),
      ),
      ButtonBar(
        children: [
          TextButton(onPressed: () {}, child: const Text('Action 1')),
          TextButton(onPressed: () {}, child: const Text('Action 2')),
        ],
      ),
    ],
  ),
)

// Card Variants (Material 3)
Card(
  elevation: 0,  // Filled
  color: Theme.of(context).colorScheme.surfaceContainerHighest,
  child: ...
)

Card(
  elevation: 0,  // Outlined
  shape: RoundedRectangleBorder(
    side: BorderSide(color: Theme.of(context).colorScheme.outline),
    borderRadius: BorderRadius.circular(12),
  ),
  child: ...
)

Card(
  elevation: 1,  // Elevated
  child: ...
)
```

### 5. AppBar

```dart
// 기본 AppBar
Scaffold(
  appBar: AppBar(
    title: const Text('Page Title'),
    actions: [
      IconButton(icon: const Icon(Icons.search), onPressed: () {}),
      IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),
    ],
  ),
  body: ...
)

// Leading 아이콘
AppBar(
  leading: IconButton(
    icon: const Icon(Icons.arrow_back),
    onPressed: () => Navigator.pop(context),
  ),
  title: const Text('Details'),
)

// Large AppBar (스크롤 시 축소)
Scaffold(
  body: CustomScrollView(
    slivers: [
      SliverAppBar.large(
        title: const Text('Large Title'),
        actions: [...],
      ),
      SliverList(...),
    ],
  ),
)

// Medium AppBar
SliverAppBar.medium(
  title: const Text('Medium Title'),
)
```

### 6. NavigationBar (BottomNavigation)

```dart
int _selectedIndex = 0;

Scaffold(
  body: _pages[_selectedIndex],
  bottomNavigationBar: NavigationBar(
    selectedIndex: _selectedIndex,
    onDestinationSelected: (index) {
      setState(() => _selectedIndex = index);
    },
    destinations: const [
      NavigationDestination(
        icon: Icon(Icons.home_outlined),
        selectedIcon: Icon(Icons.home),
        label: 'Home',
      ),
      NavigationDestination(
        icon: Icon(Icons.search),
        label: 'Search',
      ),
      NavigationDestination(
        icon: Icon(Icons.notifications_outlined),
        selectedIcon: Icon(Icons.notifications),
        label: 'Notifications',
      ),
      NavigationDestination(
        icon: Icon(Icons.person_outline),
        selectedIcon: Icon(Icons.person),
        label: 'Profile',
      ),
    ],
  ),
)
```

### 7. NavigationRail (Tablet/Desktop)

```dart
NavigationRail(
  selectedIndex: _selectedIndex,
  onDestinationSelected: (index) {
    setState(() => _selectedIndex = index);
  },
  labelType: NavigationRailLabelType.all,
  destinations: const [
    NavigationRailDestination(
      icon: Icon(Icons.home_outlined),
      selectedIcon: Icon(Icons.home),
      label: Text('Home'),
    ),
    // ...
  ],
)
```

### 8. Dialog

```dart
// AlertDialog
showDialog(
  context: context,
  builder: (context) => AlertDialog(
    title: const Text('Confirm'),
    content: const Text('Are you sure you want to continue?'),
    actions: [
      TextButton(
        onPressed: () => Navigator.pop(context),
        child: const Text('Cancel'),
      ),
      FilledButton(
        onPressed: () {
          // Action
          Navigator.pop(context);
        },
        child: const Text('Confirm'),
      ),
    ],
  ),
);

// Full-screen Dialog
showDialog(
  context: context,
  builder: (context) => Dialog.fullscreen(
    child: Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Full Screen Dialog'),
        actions: [
          TextButton(onPressed: () {}, child: const Text('Save')),
        ],
      ),
      body: ...
    ),
  ),
);
```

### 9. BottomSheet

```dart
// Modal Bottom Sheet
showModalBottomSheet(
  context: context,
  builder: (context) => Container(
    padding: const EdgeInsets.all(16),
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ListTile(
          leading: const Icon(Icons.edit),
          title: const Text('Edit'),
          onTap: () {},
        ),
        ListTile(
          leading: const Icon(Icons.share),
          title: const Text('Share'),
          onTap: () {},
        ),
        ListTile(
          leading: const Icon(Icons.delete, color: Colors.red),
          title: const Text('Delete', style: TextStyle(color: Colors.red)),
          onTap: () {},
        ),
      ],
    ),
  ),
);

// Draggable Bottom Sheet
showModalBottomSheet(
  context: context,
  isScrollControlled: true,
  builder: (context) => DraggableScrollableSheet(
    initialChildSize: 0.5,
    minChildSize: 0.25,
    maxChildSize: 0.9,
    expand: false,
    builder: (context, scrollController) => ListView(
      controller: scrollController,
      children: [...],
    ),
  ),
);
```

### 10. SnackBar

```dart
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: const Text('Item deleted'),
    action: SnackBarAction(
      label: 'Undo',
      onPressed: () {
        // Undo action
      },
    ),
    behavior: SnackBarBehavior.floating,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
  ),
);
```

### 11. Chip

```dart
// Input Chip
InputChip(
  label: const Text('Tag'),
  onDeleted: () {},
  avatar: const CircleAvatar(child: Text('T')),
)

// Filter Chip
FilterChip(
  label: const Text('Filter'),
  selected: isSelected,
  onSelected: (selected) {
    setState(() => isSelected = selected);
  },
)

// Choice Chip
ChoiceChip(
  label: const Text('Choice'),
  selected: isSelected,
  onSelected: (selected) {
    setState(() => isSelected = selected);
  },
)

// Action Chip
ActionChip(
  label: const Text('Action'),
  avatar: const Icon(Icons.add),
  onPressed: () {},
)
```

### 12. Switch & Checkbox

```dart
// Switch
Switch(
  value: isEnabled,
  onChanged: (value) {
    setState(() => isEnabled = value);
  },
)

// SwitchListTile
SwitchListTile(
  title: const Text('Enable notifications'),
  subtitle: const Text('Receive push notifications'),
  value: isEnabled,
  onChanged: (value) {
    setState(() => isEnabled = value);
  },
)

// Checkbox
Checkbox(
  value: isChecked,
  onChanged: (value) {
    setState(() => isChecked = value!);
  },
)

// CheckboxListTile
CheckboxListTile(
  title: const Text('Option'),
  value: isChecked,
  onChanged: (value) {
    setState(() => isChecked = value!);
  },
)
```

### 13. ListTile

```dart
ListTile(
  leading: const CircleAvatar(child: Icon(Icons.person)),
  title: const Text('John Doe'),
  subtitle: const Text('johndoe@email.com'),
  trailing: const Icon(Icons.chevron_right),
  onTap: () {},
)

// 3-line ListTile
ListTile(
  isThreeLine: true,
  leading: const CircleAvatar(backgroundImage: NetworkImage('...')),
  title: const Text('Title'),
  subtitle: const Text('This is a longer description that spans multiple lines.'),
  trailing: IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),
)
```

### 14. CircularProgressIndicator

```dart
// 무한 로딩
const CircularProgressIndicator()

// 진행률 표시
CircularProgressIndicator(value: progress)

// LinearProgressIndicator
const LinearProgressIndicator()
LinearProgressIndicator(value: progress)
```

## Typography

```dart
Text('Display Large', style: Theme.of(context).textTheme.displayLarge)
Text('Display Medium', style: Theme.of(context).textTheme.displayMedium)
Text('Display Small', style: Theme.of(context).textTheme.displaySmall)

Text('Headline Large', style: Theme.of(context).textTheme.headlineLarge)
Text('Headline Medium', style: Theme.of(context).textTheme.headlineMedium)
Text('Headline Small', style: Theme.of(context).textTheme.headlineSmall)

Text('Title Large', style: Theme.of(context).textTheme.titleLarge)
Text('Title Medium', style: Theme.of(context).textTheme.titleMedium)
Text('Title Small', style: Theme.of(context).textTheme.titleSmall)

Text('Body Large', style: Theme.of(context).textTheme.bodyLarge)
Text('Body Medium', style: Theme.of(context).textTheme.bodyMedium)
Text('Body Small', style: Theme.of(context).textTheme.bodySmall)

Text('Label Large', style: Theme.of(context).textTheme.labelLarge)
Text('Label Medium', style: Theme.of(context).textTheme.labelMedium)
Text('Label Small', style: Theme.of(context).textTheme.labelSmall)
```

## 간격 시스템

```dart
class AppSpacing {
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 16;
  static const double lg = 24;
  static const double xl = 32;
  static const double xxl = 48;
}

// 사용
Padding(
  padding: const EdgeInsets.all(AppSpacing.md),
  child: ...
)

SizedBox(height: AppSpacing.sm)
```

## 반응형 레이아웃

```dart
class ResponsiveLayout extends StatelessWidget {
  final Widget mobile;
  final Widget? tablet;
  final Widget? desktop;

  const ResponsiveLayout({
    super.key,
    required this.mobile,
    this.tablet,
    this.desktop,
  });

  static bool isMobile(BuildContext context) =>
      MediaQuery.of(context).size.width < 600;

  static bool isTablet(BuildContext context) =>
      MediaQuery.of(context).size.width >= 600 &&
      MediaQuery.of(context).size.width < 1200;

  static bool isDesktop(BuildContext context) =>
      MediaQuery.of(context).size.width >= 1200;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth >= 1200) {
          return desktop ?? tablet ?? mobile;
        } else if (constraints.maxWidth >= 600) {
          return tablet ?? mobile;
        }
        return mobile;
      },
    );
  }
}
```

## Safe Area

```dart
SafeArea(
  child: Scaffold(
    body: ...
  ),
)

// 특정 영역만
SafeArea(
  top: true,
  bottom: false,
  child: ...
)
```

## 프로젝트 구조 예시

```
lib/
├── core/
│   ├── theme/
│   │   ├── app_theme.dart
│   │   ├── app_colors.dart
│   │   └── app_typography.dart
│   └── constants/
│       └── app_spacing.dart
├── features/
│   ├── home/
│   │   ├── presentation/
│   │   │   ├── pages/
│   │   │   └── widgets/
│   │   └── domain/
│   └── ...
├── shared/
│   └── widgets/
│       ├── app_button.dart
│       ├── app_card.dart
│       └── ...
└── main.dart
```

## 참고 자료

- [Flutter 공식 문서](https://docs.flutter.dev/)
- [Material 3 디자인 가이드](https://m3.material.io/)
- [Flutter Widget Catalog](https://docs.flutter.dev/ui/widgets)
- [Material Icons](https://fonts.google.com/icons)
