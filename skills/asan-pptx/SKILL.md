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
| **primary** | `0C598E` | 메인 블루 — 헤더 바, 제목, 테이블 헤더, 좌측 바 |
| **primaryLight** | `438FD5` | 보조 블루 — 강조, 카드 상단, 보조 섹션 |
| **primaryDark** | `004074` | 진한 블루 — 표지/마지막 슬라이드 배경 |
| **secondary** | `00696D` | 틸 — 보조 강조, 결론 텍스트, 포커스 섹션 |
| **secondaryLight** | `00A0A8` | 밝은 틸 |
| **accent** | `F68B1E` | 오렌지 — 강조선, 포인트, QA/게이트 섹션 |
| **accentRed** | `E8453C` | 레드 — 경고, 문제 강조, 리스크 |
| **accentSky** | `00C4DE` | 하늘색 — 다크 배경 위 부제목/패널 제목 |
| **textDark** | `404040` | 본문 텍스트 (기본) |
| **textMid** | `666666` | 보조 텍스트, 캡션 |
| **white** | `FFFFFF` | 배경, 헤더 바 텍스트 |
| **bgSubtle** | `F5F7FA` | 콘텐츠 박스 배경 |
| **tableAlt** | `EBF2F8` | 테이블 교대 행 |
| **divider** | `D0D8E0` | 구분선 |

## 폰트

모든 텍스트에 **Pretendard** 사용.
Pretendard가 시스템에 없으면 **Noto Sans KR** 또는 **Arial**로 대체.

## 타이포그래피 (Dense System)

콘텐츠 밀도를 높이는 압축 레이아웃 기준. 슬라이드 당 최대 정보량 전달.

| 요소 | fontSize | bold | color | lineSpacing |
|------|----------|------|-------|-------------|
| 표지 제목 | 28–30 | O | white | 1.04 |
| 표지 부제목 | 12–13 | X | accentSky | — |
| 표지 발표자 | 10 | X | AACCDD | — |
| 헤더 바 제목 | 11 | O | white | — |
| 섹션 라벨 (박스 제목) | 10 | O | barColor | — |
| 본문 | 9 | X | textDark | 1.18 |
| 본문 (소) | 8 | X | textDark | 1.15 |
| 테이블 헤더 | 9 | O | white | — |
| 테이블 본문 | 9 | X | textDark | — |
| 다이어그램 박스 | 9 | X | textDark | 1.10 |
| 캡션/각주 | 8 | X | textMid | — |
| 배지 라벨 | 7 | O | white | — |
| 페이지 번호 | 7 | X | 999999 | — |

## 로고

스킬 `assets/` 폴더에 두 버전의 로고:

- **`Asan_Medical_Center_logo_transparent.png`**: 표준 로고 (투명 배경)
- **`Asan_Medical_Center_logo_w.png`**: 흰색 텍스트 로고 — 블루 헤더 바, 다크 배경에 사용

로고 크기 가이드 (Dense):
- 헤더 바 (우측): w=0.88, h=0.26
- 표지 슬라이드 (우측 상단): w=1.40, h=0.42
- 마지막 슬라이드 (하단 우측): w=1.40, h=0.42

로고 경로 설정:
```javascript
const SKILL_DIR = path.resolve(process.env.HOME, '.skills/skills/asan-pptx');
// 또는 프로젝트별: path.resolve('.claude/skills/asan-pptx')
const LOGO = path.resolve(SKILL_DIR, 'assets/Asan_Medical_Center_logo_transparent.png');
const LOGO_W = path.resolve(SKILL_DIR, 'assets/Asan_Medical_Center_logo_w.png');
```

## pptxgenjs 기본 설정

```javascript
const pptxgen = require('pptxgenjs');
const path = require('path');

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';  // 10" x 5.625"
pres.author = '발표자 이름';
pres.title = '프레젠테이션 제목';
```

## 레이아웃 상수 (Dense System)

