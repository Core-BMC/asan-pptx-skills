---
name: asan-pptx
description: "서울아산병원(Asan Medical Center) CI 기반 PowerPoint 프레젠테이션 생성 및 변환 스킬. 기존 PPT를 아산병원 브랜딩으로 리스타일링하거나, 새 콘텐츠를 아산 스타일로 처음부터 생성한다. '아산 PPT', '아산 스타일', '아산병원 프레젠테이션', 'AMC PPT', 'Asan presentation' 등 아산병원 관련 PPT 요청 시 반드시 이 스킬을 사용할 것."
---

# Asan Medical Center PPT Style Skill

서울아산병원 CI(Corporate Identity)를 적용한 프레젠테이션을 pptxgenjs로 생성하는 스킬.

## 사용 시점

- 기존 PPT를 아산병원 스타일로 변환할 때
- 새 PPT를 아산병원 브랜딩으로 처음부터 만들 때
- 아산병원 발표 자료, 연구 프레젠테이션 등을 만들 때

## 작업 흐름

### A. 기존 PPT 변환

1. **원본 분석**: `python -m markitdown original.pptx`로 텍스트 추출
2. **이미지 추출**: 원본 PPTX를 unzip하여 `ppt/media/` 내 이미지 확보
3. **이미지 비율 측정**: Python PIL로 각 이미지의 w×h 픽셀 측정 (비율 보존 필수)
4. **pptxgenjs 스크립트 작성**: 아래 스타일 가이드에 따라 슬라이드 재구성
5. **생성 및 QA**: `node generate.js` 실행 후 시각적 검증

### B. 새 PPT 생성

1. **콘텐츠 정리**: 사용자가 제공한 내용을 슬라이드별로 구조화
2. **레이아웃 선택**: 아래 레이아웃 패턴에서 적합한 것 선택
3. **pptxgenjs 스크립트 작성**: 스타일 가이드 적용
4. **생성 및 QA**

## 색상 팔레트 (ASAN_01)

pptxgenjs에서 색상 코드를 `#` 없이 사용한다.

| 용도 | 색상 코드 | 설명 |
|------|-----------|------|
| **primary** | `0C598E` | 메인 블루 — 헤더 바, 제목, 테이블 헤더 |
| **primaryLight** | `438FD5` | 보조 블루 — 강조, 카드 상단 |
| **primaryDark** | `004074` | 진한 블루 — 표지/마지막 슬라이드 배경 |
| **secondary** | `00696D` | 틸 — 보조 강조, 결론 텍스트 |
| **secondaryLight** | `00A0A8` | 밝은 틸 |
| **accent** | `F68B1E` | 오렌지 — 강조선, 포인트 |
| **accentRed** | `E8453C` | 레드 — 경고, 문제 강조 |
| **accentSky** | `00C4DE` | 하늘색 — 다크 배경 위 부제목 |
| **textDark** | `404040` | 본문 텍스트 |
| **white** | `FFFFFF` | 배경, 헤더 바 텍스트 |
| **bgSubtle** | `F5F7FA` | 정보 박스 배경 |
| **tableAlt** | `EBF2F8` | 테이블 교대 행 |
| **panelDark** | `0A4D78` | 다크 슬라이드 패널 헤더 바 |
| **panelBody** | `1A6A9C` | 다크 슬라이드 패널 본문 (transparency: 20) |

## 폰트

모든 텍스트에 **Pretendard** 사용 (원본 페이퍼로지 계열의 무료 대안).
Pretendard가 시스템에 없으면 **Noto Sans KR** 또는 **Arial**로 대체.

## 타이포그래피

| 요소 | fontSize | bold | color |
|------|----------|------|-------|
| 표지 제목 | 40 | O | white |
| 표지 부제목 | 18 | X | accentSky |
| 헤더 바 제목 | 18 | O | white |
| 섹션 번호 (01, 02) | 24 | O | primary |
| 섹션 소제목 | 18 | O | textDark |
| 본문 | 12-14 | X | textDark |
| 캡션/각주 | 10 | X | 777777 |
| 통계 숫자 (카드) | 32 | O | primary |
| 페이지 번호 | 10 | X | 999999 |

## 로고

스킬 `assets/` 폴더에 두 버전의 로고가 있다:

