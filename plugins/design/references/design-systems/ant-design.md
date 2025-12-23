# Ant Design

엔터프라이즈급 React UI 라이브러리입니다.

## 개요

Ant Design(antd)은 Alibaba에서 개발한 엔터프라이즈급 UI 디자인 언어와 React 컴포넌트 라이브러리입니다. 대규모 어드민 패널, 대시보드, B2B 애플리케이션에 최적화되어 있습니다.

### 특징

- **엔터프라이즈급**: 복잡한 데이터 테이블, 폼, 차트 지원
- **완전한 컴포넌트**: 70+ 개의 고품질 컴포넌트
- **디자인 토큰**: CSS 변수 기반 테마 시스템
- **국제화(i18n)**: 50+ 언어 지원
- **TypeScript**: 완전한 타입 정의

### 적합한 프로젝트

- 관리자 대시보드
- 백오피스 시스템
- B2B 엔터프라이즈 애플리케이션
- 데이터 중심 애플리케이션

---

## 색상 시스템

### 기본 색상 팔레트

Ant Design은 자연에서 영감을 받은 색상 시스템을 사용합니다:

| 색상 | 용도 | 기본값 |
|------|------|--------|
| Blue (Daybreak) | Primary, 링크, 강조 | #1677ff |
| Red (Dust) | 에러, 위험, 삭제 | #ff4d4f |
| Orange (Sunset) | 경고, 주의 | #fa8c16 |
| Gold | 알림, 중요 | #faad14 |
| Green (Polar) | 성공, 완료 | #52c41a |
| Cyan (Geek) | 정보 | #13c2c2 |
| Purple | 프리미엄, 특별 | #722ed1 |

### 색상 팔레트 구조

각 색상은 1-10 단계의 shade를 가집니다:

```typescript
// Primary Color (Blue)
const blue = {
  1: '#e6f4ff',   // 가장 밝음
  2: '#bae0ff',
  3: '#91caff',
  4: '#69b1ff',
  5: '#4096ff',
  6: '#1677ff',   // 기본
  7: '#0958d9',
  8: '#003eb3',
  9: '#002c8c',
  10: '#001d66',  // 가장 어두움
}
```

### 시맨틱 색상

```typescript
const semanticColors = {
  colorPrimary: '#1677ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1677ff',
  colorTextBase: '#000',
  colorBgBase: '#fff',
  colorLink: '#1677ff',
}
```

---

## 타이포그래피

### 폰트 설정

```typescript
const typography = {
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`,
  fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace`,
  fontSize: 14,       // 기본 폰트 크기
  lineHeight: 1.5715, // 기본 줄 높이
}
```

### 타이틀 스케일

```tsx
import { Typography } from 'antd'
const { Title, Text, Paragraph } = Typography

<Title level={1}>h1. 제목 (38px)</Title>
<Title level={2}>h2. 제목 (30px)</Title>
<Title level={3}>h3. 제목 (24px)</Title>
<Title level={4}>h4. 제목 (20px)</Title>
<Title level={5}>h5. 제목 (16px)</Title>

<Text>기본 텍스트 (14px)</Text>
<Text type="secondary">보조 텍스트</Text>
<Text type="success">성공 텍스트</Text>
<Text type="warning">경고 텍스트</Text>
<Text type="danger">위험 텍스트</Text>
<Text disabled>비활성화 텍스트</Text>
```

### 한글 폰트 설정

```typescript
const theme = {
  token: {
    fontFamily: `'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
  },
}
```

---

## 간격 시스템

### Space 컴포넌트

```tsx
import { Space, Button } from 'antd'

<Space size="small">  {/* 8px */}
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>

<Space size="middle"> {/* 16px */}
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>

<Space size="large">  {/* 24px */}
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>

<Space size={[8, 16]}> {/* 커스텀 [수평, 수직] */}
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>
```

### 기본 간격 토큰

```typescript
const spacing = {
  marginXXS: 4,
  marginXS: 8,
  marginSM: 12,
  margin: 16,
  marginMD: 20,
  marginLG: 24,
  marginXL: 32,
  marginXXL: 48,

  paddingXXS: 4,
  paddingXS: 8,
  paddingSM: 12,
  padding: 16,
  paddingMD: 20,
  paddingLG: 24,
  paddingXL: 32,
}
```

---

## 핵심 컴포넌트

### Button

```tsx
import { Button, Space } from 'antd'

// 타입
<Button type="primary">Primary</Button>
<Button>Default</Button>
<Button type="dashed">Dashed</Button>
<Button type="text">Text</Button>
<Button type="link">Link</Button>

// 크기
<Button size="large">Large</Button>
<Button size="middle">Middle</Button>
<Button size="small">Small</Button>

// 상태
<Button type="primary" loading>Loading</Button>
<Button type="primary" disabled>Disabled</Button>
<Button type="primary" danger>Danger</Button>

// 아이콘
<Button type="primary" icon={<SearchOutlined />}>검색</Button>
<Button shape="circle" icon={<SearchOutlined />} />
```

### Form

```tsx
import { Form, Input, Button, Select } from 'antd'

