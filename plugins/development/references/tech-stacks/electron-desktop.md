# Electron Desktop App Stack Guide

데스크탑 애플리케이션을 웹 기술로 만들고 싶을 때 사용하는 조합입니다.

## 왜 이 조합인가?

| 장점 | 설명 |
|------|------|
| 웹 기술 재활용 | HTML/CSS/JS 그대로 사용 |
| 크로스 플랫폼 | Windows, macOS, Linux 동시 지원 |
| 생태계 최대 | npm 패키지 전부 사용 가능 |
| 검증된 사례 | VS Code, Slack, Discord, Figma 등 |

| 단점 | 설명 |
|------|------|
| 번들 크기 | 최소 ~150MB (Chromium 포함) |
| 메모리 사용량 | 기본 200MB+ |
| 네이티브 성능 부족 | 고성능 그래픽/연산에 부적합 |
| 보안 주의 | Node.js 접근 관리 필요 |

## 추천 기술 스택

```
App Shell:
├── Electron 33+
├── electron-vite (빌드 도구, Vite 기반)
├── TypeScript
└── Electron Forge 또는 electron-builder (패키징)

Frontend (Renderer):
├── React 19 + TypeScript
├── Tailwind CSS
├── React Router (멀티 윈도우 시)
└── Zustand 또는 Jotai (상태 관리)

Backend (Main Process):
├── IPC 통신 (contextBridge + preload)
├── electron-store (로컬 설정 저장)
├── better-sqlite3 (로컬 DB, 선택)
└── electron-updater (자동 업데이트)

Infrastructure:
├── GitHub Releases (배포)
├── electron-updater (자동 업데이트)
└── Sentry (에러 트래킹)
```

## 프로젝트 구조

```
my-desktop-app/
├── electron.vite.config.ts    # electron-vite 설정
├── package.json
├── resources/                 # 앱 아이콘, 에셋
│   └── icon.png
├── src/
│   ├── main/                  # Main Process (Node.js)
│   │   └── index.ts
│   ├── preload/               # Preload Scripts (브릿지)
│   │   └── index.ts
│   └── renderer/              # Renderer Process (React)
│       ├── src/
│       │   ├── App.tsx
│       │   ├── components/
│       │   ├── hooks/
│       │   └── lib/
│       └── index.html
└── build/                     # 빌드 설정
    ├── entitlements.mac.plist
    └── notarize.js
```

## 시작하기

### electron-vite로 프로젝트 생성

```bash
npm create @quick-start/electron@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

### 수동 설정 (Electron Forge)

```bash
npm init electron-app@latest my-app -- --template=vite-typescript
cd my-app
npm install react react-dom
npm install -D @types/react @types/react-dom tailwindcss
```

## 핵심 패턴: IPC 통신 (보안 필수)

### Preload Script (브릿지 역할)

```typescript
// src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  // Renderer → Main
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  readFile: (path: string) => ipcRenderer.invoke('read-file', path),
  saveFile: (path: string, data: string) => ipcRenderer.invoke('save-file', path, data),

  // Main → Renderer (이벤트 구독)
  onUpdateAvailable: (callback: () => void) =>
    ipcRenderer.on('update-available', callback),
})
```

### Main Process (핸들러)

```typescript
// src/main/index.ts
import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import fs from 'fs/promises'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,           // 보안: 샌드박스 활성화
      nodeIntegration: false,  // 보안: Node 비활성화
      contextIsolation: true,  // 보안: 컨텍스트 격리
    },
  })

  // 개발 환경: Vite dev server
  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// IPC 핸들러 등록
ipcMain.handle('get-app-version', () => app.getVersion())
ipcMain.handle('read-file', async (_, path: string) => {
  return fs.readFile(path, 'utf-8')
})
ipcMain.handle('save-file', async (_, path: string, data: string) => {
  return fs.writeFile(path, data, 'utf-8')
})

app.whenReady().then(createWindow)
```

### Renderer (React에서 사용)

```typescript
// src/renderer/src/App.tsx
function App() {
  const [version, setVersion] = useState('')

  useEffect(() => {
    window.api.getAppVersion().then(setVersion)
  }, [])

  return <div>App Version: {version}</div>
}
```

```typescript
// src/renderer/src/types/global.d.ts
declare global {
  interface Window {
    api: {
      getAppVersion: () => Promise<string>
      readFile: (path: string) => Promise<string>
      saveFile: (path: string, data: string) => Promise<void>
      onUpdateAvailable: (callback: () => void) => void
    }
  }
}
```

## 로컬 데이터 저장

### electron-store (간단한 설정)

```bash
npm install electron-store
```

```typescript
// src/main/store.ts
import Store from 'electron-store'