- **`Asan_Medical_Center_logo_transparent.png`**: 표준 로고 (투명 배경) — 밝은 배경에 사용하지 않음 (헤더 바에서는 white 버전 사용)
- **`Asan_Medical_Center_logo_w.png`**: 흰색 텍스트 로고 — 블루 헤더 바, 다크 배경 슬라이드에 사용

로고 크기 가이드:
- 헤더 바 (우측): w=1.2, h=0.37, 위치 x=8.5, y=0.08
- 표지 슬라이드 (우측 상단): w=1.5, h=0.46, 위치 x=8.0, y=0.3
- 마지막 슬라이드 (우측 하단): w=1.3~1.67, h=0.4~0.47

로고 경로는 스크립트에서 `path.resolve()`로 절대경로 설정:
```javascript
const LOGO = path.resolve("assets/Asan_Medical_Center_logo_transparent.png");
const LOGO_W = path.resolve("assets/Asan_Medical_Center_logo_w.png");
```

## pptxgenjs 기본 설정

```javascript
const pptxgen = require("pptxgenjs");
const path = require("path");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";  // 10" × 5.625"
pres.author = "발표자 이름";
pres.title = "프레젠테이션 제목";
```

## 헬퍼 함수

스크립트 상단에 아래 헬퍼를 정의하여 일관성 유지:

```javascript
// 색상 상수
const C = {
  primary: "0C598E", primaryLight: "438FD5", primaryDark: "004074",
  secondary: "00696D", secondaryLight: "00A0A8",
  accent: "F68B1E", accentRed: "E8453C", accentSky: "00C4DE",
  textDark: "404040", textBlack: "000000", white: "FFFFFF",
  bgSubtle: "F5F7FA", bgCard: "F0F4F8",
  tableHeader: "0C598E", tableAlt: "EBF2F8",
};

// 상단 블루 헤더 바 + 제목 + 로고(white)
function addHeaderBar(slide, title) {
  slide.addShape("rect", {
    x: 0, y: 0, w: 10, h: 0.65,
    fill: { color: C.primary },
  });
  slide.addText(title, {
    x: 0.4, y: 0.08, w: 7.5, h: 0.5,
    fontSize: 18, fontFace: "Pretendard",
    color: C.white, bold: true, margin: 0,
  });
  slide.addImage({
    path: LOGO_W, x: 8.5, y: 0.08, w: 1.2, h: 0.37,
  });
}

// 페이지 번호 (우측 하단)
function addPageNum(slide, num) {
  slide.addText(String(num), {
    x: 9.2, y: 5.25, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Pretendard",
    color: "999999", align: "right", margin: 0,
  });
}

// 통계 카드 (상단 색상 바 + 큰 숫자 + 라벨)
function makeStatCard(slide, x, y, w, value, label, topColor) {
  slide.addShape("rect", {
    x, y, w, h: 1.15,
    fill: { color: C.white },
    shadow: { type: "outer", color: "000000", blur: 4, offset: 2, angle: 135, opacity: 0.08 },
  });
  slide.addShape("rect", { x, y, w, h: 0.06, fill: { color: topColor || C.primary } });
  slide.addText(value, {
    x, y: y + 0.15, w, h: 0.6,
    fontSize: 32, fontFace: "Pretendard",
    color: C.primary, bold: true, align: "center", margin: 0,
  });
  slide.addText(label, {
    x, y: y + 0.72, w, h: 0.35,
    fontSize: 11, fontFace: "Pretendard",
    color: "777777", align: "center", margin: 0,
  });
}

// 섹션 번호 + 소제목
function addSectionNumber(slide, num, title, x, y) {
  slide.addText(num, {
    x: x || 0.5, y: y || 0.9, w: 0.7, h: 0.45,
    fontSize: 24, fontFace: "Pretendard",
    color: C.primary, bold: true, margin: 0,
  });
  slide.addText(title, {
    x: (x || 0.5) + 0.75, y: y || 0.9, w: 7, h: 0.45,
    fontSize: 18, fontFace: "Pretendard",
    color: C.textDark, bold: true, margin: 0,
  });
}
```

## 레이아웃 패턴

자세한 코드 예시는 `references/layout-patterns.md`를 참조.

