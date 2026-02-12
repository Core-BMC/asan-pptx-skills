# Asan PPT Layout Patterns — 코드 예시

각 레이아웃 패턴의 전체 pptxgenjs 코드. SKILL.md의 헬퍼 함수(C, addHeaderBar, addPageNum, makeStatCard, addSectionNumber)가 이미 정의되어 있다고 가정한다.

---

## 1. 표지 슬라이드 (Title Slide)

다크 블루 배경에 대형 제목, 오렌지 강조선, 부제목, 발표자 정보.

```javascript
let s1 = pres.addSlide();
s1.background = { color: C.primaryDark };
// 블루 오버레이
s1.addShape("rect", {
  x: 0, y: 0, w: 10, h: 5.625,
  fill: { color: C.primary, transparency: 30 },
});
// 오렌지 강조선
s1.addShape("rect", {
  x: 0.8, y: 1.6, w: 1.2, h: 0.06,
  fill: { color: C.accent },
});
// 메인 제목
s1.addText("프레젠테이션\n제목을 입력", {
  x: 0.8, y: 1.8, w: 8.4, h: 2.2,
  fontSize: 40, fontFace: "Pretendard",
  color: C.white, bold: true, margin: 0,
  lineSpacingMultiple: 1.1,
});
// 부제목
s1.addText("부제목 또는 세부 설명", {
  x: 0.8, y: 4.0, w: 8.4, h: 0.5,
  fontSize: 18, fontFace: "Pretendard",
  color: C.accentSky, margin: 0,
});
// 발표자 정보
s1.addText("발표자  |  소속  |  날짜", {
  x: 0.8, y: 4.7, w: 8.4, h: 0.4,
  fontSize: 13, fontFace: "Pretendard",
  color: "AACCDD", margin: 0,
});
// 로고 (흰색 버전)
s1.addImage({
  path: LOGO_W, x: 8.0, y: 0.3, w: 1.5, h: 0.46,
});
```

---

## 2. 통계 카드 + 정보 박스

상단에 4개 메트릭 카드, 하단에 정보 박스(좌측 색상 바).

```javascript
let s2 = pres.addSlide();
s2.background = { color: C.white };
addHeaderBar(s2, "Study Overview");

// 4개 통계 카드
const stats = [
  { val: "1,823", label: "Total Patients", color: C.primary },
  { val: "1,748", label: "pTNM Available", color: C.primaryLight },
  { val: "1,250", label: "cTNM Available", color: C.secondary },
  { val: "1,175", label: "Both Available", color: C.secondaryLight },
];
stats.forEach((s, i) => {
  makeStatCard(s2, 0.4 + i * 2.35, 0.95, 2.15, s.val, s.label, s.color);
});

// 정보 박스 (bgSubtle 배경 + 좌측 primary 바)
s2.addShape("rect", {
  x: 0.4, y: 2.45, w: 9.2, h: 2.95,
  fill: { color: C.bgSubtle },
});
s2.addShape("rect", {
  x: 0.4, y: 2.45, w: 0.06, h: 2.95,
  fill: { color: C.primary },
});

// 정보 항목 (라벨 + 설명)
const items = [
  { label: "항목 1:", text: "설명 텍스트" },
  { label: "항목 2:", text: "설명 텍스트" },
];
items.forEach((item, i) => {
  const yBase = 2.65 + i * 0.68;
  s2.addText(item.label, {
    x: 0.75, y: yBase, w: 2, h: 0.28,
    fontSize: 13, fontFace: "Pretendard",
    color: C.primary, bold: true, margin: 0,
  });
  s2.addText(item.text, {
    x: 0.75, y: yBase + 0.28, w: 8.5, h: 0.3,
    fontSize: 12, fontFace: "Pretendard",
    color: C.textDark, margin: 0,
  });
});
addPageNum(s2, 2);
```

---

## 3. 통계 카드 + 차트 이미지

상단 카드 4개 + 하단에 이미지(비율 보존 필수).

```javascript
let s3 = pres.addSlide();
s3.background = { color: C.white };
addHeaderBar(s3, "Performance Metrics");

const metrics = [
  { val: "0.989", label: "Accuracy", color: C.primary },
  { val: "0.969", label: "Precision", color: C.primaryLight },
  { val: "0.984", label: "Recall", color: C.secondary },
  { val: "0.976", label: "F1 Score", color: C.accent },
];
metrics.forEach((s, i) => {
  makeStatCard(s3, 0.4 + i * 2.35, 0.85, 2.15, s.val, s.label, s.color);
});

// 차트 이미지 (비율 보존!)
// 원본 이미지가 4773x2007 (ratio 2.378)인 경우:
s3.addImage({
  path: "chart.png",
  x: 1.55, y: 2.2, w: 6.90, h: 2.90,  // 비율 2.379 ≈ 2.378 ✓
});
addPageNum(s3, 3);
```

