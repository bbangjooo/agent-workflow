# Next.js + Firebase Stack Guide

실시간 기능이 핵심인 서비스에 추천하는 조합입니다.

## 왜 이 조합인가?

| 장점 | 설명 |
|------|------|
| 실시간 DB | Firestore 실시간 동기화 |
| 구글 생태계 | Google 로그인 쉬움 |
| 확장성 | 자동 스케일링 |
| 다양한 기능 | Analytics, Messaging 등 |

## 기술 스택 상세

```
Frontend:
├── Next.js 14 (App Router)
├── TypeScript
├── Tailwind CSS
└── shadcn/ui

Backend:
├── Firebase Firestore (NoSQL)
├── Firebase Auth
├── Firebase Storage
└── Firebase Cloud Functions (선택)

Infrastructure:
├── Vercel (Hosting)
├── Firebase (BaaS)
└── GitHub (Version Control)
```

## 시작하기

### 1. Firebase 프로젝트 생성

```
1. console.firebase.google.com 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력
4. Google Analytics 설정 (선택)
5. 프로젝트 생성 완료
```

### 2. Firebase 앱 등록

```
1. 프로젝트 설정 > 일반
2. "앱 추가" > 웹 앱 (</>) 선택
3. 앱 닉네임 입력
4. Firebase SDK 설정 정보 복사
```

### 3. Next.js 프로젝트 설정

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app
cd my-app

# Firebase 설치
npm install firebase firebase-admin
```

### 4. Firebase 설정

```typescript
// src/lib/firebase/config.ts
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// 앱 초기화 (중복 방지)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
```

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
```

## 무료 티어 한도

### Firebase Spark Plan (Free)
| 리소스 | 한도 |
|--------|------|
| Firestore 저장 | 1GB |
| Firestore 읽기 | 50K/일 |
| Firestore 쓰기 | 20K/일 |
| Firestore 삭제 | 20K/일 |
| Storage | 5GB |
| Auth | 무제한 (이메일/비밀번호) |
| Hosting | 10GB/월 |

## 자주 쓰는 패턴

### 인증 (Google 로그인)

```typescript
// src/lib/firebase/auth.ts
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from './config'

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  return result.user
}

export async function logOut() {
  await signOut(auth)
}
```

### 실시간 데이터 구독

```typescript
// src/hooks/usePosts.ts
'use client'

import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    )

    // 실시간 구독
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPosts(postsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { posts, loading }
}
```

### 데이터 생성

```typescript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase/config'

export async function createPost(title: string, content: string) {
  const user = auth.currentUser
  if (!user) throw new Error('Unauthorized')

  const docRef = await addDoc(collection(db, 'posts'), {
    userId: user.uid,
    title,
    content,
    createdAt: serverTimestamp(),
  })

  return docRef.id
}
```

## Firestore 보안 규칙

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자 본인 데이터만 접근
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 게시글: 모두 읽기 가능, 작성자만 수정/삭제
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Supabase vs Firebase

| 항목 | Supabase | Firebase |
|------|----------|----------|
| DB 타입 | PostgreSQL (SQL) | Firestore (NoSQL) |
| 실시간 | 지원 | 더 강력 |
| 쿼리 | SQL 지원 | 제한적 |
| 가격 | 더 예측 가능 | 사용량 기반 |
| 학습 곡선 | SQL 알면 쉬움 | 새로운 개념 |

**Firebase 선택 시점:**
- 실시간 동기화가 핵심
- Google 로그인 필수
- NoSQL에 익숙함
- 채팅, 협업 도구 등

## 참고 자료

- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Next.js Firebase 예제](https://github.com/vercel/next.js/tree/canary/examples/with-firebase)