function MyForm() {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        label="이메일"
        rules={[
          { required: true, message: '이메일을 입력하세요' },
          { type: 'email', message: '올바른 이메일을 입력하세요' },
        ]}
      >
        <Input placeholder="이메일 입력" />
      </Form.Item>

      <Form.Item
        name="password"
        label="비밀번호"
        rules={[{ required: true, message: '비밀번호를 입력하세요' }]}
      >
        <Input.Password placeholder="비밀번호 입력" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          제출
        </Button>
      </Form.Item>
    </Form>
  )
}
```

### Table

```tsx
import { Table } from 'antd'

const columns = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: '나이',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: '활성', value: 'active' },
      { text: '비활성', value: 'inactive' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: '액션',
    key: 'action',
    render: (_, record) => (
      <Space>
        <a>편집</a>
        <a>삭제</a>
      </Space>
    ),
  },
]

const data = [
  { key: '1', name: '홍길동', age: 32, status: 'active' },
  { key: '2', name: '김철수', age: 42, status: 'inactive' },
]

<Table
  columns={columns}
  dataSource={data}
  pagination={{ pageSize: 10 }}
/>
```

### Modal

```tsx
import { Modal, Button } from 'antd'
import { useState } from 'react'

function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        모달 열기
      </Button>
      <Modal
        title="모달 제목"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okText="확인"
        cancelText="취소"
      >
        <p>모달 내용입니다.</p>
      </Modal>
    </>
  )
}

// 간편 메서드
Modal.confirm({
  title: '삭제하시겠습니까?',
  content: '이 작업은 되돌릴 수 없습니다.',
  okText: '삭제',
  cancelText: '취소',
  onOk() {
    console.log('삭제됨')
  },
})
```

### Message & Notification

```tsx
import { message, notification, Button } from 'antd'

// Message (간단한 피드백)
<Button onClick={() => message.success('저장되었습니다!')}>성공</Button>
<Button onClick={() => message.error('오류가 발생했습니다.')}>에러</Button>
<Button onClick={() => message.warning('주의가 필요합니다.')}>경고</Button>
<Button onClick={() => message.info('정보입니다.')}>정보</Button>
<Button onClick={() => message.loading('처리 중...', 2)}>로딩</Button>

// Notification (상세한 알림)
notification.open({
  message: '새 메시지',
  description: '홍길동님이 메시지를 보냈습니다.',
  placement: 'topRight', // topLeft, bottomLeft, bottomRight
  duration: 4.5,
})
```

### Card

```tsx
import { Card, Avatar, Space } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const { Meta } = Card

<Card
  style={{ width: 300 }}
  cover={<img alt="cover" src="image.jpg" />}
  actions={[
    <SettingOutlined key="setting" />,
    <EditOutlined key="edit" />,
    <EllipsisOutlined key="ellipsis" />,
  ]}
>
  <Meta
    avatar={<Avatar src="avatar.jpg" />}
    title="카드 제목"
    description="카드 설명 텍스트"
  />
</Card>
```

### Layout

```tsx
import { Layout, Menu } from 'antd'

const { Header, Sider, Content, Footer } = Layout

<Layout>
  <Header>헤더</Header>
  <Layout>
    <Sider width={200}>
      <Menu
        mode="inline"
        items={[
          { key: '1', label: '메뉴 1' },
          { key: '2', label: '메뉴 2' },
        ]}
      />
    </Sider>
    <Content>콘텐츠</Content>
  </Layout>
  <Footer>푸터</Footer>
</Layout>
```

---

## 설치 및 설정

### 기본 설치

```bash
npm install antd
npm install @ant-design/icons  # 아이콘 (선택)
```

### Next.js App Router 설정

```tsx
// src/app/layout.tsx
import { AntdRegistry } from '@ant-design/nextjs-registry'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
```

```bash
npm install @ant-design/nextjs-registry
```

---

## 테마 커스터마이징

### ConfigProvider로 테마 적용

```tsx
import { ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'

function App() {
  return (
    <ConfigProvider
      locale={koKR}
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
          fontFamily: "'Pretendard', sans-serif",
        },
        components: {
          Button: {
            colorPrimary: '#FF6B35',
          },
        },
      }}
    >
      {/* 앱 내용 */}
    </ConfigProvider>
  )
}
```

### 다크 모드

```tsx
import { ConfigProvider, theme } from 'antd'

<ConfigProvider
  theme={{
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#1677ff',
    },
  }}
>
  {/* 다크 모드 앱 */}
</ConfigProvider>

// 혼합 알고리즘 (다크 + 컴팩트)
<ConfigProvider
  theme={{
    algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
  }}
>
  {/* 앱 */}
</ConfigProvider>
```

### 컴팩트 모드

```tsx
import { ConfigProvider, theme } from 'antd'

<ConfigProvider
  theme={{
    algorithm: theme.compactAlgorithm,
  }}
>
  {/* 더 작은 UI */}
</ConfigProvider>
```

---

## 참고 자료

- [Ant Design 공식 문서](https://ant.design/)
- [Ant Design GitHub](https://github.com/ant-design/ant-design)
- [Ant Design Pro (어드민 템플릿)](https://pro.ant.design/)
- [Ant Design Charts](https://charts.ant.design/)