---

## 4. 좌우 패널 (분석/비교)

좌/우 각각 bgSubtle 배경 + 좌측 색상 바 + 제목 + 본문.

```javascript
let s4 = pres.addSlide();
s4.background = { color: C.white };
addHeaderBar(s4, "Analysis");

// 좌측 패널
s4.addShape("rect", {
  x: 0.4, y: 0.85, w: 4.35, h: 2.35,
  fill: { color: C.bgSubtle },
});
s4.addShape("rect", {
  x: 0.4, y: 0.85, w: 0.06, h: 2.35,
  fill: { color: C.accentRed },  // 문제점은 red, 해결책은 secondary 등
});
s4.addText("문제점", {
  x: 0.7, y: 0.95, w: 3.8, h: 0.35,
  fontSize: 16, fontFace: "Pretendard",
  color: C.accentRed, bold: true, margin: 0,
});
s4.addText([
  { text: "항목 1", options: { bold: true, breakLine: true } },
  { text: "항목 2", options: { breakLine: true } },
  { text: "항목 3" },
], {
  x: 0.7, y: 1.4, w: 3.9, h: 1.6,
  fontSize: 11.5, fontFace: "Pretendard",
  color: C.textDark, margin: 0,
  lineSpacingMultiple: 1.5,
});

// 우측 패널
s4.addShape("rect", {
  x: 5.0, y: 0.85, w: 4.6, h: 2.35,
  fill: { color: C.bgSubtle },
});
s4.addShape("rect", {
  x: 5.0, y: 0.85, w: 0.06, h: 2.35,
  fill: { color: C.secondary },
});
s4.addText("해결방안", {
  x: 5.3, y: 0.95, w: 4, h: 0.35,
  fontSize: 16, fontFace: "Pretendard",
  color: C.secondary, bold: true, margin: 0,
});
s4.addText([
  { text: "방안 1", options: { bullet: true, breakLine: true } },
  { text: "방안 2", options: { bullet: true, breakLine: true } },
  { text: "방안 3", options: { bullet: true } },
], {
  x: 5.3, y: 1.4, w: 4.1, h: 1.6,
  fontSize: 11.5, fontFace: "Pretendard",
  color: C.textDark, margin: 0,
  lineSpacingMultiple: 1.5,
});
addPageNum(s4, 4);
```

---

## 5. 테이블 슬라이드

헤더: primary 배경 + 흰 텍스트, 교대 행: tableAlt.

```javascript
let s5 = pres.addSlide();
s5.background = { color: C.white };
addHeaderBar(s5, "Comparison Table");

const headerOpts = {
  fill: { color: C.tableHeader }, color: C.white,
  bold: true, fontSize: 11, fontFace: "Pretendard",
};
const bodyOpts = { fontSize: 11, fontFace: "Pretendard" };
const altOpts = { ...bodyOpts, fill: { color: C.tableAlt } };

const rows = [
  // 헤더
  [
    { text: "항목", options: headerOpts },
    { text: "값 A", options: { ...headerOpts, align: "center" } },
    { text: "값 B", options: { ...headerOpts, align: "center" } },
  ],
  // 데이터 행
  [
    { text: "행 1", options: bodyOpts },
    { text: "0.95", options: { ...bodyOpts, align: "center" } },
    { text: "0.92", options: { ...bodyOpts, align: "center" } },
  ],
  [
    { text: "행 2", options: altOpts },
    { text: "0.88", options: { ...altOpts, align: "center" } },
    { text: "0.85", options: { ...altOpts, align: "center" } },
  ],
];

s5.addTable(rows, {
  x: 0.4, y: 0.85, w: 9.2,
  colW: [3.0, 3.1, 3.1],
  border: { pt: 0.5, color: "DDDDDD" },
  margin: [4, 6, 4, 6],
});
addPageNum(s5, 5);
```

---

## 6. 전체 화면 차트 이미지

헤더 바 바로 아래에 이미지가 최대한 크게 배치. 비율 보존 필수.

