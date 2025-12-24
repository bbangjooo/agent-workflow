# Firebase Client 설정 가이드

Firebase의 공식 JavaScript SDK 설정 가이드입니다. Firestore NoSQL 데이터베이스를 사용합니다.

## 1. 패키지 설치

```bash
npm install firebase
```

## 2. 파일 구조

```
src/
└── lib/
    └── firebase/
        ├── config.ts     # Firebase 초기화
        └── firestore.ts  # Firestore 헬퍼 함수
```

## 3. Firebase 초기화

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

## 4. Firestore 헬퍼 함수

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

// 컬렉션 조회
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

## 5. 연결 테스트

```typescript
// scripts/test-firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

async function testConnection() {
  console.log('🔌 Testing Firebase connection...')

  try {
    const app = initializeApp(firebaseConfig)
    console.log('✅ Firebase app initialized!')

    const db = getFirestore(app)
    await getDocs(collection(db, '_connection_test'))
    console.log('✅ Firestore connection successful!')

    return true
  } catch (err: any) {
    console.error('❌ Failed:', err.message)
    return false
  }
}

testConnection()
```

## 6. 일반적인 사용 패턴

```typescript
import { db } from '@/lib/firebase/config'
import {
  collection, doc, getDocs, getDoc,
  addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit
} from 'firebase/firestore'

// 전체 조회
const snapshot = await getDocs(collection(db, 'posts'))
const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

// 조건 조회
const q = query(
  collection(db, 'posts'),
  where('published', '==', true),
  orderBy('createdAt', 'desc'),
  limit(10)
)
const filtered = await getDocs(q)

// 단일 조회
const docSnap = await getDoc(doc(db, 'posts', postId))
const post = docSnap.exists() ? docSnap.data() : null

// 생성
const docRef = await addDoc(collection(db, 'posts'), {
  title: 'Hello',
  content: 'World',
  createdAt: new Date()
})

// 수정
await updateDoc(doc(db, 'posts', postId), { title: 'Updated' })

// 삭제
await deleteDoc(doc(db, 'posts', postId))
```

## 7. Seed 데이터

### Firebase Admin SDK 설치

```bash
npm install firebase-admin
```

### seed 파일 생성

```typescript
// scripts/seed.ts
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// 서비스 계정 키 다운로드 필요
initializeApp({
  credential: cert('./service-account-key.json')
})

const db = getFirestore()

async function seed() {
  console.log('🌱 Seeding...')

  const batch = db.batch()

  // 테스트 사용자
  const userRef = db.collection('users').doc('test-user-1')
  batch.set(userRef, {
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
  })

  // 샘플 게시글
  const post1Ref = db.collection('posts').doc()
  batch.set(post1Ref, {
    title: '첫 번째 글',
    content: '내용입니다',
    authorId: 'test-user-1',
    createdAt: new Date(),
  })

  await batch.commit()
  console.log('✅ Seed 완료')
}

seed().catch(console.error)
```

### 실행

```bash
npx tsx scripts/seed.ts
```

> ⚠️ `service-account-key.json`은 Firebase Console > 프로젝트 설정 > 서비스 계정에서 다운로드합니다. 절대 Git에 커밋하지 마세요!

## 8. 트러블슈팅

| 에러 | 원인 | 해결 |
|------|------|------|
| `auth/invalid-api-key` | API 키 오류 | 환경변수 확인 |
| `permission-denied` | 보안 규칙 | Firestore 규칙 확인 |
| `quota-exceeded` | 할당량 초과 | Blaze 업그레이드 |
