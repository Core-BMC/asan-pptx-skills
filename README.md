# asan-pptx

서울아산병원(Asan Medical Center) CI 기반 PowerPoint 프레젠테이션 생성 스킬.

Claude의 Cowork/Claude Code 환경에서 아산병원 브랜딩이 적용된 PPT를 자동 생성하거나, 기존 PPT를 아산 스타일로 변환합니다.

## 주요 기능

- **기존 PPT 변환**: 이미 만들어진 PPT를 아산병원 CI로 리브랜딩
- **새 PPT 생성**: 콘텐츠만 제공하면 아산 스타일로 처음부터 생성
- **이미지 비율 보존**: 차트/그래프 삽입 시 원본 종횡비 자동 유지
- **다크/라이트 로고 자동 전환**: 배경에 따라 적합한 로고 버전 사용

## 디자인 시스템

| 요소 | 값 |
|------|-----|
| Primary | `#0C598E` |
| Primary Dark | `#004074` |
| Secondary | `#00696D` |
| Accent | `#F68B1E` |
| 폰트 | Pretendard |
| 슬라이드 크기 | 16:9 (10" × 5.625") |

## 설치

### Cowork / Claude Code

`asan-pptx/` 폴더를 아래 경로에 복사합니다:

```
# Cowork
~/.skills/skills/asan-pptx/

# Claude Code (프로젝트별)
.claude/skills/asan-pptx/
```

### 폴더 구조

```
asan-pptx/
├── SKILL.md                 # 스킬 본체 (색상, 폰트, 헬퍼, 워크플로우)
├── references/
│   ├── layout-patterns.md   # 7개 레이아웃 코드 예시
│   └── pptxgenjs-reference.js  # 실제 10슬라이드 스크립트 레퍼런스
└── assets/
    ├── Asan_Medical_Center_logo_transparent.png  # 표준 로고
    ├── Asan_Medical_Center_logo_w.png            # 흰색 텍스트 로고 (다크 배경용)
    └── Asan_Medical_Center_logo_small.png        # 소형 로고
```

## 사용법

설치 후 Claude에게 아래와 같이 요청합니다:

```
아산 스타일로 연구 발표 PPT 만들어줘
```

```
이 PPT를 아산병원 브랜딩으로 변환해줘
```

트리거 키워드: `아산 PPT`, `아산 스타일`, `AMC PPT`, `Asan presentation`

## 의존성

스킬 실행 환경에 아래가 필요합니다:

- Node.js + `pptxgenjs` (`npm install pptxgenjs`)
- Python 3 + `Pillow` (이미지 비율 측정)
- Python 3 + `python-pptx` (QA 검증, 선택)
- Python 3 + `markitdown[pptx]` (텍스트 추출, 선택)

## 레이아웃 패턴

| 패턴 | 설명 |
|------|------|
| Title Slide | 다크 블루 그라데이션 + 대형 제목 + 오렌지 강조선 |
| Stat Cards + Info Box | 4개 메트릭 카드 + 정보 패널 |
| Stat Cards + Chart | 4개 메트릭 카드 + 차트 이미지 |
| Dual Panel | 좌/우 분할 (문제-해결, 비교 분석 등) |
| Table | Asan 스타일 테이블 (블루 헤더 + 교대 행) |
| Full Chart | 전체 화면 차트/그래프 이미지 |
| Dark Closing | 다크 배경 + 좌우 패널 + 헤더 바 |

## 라이선스

MIT License — 자유롭게 사용, 수정, 재배포 가능합니다.

## 기여

Core-BMC 팀원이라면 PR을 통해 스타일 개선, 새 레이아웃 추가 등을 기여할 수 있습니다.
