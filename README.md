# 하나루프 프론트엔드 개발자 채용 과제

경영진과 관리자들이 회사 및 계열사의 온실가스 배출량을 한눈에 파악하고 향후 탄소세를 계획할 수 있도록 돕는 웹 기반 대시보드 애플리케이션입니다.

## 실행 방법

```bash
npm install
npm run dev // http://localhost:3000 에서 확인 가능
```

## 구현 기능

**회사별 배출량 데이터 시각화**

- 월별 배출량 추이를 막대 차트로 표현
- 연도별 배출원 비중을 파이 차트로 표현

**KPI 카드**

- 현재 월 총 배출량 표시
- 전월 대비 변화율 계산
- 연간 누적 배출량 집계
- 주요 배출원 상위 항목 표시

**회사 선택**

- 드롭다운에서 특정 회사를 선택하면 해당 회사 데이터만 보여줌

**반응형 디자인**

- 다양한 화면 크기에 맞춰 대시보드 구현

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: Zustand
- **차트 라이브러리**: Recharts

## 구현 세부사항

### 1. 데이터 구조 확장

**원본**:

```typescript
emissions: [
  { yearMonth: '2024-01', emissions: 120 },
  { yearMonth: '2024-02', emissions: 110 },
  { yearMonth: '2024-03', emissions: 95 },
];
```

**변경**:

```typescript
emissions: [
  { yearMonth: '2024-01', source: 'diesel', emissions: 50 },
  { yearMonth: '2024-01', source: 'gasoline', emissions: 40 },
  { yearMonth: '2024-01', source: 'lpg', emissions: 30 },

  { yearMonth: '2024-02', source: 'diesel', emissions: 40 },
  { yearMonth: '2024-02', source: 'gasoline', emissions: 40 },
  { yearMonth: '2024-02', source: 'lpg', emissions: 30 },

  { yearMonth: '2024-03', source: 'diesel', emissions: 30 },
  { yearMonth: '2024-03', source: 'gasoline', emissions: 35 },
  { yearMonth: '2024-03', source: 'lpg', emissions: 30 },

  { yearMonth: '2025-01', source: 'diesel', emissions: 50 },
  { yearMonth: '2025-01', source: 'gasoline', emissions: 40 },
  { yearMonth: '2025-01', source: 'lpg', emissions: 25 },

  { yearMonth: '2025-02', source: 'diesel', emissions: 45 },
  { yearMonth: '2025-02', source: 'gasoline', emissions: 35 },
  { yearMonth: '2025-02', source: 'lpg', emissions: 25 },

  { yearMonth: '2025-03', source: 'diesel', emissions: 40 },
  { yearMonth: '2025-03', source: 'gasoline', emissions: 35 },
  { yearMonth: '2025-03', source: 'lpg', emissions: 25 },
],
```

연료별 세분화와 연도 추가로 최근 2년(2024~2025년)의 데이터를 가정하여 비교할 수 있도록 확장했습니다.

### 2. Posts 기능 제외

대시보드에 정보가 많아 한 눈에 들어오지 않을 것이라 생각했고 배출량 파악 및 탄소세 계획과 연관성이 부족하다고 판단하여 제외했습니다.

### 3. 차트 선택

- **막대 차트**
  -   2024~2025년도의 월별 총 배출량을 한 눈에 보기 위해 사용했습니다.
  -   시간에 따른 변화를 직관적으로 파악할 수 있어서 경영진이 배출량 추이를 쉽게 이해할 수 있습니다.
- **파이 차트**
  - 연도별 연료별 비중을 한 눈에 확인하기 위해 사용했습니다.

### 4. 색상 선택

파란색 계열이 신뢰감을 준다고 생각해서 주요 컬러로 선택했고 깔끔한 UI를 위해 무채색 계열도 활용했습니다. 차트와 KPI 카드에는 구분이 명확한 색상을 적용했습니다.

### 5. 상태 관리

- **CompanyStore**
  - 회사 데이터, 로딩/에러 상태를 중앙에서 관리하여 컴포넌트 간 일관성을 유지했습니다.
- **SidebarStore**
  - 사이드바가 열리거나 닫혔을 때의 UI 상태를 관리하고 localStorage에 저장해 새로고침해도 상태가 유지되도록 구현했습니다.
