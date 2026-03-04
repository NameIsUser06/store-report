# StoreReport — Landing Page

Shopify 스토어 자동 리포트 생성기 검증용 랜딩페이지.

## 로컬 실행

```bash
npm install
npm run dev
# http://localhost:3000
```

## Vercel 배포 (5분)

1. GitHub에 이 레포 push
2. vercel.com → "New Project" → GitHub 레포 연결
3. Environment Variables 추가 (아래 Google Sheets 설정 참고)
4. Deploy

---

## 이메일 수집 설정 (Google Sheets)

이메일 폼 제출 시 Google Sheets에 자동으로 저장돼.
아래 단계 따라하면 10분 안에 세팅 가능.

### 1. Google Cloud Console 설정

1. console.cloud.google.com 접속
2. 새 프로젝트 만들기 (이름 아무거나)
3. "APIs & Services" → "Enable APIs" → **Google Sheets API** 활성화
4. "Credentials" → "Create Credentials" → **Service Account** 선택
5. 이름 입력 후 생성 → 생성된 서비스 계정 클릭
6. "Keys" 탭 → "Add Key" → "JSON" → 다운로드

### 2. Google Sheets 만들기

1. sheets.google.com → 새 스프레드시트 만들기
2. 상단에 헤더 추가: A1=`Email`, B1=`Date`, C1=`Source`
3. 스프레드시트 URL에서 ID 복사
   - URL: `https://docs.google.com/spreadsheets/d/[여기가 SHEET_ID]/edit`
4. 우측 상단 "Share" → 아까 만든 서비스 계정 이메일 추가 (Editor 권한)

### 3. 환경변수 설정

`.env.local.example`을 `.env.local`로 복사 후 값 입력:

```
GOOGLE_CLIENT_EMAIL=  # JSON 파일의 client_email
GOOGLE_PRIVATE_KEY=   # JSON 파일의 private_key (따옴표 포함)
GOOGLE_SHEET_ID=      # 스프레드시트 ID
```

Vercel 배포 시에는 Project Settings → Environment Variables에 동일하게 입력.

---

## 검증 기준

7일 후 이 기준으로 판단:

| 결과 | 다음 행동 |
|------|-----------|
| 이메일 30개+ | MVP 개발 시작 |
| 이메일 10~30개 | 포지셔닝 수정 후 재실험 |
| 이메일 10개 미만 | 타겟 변경 (Etsy, WooCommerce 등) |

## Reddit 포스팅

r/shopify (36만명), r/ecommerce 에 올릴 것.