```javascript
const FONT = 'Pretendard';
const SLIDE_W = 10;
const SLIDE_H = 5.625;

const LAYOUT = {
  header: { h: 0.34, titleFontSize: 11, logoW: 0.88, logoH: 0.26 },
  page: { fontSize: 7 },
  margin: { outer: 0.28, gutter: 0.18, top: 0.52, bottom: 0.08 },
  col: {},
  contentH: 0,
};

// 2-column grid 계산
const contentW = SLIDE_W - LAYOUT.margin.outer * 2;
const colW = (contentW - LAYOUT.margin.gutter) / 2;
LAYOUT.col = {
  L: { x: LAYOUT.margin.outer, w: colW },             // x=0.28, w=4.63
  R: { x: LAYOUT.margin.outer + colW + LAYOUT.margin.gutter, w: colW }, // x=5.09, w=4.63
  y: LAYOUT.margin.top,                                 // y=0.52
};
LAYOUT.contentH = SLIDE_H - LAYOUT.margin.top - LAYOUT.margin.bottom; // 5.025
```

## 폰트 프리셋

```javascript
const F = {
  sectionLabel: { fontSize: 10, fontFace: FONT, bold: true },
  body:         { fontSize: 9,  fontFace: FONT, lineSpacingMultiple: 1.18 },
  bodySmall:    { fontSize: 8,  fontFace: FONT, lineSpacingMultiple: 1.15 },
  tableHeader:  { fontSize: 9,  fontFace: FONT, bold: true },
  tableBody:    { fontSize: 9,  fontFace: FONT },
  diagramBox:   { fontSize: 9,  fontFace: FONT, lineSpacingMultiple: 1.10 },
};
```

## 헬퍼 함수 (Dense System)

### addHeader — 압축 헤더 바

```javascript
function addHeader(slide, title) {
  const h = LAYOUT.header;
  slide.addShape('rect', {
    x: 0, y: 0, w: SLIDE_W, h: h.h,
    fill: { color: C.primary },
  });
  slide.addText(title, {
    x: LAYOUT.margin.outer, y: 0.04,
    w: SLIDE_W - h.logoW - LAYOUT.margin.outer - 0.3,
    h: h.h - 0.06,
    fontSize: h.titleFontSize, fontFace: FONT,
    color: C.white, bold: true, margin: 0,
  });
  slide.addImage({
    path: LOGO_W,
    x: SLIDE_W - h.logoW - LAYOUT.margin.outer + 0.05,
    y: 0.04, w: h.logoW, h: h.logoH,
  });
}
```

### addPage — 페이지 번호

```javascript
function addPage(slide, n) {
  slide.addText(String(n), {
    x: SLIDE_W - 0.7, y: SLIDE_H - 0.24, w: 0.5, h: 0.18,
    fontSize: LAYOUT.page.fontSize, fontFace: FONT,
    color: '999999', align: 'right', margin: 0,
  });
}
```

### box — 콘텐츠 박스 (좌측 색상 바)

bgSubtle 배경 + 좌측 색상 바 + 선택적 제목 + 줄바꿈 본문. 하단 y 좌표를 반환하여 연속 배치 가능.

```javascript
function box(slide, x, y, w, h, title, lines, barColor) {
  const bc = barColor || C.primary;
  const barW = 0.045;
  const padX = 0.14;
  const padY = 0.08;
  const titleH = title ? 0.20 : 0;
  const titleGap = title ? 0.04 : 0;

  slide.addShape('rect', { x, y, w, h, fill: { color: C.bgSubtle } });
  slide.addShape('rect', { x, y, w: barW, h, fill: { color: bc } });

  if (title) {
    slide.addText(title, {
      x: x + padX, y: y + padY, w: w - padX - 0.06, h: titleH,
      ...F.sectionLabel, color: bc, margin: 0,
    });
  }

  const textY = y + padY + titleH + titleGap;
  const textH = h - padY * 2 - titleH - titleGap;
  if (lines && lines.length > 0) {
    slide.addText(lines.join('\n'), {
      x: x + padX, y: textY, w: w - padX - 0.06, h: textH,
      ...F.body, color: C.textDark, margin: 0, valign: 'top',
    });
  }

  return y + h;
}
```