const store = new Store({
  defaults: {
    windowBounds: { width: 1200, height: 800 },
    theme: 'system',
    recentFiles: [],
  },
})

// IPC로 노출
ipcMain.handle('store-get', (_, key: string) => store.get(key))
ipcMain.handle('store-set', (_, key: string, value: unknown) => store.set(key, value))
```

### better-sqlite3 (구조화된 데이터)

```bash
npm install better-sqlite3
npm install -D @types/better-sqlite3 electron-rebuild
npx electron-rebuild
```

```typescript
// src/main/database.ts
import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'path'

const db = new Database(join(app.getPath('userData'), 'data.db'))

// WAL 모드 (성능)
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export default db
```

## 자동 업데이트

```bash
npm install electron-updater
```

```typescript
// src/main/updater.ts
import { autoUpdater } from 'electron-updater'
import { BrowserWindow } from 'electron'

export function setupAutoUpdater(mainWindow: BrowserWindow) {
  autoUpdater.autoDownload = false

  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update-available')
  })

  autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall()
  })

  // 앱 시작 시 업데이트 확인
  autoUpdater.checkForUpdates()
}
```

## 패키징 & 배포

### electron-builder 설정

```json
// package.json
{
  "build": {
    "appId": "com.yourname.app",
    "productName": "My App",
    "mac": {
      "target": ["dmg", "zip"],
      "category": "public.app-category.productivity",
      "hardenedRuntime": true
    },
    "win": {
      "target": ["nsis", "zip"]
    },
    "linux": {
      "target": ["AppImage", "deb"]
    },
    "publish": {
      "provider": "github"
    }
  }
}
```

```bash
# 현재 플랫폼 빌드
npm run build

# 전체 플랫폼 빌드
npx electron-builder --mac --win --linux
```

## Electron 대안 비교

번들 크기나 성능이 중요하다면 대안을 고려할 것:

| 프레임워크 | 언어 | 번들 크기 | 메모리 | 적합한 경우 |
|-----------|------|----------|--------|------------|
| **Electron** | JS/TS | ~150MB+ | 200MB+ | 풀 웹 기능, npm 생태계 필요 |
| **Tauri** | Rust + JS/TS | ~3MB | ~30MB | 경량 앱, 보안 중요 |
| **Neutralinojs** | JS/TS | ~2MB | ~20MB | 초경량 유틸리티 |
| **Wails** | Go + JS/TS | ~8MB | ~50MB | Go 백엔드 선호 |

### Tauri를 선택해야 하는 경우

- 번들 크기 최소화 필요 (배포 용량 민감)
- 높은 보안 요구사항 (Rust 기반 백엔드)
- 시스템 리소스 최소화 필요
- 프론트엔드는 React/Vue 그대로 사용 가능

```bash
# Tauri 시작
npm create tauri-app@latest
```

## 보안 체크리스트

- [ ] `nodeIntegration: false` 설정
- [ ] `contextIsolation: true` 설정
- [ ] `sandbox: true` 설정
- [ ] preload script에서 최소한의 API만 노출
- [ ] 사용자 입력 경로에 대한 유효성 검증
- [ ] `webSecurity: true` 유지 (기본값)
- [ ] CSP(Content Security Policy) 헤더 설정
- [ ] `remote` 모듈 사용 금지

## 1인 창업자를 위한 권장 사항

**Electron을 선택하는 경우:**
- 웹앱을 데스크탑으로 확장하려는 경우
- 복잡한 UI가 필요한 생산성 도구
- 오프라인 우선 앱 (로컬 DB 활용)
- 기존 웹 코드베이스 재사용

**Electron을 피해야 하는 경우:**
- 단순한 유틸리티 앱 → Tauri 추천
- 배포 용량이 중요한 경우 → Tauri 추천
- 고성능 그래픽/게임 → 네이티브 추천
- 웹 브라우저로 충분한 경우 → PWA 추천
