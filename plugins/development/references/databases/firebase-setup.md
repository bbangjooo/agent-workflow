# Firebase 데이터베이스 설정 가이드

Google의 BaaS(Backend as a Service) 플랫폼입니다. Firestore(NoSQL), Realtime Database, Authentication, Hosting 등을 제공합니다.

## 1. 프로젝트 생성

### 1.1 Firebase Console 접속

1. [console.firebase.google.com](https://console.firebase.google.com) 접속
2. Google 계정으로 로그인
3. "프로젝트 추가" (또는 "Add project") 클릭

### 1.2 프로젝트 설정

1. **프로젝트 이름** 입력 (예: my-saas-app)
2. **Google Analytics** 설정:
   - MVP 단계: 비활성화 권장 (나중에 추가 가능)
   - 프로덕션: 활성화 권장
3. "프로젝트 만들기" 클릭
4. 약 30초 대기

### 1.3 Free (Spark) 플랜 제한

| 항목 | 제한 |
|------|------|
| Firestore 저장소 | 1GB |
| Firestore 읽기 | 50,000/일 |
| Firestore 쓰기 | 20,000/일 |
| Firestore 삭제 | 20,000/일 |
| Hosting 저장소 | 10GB |
| Hosting 전송 | 360MB/일 |

> 💡 Blaze (종량제) 플랜으로 업그레이드하면 무료 할당량 이후 사용량에 따라 과금

---

## 2. 웹 앱 등록

### 2.1 앱 추가

1. 프로젝트 개요 페이지에서 **웹 아이콘(</> )** 클릭
2. 앱 닉네임 입력 (예: web-app)
3. "Firebase Hosting 설정" 체크박스: 선택 사항
4. "앱 등록" 클릭

### 2.2 Firebase 설정 객체 복사

등록 후 표시되는 설정 객체를 복사합니다:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## 3. Firestore 데이터베이스 생성

### 3.1 Firestore 활성화

1. 좌측 메뉴 **Firestore Database** 클릭
2. "데이터베이스 만들기" 클릭
3. 보안 규칙 선택:
   - **테스트 모드**: 개발 중 선택 (30일 제한)
   - **프로덕션 모드**: 배포 시 선택
4. 위치 선택: `asia-northeast3 (Seoul)` 권장
5. "사용 설정" 클릭

### 3.2 보안 규칙 (개발용)

```javascript
// Firestore Rules (테스트용 - 프로덕션에서 사용 금지!)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2024, 12, 31);
    }
  }
}
```

### 3.3 보안 규칙 (프로덕션용)

```javascript
// Firestore Rules (프로덕션)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 인증된 사용자만 자신의 데이터 접근
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 공개 데이터 읽기 허용
    match /public/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 4. 환경변수 설정

### 4.1 .env.local 파일

```bash
# .env.local
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4.2 .env.example

```bash
# .env.example
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

---

## 5. 클라이언트 설정

### 5.1 필수 패키지

```bash
npm install firebase
```

### 5.2 Firebase 초기화

```typescript
// src/lib/firebase/config.ts
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// 중복 초기화 방지
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
```

### 5.3 Firestore 헬퍼 함수

```typescript
// src/lib/firebase/firestore.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore'
import { db } from './config'

// 컬렉션 전체 조회
export async function getCollection<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const q = query(collection(db, collectionName), ...constraints)
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T))
}

// 단일 문서 조회
export async function getDocument<T extends DocumentData>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, docId)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T) : null
}

// 문서 생성
export async function createDocument<T extends DocumentData>(
  collectionName: string,
  data: Omit<T, 'id'>
): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), data)
  return docRef.id
}

// 문서 업데이트
export async function updateDocument<T extends Partial<DocumentData>>(
  collectionName: string,
  docId: string,
  data: T
): Promise<void> {
  const docRef = doc(db, collectionName, docId)
  await updateDoc(docRef, data)
}

// 문서 삭제
export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  const docRef = doc(db, collectionName, docId)
  await deleteDoc(docRef)
}
```

---

## 6. 연결 테스트

### 6.1 테스트 스크립트

```typescript
// scripts/test-firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

async function testConnection() {
  console.log('🔌 Firebase 연결 테스트 시작...')
  console.log(`📍 Project ID: ${firebaseConfig.projectId}`)

  try {
    // 1. Firebase 앱 초기화
    const app = initializeApp(firebaseConfig)
    console.log('✅ Firebase 앱 초기화 성공!')

    // 2. Firestore 연결 테스트
    const db = getFirestore(app)
    const testCollection = collection(db, '_connection_test')
    await getDocs(testCollection)
    console.log('✅ Firestore 연결 성공!')

    // 3. Auth 서비스 테스트
    const auth = getAuth(app)
    console.log('✅ Authentication 서비스 준비됨!')

    console.log('\n🎉 모든 연결 테스트 통과!')
    return true

  } catch (err: any) {
    console.error('❌ 연결 실패:', err.message)
    return false
  }
}

testConnection()
```

### 6.2 실행 방법

```bash
npx dotenv -e .env.local -- npx tsx scripts/test-firebase.ts
```

### 6.3 예상 출력

```
🔌 Firebase 연결 테스트 시작...
📍 Project ID: your-app
✅ Firebase 앱 초기화 성공!
✅ Firestore 연결 성공!
✅ Authentication 서비스 준비됨!

🎉 모든 연결 테스트 통과!
```

---

## 7. 트러블슈팅

### 7.1 일반적인 에러

| 에러 | 원인 | 해결 |
|------|------|------|
| `auth/invalid-api-key` | API 키 오류 | 프로젝트 설정에서 재확인 |
| `permission-denied` | Firestore 규칙 | 테스트 모드로 변경 |
| `Failed to get document` | 컬렉션 없음 | 정상 (빈 컬렉션) |
| `quota-exceeded` | 일일 할당량 초과 | 다음 날 대기 또는 Blaze 업그레이드 |

### 7.2 Firestore 인덱스 에러

복합 쿼리 시 인덱스 필요:

```
The query requires an index. You can create it here: [URL]
```

해결: 에러 메시지의 URL 클릭하여 인덱스 생성

### 7.3 CORS 에러

Firebase는 기본적으로 CORS를 처리하지만, 문제 발생 시:

1. Firebase Console > Authentication > Settings
2. "Authorized domains"에 도메인 추가

---

## 8. 보안 체크리스트

- [ ] Firestore 보안 규칙 설정
- [ ] API 키 제한 설정 (Google Cloud Console)
- [ ] 인증된 요청만 허용
- [ ] `.env.local`이 `.gitignore`에 포함됨

---

## 9. Firestore vs Realtime Database

| 기능 | Firestore | Realtime Database |
|------|-----------|-------------------|
| 데이터 모델 | 문서/컬렉션 | JSON 트리 |
| 쿼리 | 복잡한 쿼리 지원 | 단순 쿼리만 |
| 확장성 | 자동 확장 | 수동 샤딩 필요 |
| 오프라인 | 완전 지원 | 제한적 |
| 권장 | **새 프로젝트** | 레거시/단순 앱 |

> 💡 새 프로젝트는 **Firestore** 사용 권장

---

## 10. 유용한 링크

- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Firestore 시작하기](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Console](https://console.firebase.google.com)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Firestore 보안 규칙](https://firebase.google.com/docs/firestore/security/get-started)