### miniTable — 압축 테이블

```javascript
function miniTable(slide, x, y, w, colWidths, rows, opts) {
  const hdr = { fill: { color: C.primary }, color: C.white, ...F.tableHeader };
  const bodyStyle = { ...F.tableBody, color: C.textDark };
  const altStyle  = { ...bodyStyle, fill: { color: C.tableAlt } };

  const trows = rows.map((r, i) =>
    r.map((cell) => {
      const isH = i === 0;
      const style = isH ? hdr : (i % 2 === 0 ? altStyle : bodyStyle);
      return { text: String(cell), options: { ...style, align: 'left' } };
    })
  );

  slide.addTable(trows, {
    x, y, w, colW: colWidths,
    border: { pt: 0.4, color: 'DDDDDD' },
    margin: [2, 4, 2, 4],
    ...(opts || {}),
  });

  const estH = 0.24 + (rows.length - 1) * 0.22;
  return y + estH;
}
```

### workflowDiagram — 수직 플로우차트

```javascript
function workflowDiagram(slide, x, y, w, steps) {
  const boxH = 0.52;
  const gap = 0.16;
  const barW = 0.045;

  steps.forEach((step, i) => {
    const yy = y + i * (boxH + gap);
    slide.addShape('roundRect', {
      x, y: yy, w, h: boxH,
      fill: { color: C.bgSubtle },
      line: { color: step.color || C.primary, width: 0.8 },
      rectRadius: 0.04,
    });
    slide.addShape('rect', {
      x, y: yy, w: barW, h: boxH,
      fill: { color: step.color || C.primary },
    });
    slide.addText(step.text, {
      x: x + 0.12, y: yy + 0.04, w: w - 0.18, h: boxH - 0.08,
      ...F.diagramBox, color: C.textDark, margin: 0, valign: 'middle',
    });
    if (i < steps.length - 1) {
      const ax = x + w / 2;
      const ay1 = yy + boxH;
      slide.addShape('line', {
        x: ax, y: ay1, w: 0, h: gap - 0.02,
        line: { color: step.color || C.primary, width: 1.5, endArrowType: 'triangle' },
      });
    }
  });

  return y + steps.length * boxH + (steps.length - 1) * gap;
}
```

### badge — 라벨 배지

```javascript
function badge(slide, x, y, label, color) {
  const bw = label.length * 0.065 + 0.16;
  slide.addShape('roundRect', {
    x, y, w: bw, h: 0.20,
    fill: { color: color || C.primary }, rectRadius: 0.04,
  });
  slide.addText(label, {
    x, y, w: bw, h: 0.20,
    fontSize: 7, fontFace: FONT, color: C.white, bold: true,
    align: 'center', valign: 'middle', margin: 0,
  });
}
```

### divider — 수평 구분선

```javascript
function divider(slide, x, y, w) {
  slide.addShape('line', {
    x, y, w, h: 0,
    line: { color: C.divider, width: 0.5 },
  });
}
```

### checklistTable — 체크리스트 테이블

```javascript
function checklistTable(slide, x, y, w, items, headerLabel) {
  const rows = [[headerLabel || 'Check', 'Item']];
  items.forEach(it => rows.push(['', it]));
  return miniTable(slide, x, y, w, [0.40, w - 0.40], rows);
}
```

## 레이아웃 패턴

자세한 코드 예시는 `references/layout-patterns.md`를 참조.

