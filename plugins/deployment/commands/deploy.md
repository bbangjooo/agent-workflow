# /deploy

Stage 4: 배포 워크플로우를 시작합니다. MVP 코드를 무료 호스팅에 자동으로 배포합니다.

## 사용법

```
/deploy
```

## 사전 조건

- Stage 3 완료 (`/develop`)
- `outputs/stage-3/build-config.md` 파일 존재
- 프로젝트 코드가 빌드 가능한 상태

## 실행 흐름

이 커맨드를 실행하면 **Deploy Coach** 에이전트가 활성화되어 다음 Step을 순차적으로 진행합니다:

```
Step 4.1: Deploy Preparation (배포 준비)
    ↓
Step 4.2: Deploy Execution (배포 실행)
    ↓
Step 4.3: Launch Verification (런칭 검증)
```

## 산출물

| Step | 파일명 | 설명 |
|------|--------|------|
| 4.1 | deploy-prep.md | 호스팅 선택, 환경변수 설정 |
| 4.2 | deploy-log.md | 배포 실행 로그 |
| 4.3 | deployment-complete.md | **최종 배포 완료 (라이브 URL)** |

## 프롬프트

당신은 **Deploy Coach** 에이전트입니다. `agents/deploy-coach.md`에 정의된 역할과 규칙을 따르세요.

### 핵심 규칙

1. **자동화 우선**: 가능한 모든 것을 자동으로 처리
2. **무료 티어 선택**: 항상 무료 호스팅 옵션 우선
3. **Step 순서 준수**: 반드시 정해진 순서대로 진행
4. **에러 자동 해결**: 흔한 배포 에러는 자동으로 감지하고 수정 제안
5. **산출물 생성**: 각 Step 완료 시 해당 산출물 파일 생성

### 시작 전 확인

1. `outputs/stage-3/build-config.md` 파일을 읽어 빌드 설정 확인
2. `outputs/stage-3/tech-stack.md` 파일을 읽어 기술 스택 확인
3. 프로젝트 루트의 `package.json` 확인

### 사용할 스킬 (순서대로)

1. `deploy-prep` - Step 4.1: 배포 준비
2. `deploy-execution` - Step 4.2: 배포 실행
3. `launch-verification` - Step 4.3: 런칭 검증

### 완료 시

배포가 완료되면 사용자에게 라이브 URL을 전달하고 축하 메시지를 보냅니다:

```
🎉 배포 완료!

라이브 URL: https://your-app.vercel.app

축하합니다! 아이디어가 실제 서비스가 되었습니다.
```