```javascript
let s6 = pres.addSlide();
s6.background = { color: C.white };
addHeaderBar(s6, "Chart Title");

// 이미지 비율 계산 후 배치
// 예: 4960x4422 (ratio 1.122, 거의 정사각형)
const imgRatio = 1.122;
const maxH = 4.50;  // y=0.8 ~ y=5.3
const dispH = maxH;
const dispW = dispH * imgRatio;  // 5.05
const x = (10 - dispW) / 2;     // 2.48

s6.addImage({
  path: "combined_chart.png",
  x: x, y: 0.8, w: dispW, h: dispH,
});
addPageNum(s6, 6);
```

---

## 7. 다크 배경 마무리 슬라이드 (Discussion/Closing)

좌우 패널에 헤더 바(panelDark) + 본문(panelBody). 표지와 같은 다크 블루 배경.

```javascript
let s10 = pres.addSlide();
s10.background = { color: C.primaryDark };
s10.addShape("rect", {
  x: 0, y: 0, w: 10, h: 5.625,
  fill: { color: C.primary, transparency: 30 },
});

s10.addText("Discussion & Next Steps", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Pretendard",
  color: C.white, bold: true, margin: 0,
});

// ── 좌측 패널 ──
// 패널 배경
s10.addShape("rect", {
  x: 0.4, y: 1.1, w: 4.35, h: 3.55,
  fill: { color: "1A6A9C", transparency: 20 },
});
// 패널 헤더 바 (진한 블루)
s10.addShape("rect", {
  x: 0.4, y: 1.1, w: 4.35, h: 0.75,
  fill: { color: "0A4D78" },
  line: { width: 0 },
});
// 패널 제목
s10.addText("Discussion Points", {
  x: 0.65, y: 1.25, w: 3.8, h: 0.4,
  fontSize: 16, fontFace: "Pretendard",
  color: C.accentSky, bold: true, margin: 0,
});
// 패널 본문
s10.addText([
  { text: "항목 1", options: { bullet: true, breakLine: true } },
  { text: "항목 2", options: { bullet: true, breakLine: true } },
  { text: "항목 3", options: { bullet: true } },
], {
  x: 0.65, y: 2.05, w: 3.9, h: 2.61,
  fontSize: 12, fontFace: "Pretendard",
  color: C.white, margin: 0,
  lineSpacingMultiple: 1.5,
});

// ── 우측 패널 ── (동일 구조, x 좌표만 다름)
s10.addShape("rect", {
  x: 5.1, y: 1.1, w: 4.5, h: 3.55,
  fill: { color: "1A6A9C", transparency: 20 },
});
s10.addShape("rect", {
  x: 5.1, y: 1.1, w: 4.5, h: 0.75,
  fill: { color: "0A4D78" },
  line: { width: 0 },
});
s10.addText("Next Steps", {
  x: 5.35, y: 1.25, w: 4, h: 0.4,
  fontSize: 16, fontFace: "Pretendard",
  color: C.accentSky, bold: true, margin: 0,
});
s10.addText([
  { text: "항목 1", options: { bullet: true, breakLine: true } },
  { text: "항목 2", options: { bullet: true, breakLine: true } },
  { text: "항목 3", options: { bullet: true } },
], {
  x: 5.35, y: 2.05, w: 4.05, h: 2.61,
  fontSize: 12, fontFace: "Pretendard",
  color: C.white, margin: 0,
  lineSpacingMultiple: 1.5,
});

// 로고 (흰색, 하단 우측)
s10.addImage({
  path: LOGO_W, x: 7.93, y: 5.0, w: 1.67, h: 0.47,
});
```

---

## 결론 박스 (Conclusion Box)

패널 하단에 상단 accent 색상 바 + 결론 텍스트. 좌우 패널이나 하단 영역에 배치.

```javascript
// 결론 박스
slide.addShape("rect", {
  x: 5.0, y: 3.35, w: 4.6, h: 1.8,
  fill: { color: C.bgSubtle },
});
slide.addShape("rect", {
  x: 5.0, y: 3.35, w: 4.6, h: 0.06,
  fill: { color: C.accent },
});
slide.addText([
  { text: "Conclusion: ", options: { color: C.secondary, bold: true } },
  { text: "결론 내용을 여기에 작성" },
], {
  x: 5.2, y: 3.55, w: 4.2, h: 1.4,
  fontSize: 12, fontFace: "Pretendard",
  color: C.textDark, margin: 0,
  lineSpacingMultiple: 1.4,
});
```