### 1. 표지 슬라이드 (Title Cover)
- 배경: primaryDark + primary 오버레이 (transparency: 28)
- 오렌지 강조선 (0.05" 높이, x=0.6)
- 대형 제목 (28–30pt white bold, lineSpacing: 1.04)
- 부제목 (13pt accentSky)
- 발표자 정보 (10pt "AACCDD")
- 로고: LOGO_W, 우측 상단 (w=1.40, h=0.42)
- 선택: 우측에 키 팩트 박스 (roundRect + accentSky border)

### 2. 2-Column 콘텐츠 슬라이드
- 배경: white
- addHeader()로 상단 블루 바 (h=0.34)
- 좌측: box() 스택 (y=0.52부터, 간격 0.10)
- 우측: miniTable() + box() 조합
- addPage()로 페이지 번호

### 3. 워크플로우 슬라이드
- 좌: box() 설명 스택
- 우: workflowDiagram() 수직 플로우차트
- 하단 보충 box()

### 4. 테이블 중심 슬라이드
- miniTable() 활용, 좌우 분할 또는 전체 너비
- badge()로 항목 강조

### 5. 다크 배경 마무리 슬라이드
- 배경: primaryDark + primary 오버레이
- 제목: white bold
- 좌우 패널: box() 변형 (배경색을 primaryDark/accentSky로)
- 로고: LOGO_W, 하단 우측

## 이미지 비율 보존 (중요!)

차트나 그래프 삽입 시 반드시 원본 가로/세로 비율을 유지.

```python
from PIL import Image
im = Image.open("chart.png")
w, h = im.size
ratio = w / h
```

```javascript
const imgRatio = origW / origH;
const maxH = LAYOUT.contentH;  // 5.025
const maxW = contentW;          // 9.44

let dispW, dispH;
if (maxH * imgRatio <= maxW) {
  dispH = maxH; dispW = maxH * imgRatio;
} else {
  dispW = maxW; dispH = maxW / imgRatio;
}
const x = (SLIDE_W - dispW) / 2;

slide.addImage({ path: imagePath, x, y: LAYOUT.col.y, w: dispW, h: dispH });
```

## QA 프로세스

1. **텍스트 검증**: `python -m markitdown output.pptx`
2. **시각적 검증**: LibreOffice → PDF → pdftoppm → 이미지 검토
3. **폰트 크기 검증**: python-pptx로 모든 텍스트 런의 fontSize 추출, 최대값이 30pt 이하인지 확인
4. **이미지 비율 검증**: python-pptx로 배치 좌표 추출, 원본 비율과 비교

```python
from pptx import Presentation
prs = Presentation("output.pptx")
for slide_num, slide in enumerate(prs.slides, 1):
    for shape in slide.shapes:
        if shape.has_text_frame:
            for para in shape.text_frame.paragraphs:
                for run in para.runs:
                    if run.font.size:
                        pt = run.font.size.pt
                        if pt > 14:
                            print(f"WARN: Slide {slide_num} font={pt}pt text='{run.text[:40]}'")
        if shape.shape_type == 13:  # Picture
            w = shape.width / 914400
            h = shape.height / 914400
            print(f"Image: {w:.2f}x{h:.2f}, ratio={w/h:.4f}")
```

## pptxgenjs 주의사항

- 색상 코드에 `#` 붙이지 않기
- **둥근 사각형은 반드시 `'roundRect'` 사용** (`'roundedRect'`는 OOXML 비표준 → PowerPoint 복구 오류 발생)
- `breakLine: true`로 줄바꿈
- 불릿은 `bullet: true` 옵션 사용
- 옵션 객체를 재사용하지 않기 (매번 새 객체 생성)
- `margin: 0` 설정하여 텍스트 박스 패딩 제거
- `lineSpacingMultiple` 설정으로 가독성 확보 (dense: 1.10~1.18)
- `"rect"` 문자열로 도형 생성 가능
- 빈 `<a:ln></a:ln>` 태그가 생성될 수 있으므로 후처리 패치 필수

## 참고 파일

- `references/layout-patterns.md` — 각 레이아웃의 전체 코드 예시 (Dense System)
- `references/pptxgenjs-reference.js` — 실제 Dense System 전체 스크립트 레퍼런스
- `assets/` — 로고 PNG 파일