### 1. 표지 슬라이드 (Title)
- 배경: primaryDark + primary 오버레이 (transparency: 30)
- 오렌지 강조선 (0.06" 높이)
- 대형 제목 (40pt white bold)
- 부제목 (18pt accentSky)
- 발표자 정보 (13pt "AACCDD")
- 로고: LOGO_W, 우측 상단

### 2. 콘텐츠 슬라이드 (Content)
- 배경: white
- addHeaderBar()로 상단 블루 바
- 콘텐츠 영역: y=0.8부터 시작
- addPageNum()으로 페이지 번호

### 3. 통계 카드 + 차트 슬라이드
- addHeaderBar()
- makeStatCard() × 4개 가로 배열 (0.4 + i * 2.35, 0.85, 2.15)
- 차트 이미지: y=2.2부터 (비율 보존 필수)

### 4. 좌우 패널 슬라이드
- bgSubtle 배경 박스 + 좌측 색상 바 (0.06" 너비)
- 좌: x=0.4, w=4.35 / 우: x=5.0, w=4.6
- 패널 제목 (15-16pt bold) + 본문 (11-12pt)

### 5. 테이블 슬라이드
- 헤더 행: fill tableHeader, color white, bold
- 교대 행: fill tableAlt
- border: { pt: 0.5, color: "DDDDDD" }
- fontSize: 10-11

### 6. 다크 배경 슬라이드 (Discussion/Closing)
- 배경: primaryDark + primary 오버레이
- 좌우 패널: panelBody (transparency: 20) + panelDark 헤더 바 (h=0.75)
- 제목: accentSky, 본문: white
- 로고: LOGO_W, 하단 우측

## 이미지 비율 보존 (중요!)

차트나 그래프 이미지를 삽입할 때 반드시 원본 가로/세로 비율을 유지해야 한다. 비율이 맞지 않으면 그래프가 왜곡되어 데이터가 잘못 전달된다.

```python
# Python으로 이미지 비율 측정
from PIL import Image
im = Image.open("chart.png")
w, h = im.size
ratio = w / h  # 예: 1.122 (거의 정사각형)
```

```javascript
// 슬라이드 가용 영역에 맞추어 비율 보존 배치
const imgRatio = 1.122;  // 원본 w/h
const maxH = 4.50;       // 헤더 바 아래 ~ 페이지 번호 위
const maxW = 9.7;        // 좌우 여백 제외

let dispW, dispH;
if (maxH * imgRatio <= maxW) {
  // 높이 기준 맞춤
  dispH = maxH;
  dispW = maxH * imgRatio;
} else {
  // 너비 기준 맞춤
  dispW = maxW;
  dispH = maxW / imgRatio;
}
const x = (10 - dispW) / 2;  // 가로 중앙 정렬

slide.addImage({
  path: imagePath,
  x: x, y: 0.8, w: dispW, h: dispH,
});
```

## SVG → PNG 변환

pptxgenjs는 SVG를 직접 지원하지 않으므로, 로고 등 SVG 파일은 PNG로 변환:

```python
import cairosvg
cairosvg.svg2png(url="logo.svg", write_to="logo.png", output_width=1440)
```

## QA 프로세스

1. **텍스트 검증**: `python -m markitdown output.pptx`
2. **시각적 검증**: LibreOffice로 PDF 변환 → pdftoppm으로 이미지 추출 → 검토
3. **이미지 비율 검증**: python-pptx로 배치 좌표 추출, 원본 비율과 비교

```python
from pptx import Presentation
prs = Presentation("output.pptx")
for slide in prs.slides:
    for shape in slide.shapes:
        if shape.shape_type == 13:  # Picture
            w = shape.width / 914400
            h = shape.height / 914400
            print(f"Image: {w:.2f}x{h:.2f}, ratio={w/h:.4f}")
```

## pptxgenjs 주의사항

- 색상 코드에 `#` 붙이지 않기 (pptxgenjs 규칙)
- `breakLine: true`로 줄바꿈
- 불릿은 `bullet: true` 옵션 사용
- 옵션 객체를 재사용하지 않기 (매번 새 객체 생성)
- `margin: 0` 설정하여 텍스트 박스 패딩 제거
- `lineSpacingMultiple: 1.3~1.5` 으로 가독성 확보
- `pres.shapes.RECTANGLE` 대신 `"rect"` 문자열 사용 가능

## 참고 파일

- `references/layout-patterns.md` — 각 레이아웃의 전체 코드 예시
- `references/pptxgenjs-reference.js` — 실제 프로젝트에서 사용된 전체 스크립트 (10슬라이드)
- `assets/` — 로고 PNG 파일
