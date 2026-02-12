const pptxgen = require("pptxgenjs");
const path = require("path");

// ===== ASAN MEDICAL CENTER STYLE =====
const C = {
  primary: "0C598E",
  primaryLight: "438FD5",
  primaryDark: "004074",
  secondary: "00696D",
  secondaryLight: "00A0A8",
  accent: "F68B1E",
  accentRed: "E8453C",
  accentSky: "00C4DE",
  textDark: "404040",
  textBlack: "000000",
  white: "FFFFFF",
  bgSubtle: "F5F7FA",
  bgCard: "F0F4F8",
  tableHeader: "0C598E",
  tableAlt: "EBF2F8",
};

const LOGO = path.resolve("mnt/CRC-TNM-Manuscript/Asan_Medical_Center_logo_transparent.png");
const LOGO_W = path.resolve("mnt/CRC-TNM-Manuscript/Asan_Medical_Center_logo_w.png");
const IMG_DIR = path.resolve(".");

// ===== HELPERS =====
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

function addPageNum(slide, num) {
  slide.addText(String(num), {
    x: 9.2, y: 5.25, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Pretendard",
    color: "999999", align: "right", margin: 0,
  });
}

function makeStatCard(slide, x, y, w, value, label, topColor) {
  slide.addShape("rect", {
    x, y, w, h: 1.15,
    fill: { color: C.white },
    shadow: { type: "outer", color: "000000", blur: 4, offset: 2, angle: 135, opacity: 0.08 },
  });
  slide.addShape("rect", {
    x, y, w, h: 0.06,
    fill: { color: topColor || C.primary },
  });
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

// ===== PRESENTATION =====
let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Hwon Heo";
pres.title = "LLM-Based Automated TNM Staging in Colorectal Cancer";

// ─────────────────────────────────────
// SLIDE 1: Title Slide
// ─────────────────────────────────────
let s1 = pres.addSlide();
s1.background = { color: C.primaryDark };
// Overlay gradient effect
s1.addShape("rect", {
  x: 0, y: 0, w: 10, h: 5.625,
  fill: { color: C.primary, transparency: 30 },
});
// Accent line
s1.addShape("rect", {
  x: 0.8, y: 1.6, w: 1.2, h: 0.06,
  fill: { color: C.accent },
});
// Main title
s1.addText("LLM-Based Automated\nTNM Staging\nin Colorectal Cancer", {
  x: 0.8, y: 1.8, w: 8.4, h: 2.2,
  fontSize: 40, fontFace: "Pretendard",
  color: C.white, bold: true, margin: 0,
  lineSpacingMultiple: 1.1,
});
// Subtitle
s1.addText("pTNM Performance Analysis & Discussion Points", {
  x: 0.8, y: 4.0, w: 8.4, h: 0.5,
  fontSize: 18, fontFace: "Pretendard",
  color: C.accentSky, margin: 0,
});
// Author info
s1.addText("Hwon Heo, PhD  |  BMC AI  |  Asan Medical Center  |  Feb 2026", {
  x: 0.8, y: 4.7, w: 8.4, h: 0.4,
  fontSize: 13, fontFace: "Pretendard",
  color: "AACCDD", margin: 0,
});
// Logo (white version on dark bg, reduced size)
s1.addImage({
  path: LOGO_W, x: 8.0, y: 0.3, w: 1.5, h: 0.46,
});

// ─────────────────────────────────────
// SLIDE 2: Study Overview
// ─────────────────────────────────────
let s2 = pres.addSlide();
s2.background = { color: C.white };
addHeaderBar(s2, "Study Overview");

// 4 stat cards
const stats = [
  { val: "1,823", label: "Total Patients", color: C.primary },
  { val: "1,748", label: "pTNM Available", color: C.primaryLight },
  { val: "1,250", label: "cTNM Available", color: C.secondary },
  { val: "1,175", label: "Both Available", color: C.secondaryLight },
];
stats.forEach((s, i) => {
  makeStatCard(s2, 0.4 + i * 2.35, 0.95, 2.15, s.val, s.label, s.color);
});

// Info box
s2.addShape("rect", {
  x: 0.4, y: 2.45, w: 9.2, h: 2.95,
  fill: { color: C.bgSubtle },
});
s2.addShape("rect", {
  x: 0.4, y: 2.45, w: 0.06, h: 2.95,
  fill: { color: C.primary },
});

const infoItems = [
  { label: "Model:", text: "Qwen3-30B-A3B (MoE, ~3.3B active params)" },
  { label: "Infrastructure:", text: "On-premise, 3x NVIDIA RTX A5000 (3x 24 GB), Ollama API" },
  { label: "Architecture:", text: "Modular multi-agent pipeline — dedicated T, N, M agents with selective thinking mode" },
  { label: "Staging:", text: "AJCC 8th edition, rule-based stage integration (pT+pN + max(pM,cM))" },
];

infoItems.forEach((item, i) => {
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

// ─────────────────────────────────────
// SLIDE 3: Pathologic T Category Performance
// ─────────────────────────────────────
let s3 = pres.addSlide();
s3.background = { color: C.white };
addHeaderBar(s3, "Pathologic T Category Performance");

const tStats = [
  { val: "0.989", label: "Accuracy", color: C.primary },
  { val: "0.969", label: "Macro Precision", color: C.primaryLight },
  { val: "0.984", label: "Macro Recall", color: C.secondary },
  { val: "0.976", label: "Macro F1", color: C.accent },
];
tStats.forEach((s, i) => {
  makeStatCard(s3, 0.4 + i * 2.35, 0.85, 2.15, s.val, s.label, s.color);
});

// Chart image (4773x2007, ratio 2.378 — fit to available height, centered)
s3.addImage({
  path: path.join(IMG_DIR, "image1.png"),
  x: 1.55, y: 2.2, w: 6.90, h: 2.90,
});
addPageNum(s3, 3);

// ─────────────────────────────────────
// SLIDE 4: T Category Impact of T0/Tis
// ─────────────────────────────────────
let s4 = pres.addSlide();
s4.background = { color: C.white };
addHeaderBar(s4, "T Category: Impact of T0/Tis");

// Left panel - T0
s4.addShape("rect", {
  x: 0.4, y: 0.85, w: 4.35, h: 2.3,
  fill: { color: C.bgSubtle },
});
s4.addShape("rect", {
  x: 0.4, y: 0.85, w: 0.06, h: 2.3,
  fill: { color: C.accent },
});

s4.addText("T0 (n=145)", {
  x: 0.7, y: 0.95, w: 3.8, h: 0.35,
  fontSize: 15, fontFace: "Pretendard",
  color: C.textBlack, bold: true, margin: 0,
});
s4.addText([
  { text: "All 145 cases: prior procedure \u2192 2nd surgery (s/p)", options: { breakLine: true } },
  { text: "EMR(76), polypectomy(25), ESD(18), nCRT(16)", options: { breakLine: true } },
  { text: "4 cases misclassified as Tis", options: { color: C.accentRed, bold: true, breakLine: true } },
  { text: "\u2192 T0 recall = 0.9655 (clinically non-significant)" },
], {
  x: 0.7, y: 1.35, w: 3.9, h: 1.6,
  fontSize: 11, fontFace: "Pretendard",
  color: C.textDark, margin: 0,
  lineSpacingMultiple: 1.5,
});

// Left panel - Tis
s4.addShape("rect", {
  x: 0.4, y: 3.35, w: 4.35, h: 1.8,
  fill: { color: C.bgSubtle },
});
s4.addShape("rect", {
  x: 0.4, y: 3.35, w: 0.06, h: 1.8,
  fill: { color: C.secondary },
});

s4.addText("Tis (n=24)", {
  x: 0.7, y: 3.45, w: 3.8, h: 0.35,
  fontSize: 15, fontFace: "Pretendard",
  color: C.textBlack, bold: true, margin: 0,
});
s4.addText([
  { text: "All correctly classified (recall = 1.000)", options: { breakLine: true } },
  { text: "Precision = 0.857 (T0\u2192Tis FP)", options: { breakLine: true } },
  { text: "Adenocarcinoma in situ in adenoma" },
], {
  x: 0.7, y: 3.85, w: 3.9, h: 1.1,
  fontSize: 11, fontFace: "Pretendard",
  color: C.textDark, margin: 0,
  lineSpacingMultiple: 1.5,
});

// Right panel - Table
s4.addShape("rect", {
  x: 5.0, y: 0.85, w: 4.6, h: 2.3,
  fill: { color: C.bgSubtle },
});

s4.addText("Accuracy Impact", {
  x: 5.3, y: 0.95, w: 4, h: 0.35,
  fontSize: 15, fontFace: "Pretendard",
  color: C.textBlack, bold: true, margin: 0,
});

const tableRows = [
  [
    { text: "Scenario", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 11, fontFace: "Pretendard" } },
    { text: "Accuracy", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "\u0394", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 11, fontFace: "Pretendard", align: "center" } },
  ],
  [
    { text: "All (T0\u2013T4b)", options: { fontSize: 11, fontFace: "Pretendard" } },
    { text: "0.9886", options: { fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "\u2014", options: { fontSize: 11, fontFace: "Pretendard", align: "center" } },
  ],
  [
    { text: "Excl. Tis", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard" } },
    { text: "0.9907", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "+0.002", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard", align: "center" } },
  ],
  [
    { text: "Excl. T0+Tis", options: { fontSize: 11, fontFace: "Pretendard" } },
    { text: "0.9918", options: { fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "+0.003", options: { fontSize: 11, fontFace: "Pretendard", align: "center" } },
  ],
];
s4.addTable(tableRows, {
  x: 5.2, y: 1.4, w: 4.2,
  colW: [1.8, 1.2, 1.2],
  border: { pt: 0.5, color: "DDDDDD" },
  margin: [4, 6, 4, 6],
});

// Conclusion box
s4.addShape("rect", {
  x: 5.0, y: 3.35, w: 4.6, h: 1.8,
  fill: { color: C.bgSubtle },
});
s4.addShape("rect", {
  x: 5.0, y: 3.35, w: 4.6, h: 0.06,
  fill: { color: C.accent },
});

s4.addText([
  { text: "Conclusion: ", options: { color: C.secondary, bold: true } },
  { text: "Tis impact is minimal (+0.2%). T0\u2192Tis misclassification is clinically non-significant (both early/in-situ)." },
], {
  x: 5.2, y: 3.55, w: 4.2, h: 1.4,
  fontSize: 12, fontFace: "Pretendard",
  color: C.textDark, margin: 0,
  lineSpacingMultiple: 1.4,
});
addPageNum(s4, 4);

// ─────────────────────────────────────
// SLIDE 5: Pathologic N Category Performance
// ─────────────────────────────────────
let s5 = pres.addSlide();
s5.background = { color: C.white };
addHeaderBar(s5, "Pathologic N Category Performance");

// Chart image (4472x3263, ratio 1.371 — fit to available height, centered)
s5.addImage({
  path: path.join(IMG_DIR, "image2.png"),
  x: 1.92, y: 0.8, w: 6.17, h: 4.50,
});
addPageNum(s5, 5);

// ─────────────────────────────────────
// SLIDE 6: N Category N1c Classification Failure
// ─────────────────────────────────────
let s6 = pres.addSlide();
s6.background = { color: C.white };
addHeaderBar(s6, "N Category: N1c Classification Failure");

// Problem panel (left)
s6.addShape("rect", {
  x: 0.4, y: 0.85, w: 4.35, h: 2.35,
  fill: { color: C.bgSubtle },
});
s6.addShape("rect", {
  x: 0.4, y: 0.85, w: 0.06, h: 2.35,
  fill: { color: C.accentRed },
});

s6.addText("Problem", {
  x: 0.7, y: 0.95, w: 3.8, h: 0.35,
  fontSize: 16, fontFace: "Pretendard",
  color: C.accentRed, bold: true, margin: 0,
});
s6.addText([
  { text: "N1c (n=26): ALL classified as N0", options: { bold: true, breakLine: true } },
  { text: "Recall = 0.0 (26/26 misclassified)", options: { breakLine: true } },
  { text: "N1c = tumor deposits (+) but LN meta (\u2212)", options: { breakLine: true } },
  { text: "Model over-relies on '0/n lymph nodes \u2192 N0'" },
], {
  x: 0.7, y: 1.4, w: 3.9, h: 1.6,
  fontSize: 11.5, fontFace: "Pretendard",
  color: C.textDark, margin: 0,
  lineSpacingMultiple: 1.5,
});

// Solutions panel (right)
s6.addShape("rect", {
  x: 5.0, y: 0.85, w: 4.6, h: 2.35,
  fill: { color: C.bgSubtle },
});
s6.addShape("rect", {
  x: 5.0, y: 0.85, w: 0.06, h: 2.35,
  fill: { color: C.secondary },
});

s6.addText("Solutions", {
  x: 5.3, y: 0.95, w: 4, h: 0.35,
  fontSize: 16, fontFace: "Pretendard",
  color: C.secondary, bold: true, margin: 0,
});
s6.addText([
  { text: "Add tumor deposit extraction to prompt", options: { bullet: true, breakLine: true } },
  { text: "Rule-based post-processing: LN(\u2212) + TD(+) \u2192 N1c", options: { bullet: true, breakLine: true } },
  { text: "AJCC 9th: TD definition revision (Nagtegaal 2025)", options: { bullet: true } },
], {
  x: 5.3, y: 1.4, w: 4.1, h: 1.6,
  fontSize: 11.5, fontFace: "Pretendard",
  color: C.textDark, margin: 0,
  lineSpacingMultiple: 1.5,
});

// N Grouping Strategy table
s6.addShape("rect", {
  x: 0.4, y: 3.45, w: 9.2, h: 2.0,
  fill: { color: C.bgSubtle },
});

s6.addText("N Grouping Strategy Comparison", {
  x: 0.7, y: 3.55, w: 8, h: 0.35,
  fontSize: 14, fontFace: "Pretendard",
  color: C.textBlack, bold: true, margin: 0,
});

const nTableRows = [
  [
    { text: "Scenario", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 11, fontFace: "Pretendard" } },
    { text: "n", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "Accuracy", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "Macro F1", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 11, fontFace: "Pretendard", align: "center" } },
  ],
  [
    { text: "Full (incl. N1c + Nx)", options: { fontSize: 11, fontFace: "Pretendard" } },
    { text: "1,748", options: { fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "0.9754", options: { fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "0.9915", options: { fontSize: 11, fontFace: "Pretendard", align: "center" } },
  ],
  [
    { text: "Excl. Nx", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard" } },
    { text: "1,737", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "0.9816", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "0.9925", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard", align: "center" } },
  ],
  [
    { text: "Excl. Nx + N1c", options: { color: C.secondary, bold: true, fontSize: 11, fontFace: "Pretendard" } },
    { text: "1,711", options: { color: C.secondary, bold: true, fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "0.9965", options: { color: C.secondary, bold: true, fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "0.9950", options: { color: C.secondary, bold: true, fontSize: 11, fontFace: "Pretendard", align: "center" } },
  ],
  [
    { text: "Grouped N0/N1/N2", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard" } },
    { text: "1,737", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "0.9822", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard", align: "center" } },
    { text: "0.9831", options: { fill: { color: C.tableAlt }, fontSize: 11, fontFace: "Pretendard", align: "center" } },
  ],
];
s6.addTable(nTableRows, {
  x: 0.7, y: 3.95, w: 8.6,
  colW: [3.0, 1.4, 2.1, 2.1],
  border: { pt: 0.5, color: "DDDDDD" },
  margin: [4, 6, 4, 6],
});
addPageNum(s6, 6);

// ─────────────────────────────────────
// SLIDE 7: Pathologic M Category Performance
// ─────────────────────────────────────
let s7 = pres.addSlide();
s7.background = { color: C.white };
addHeaderBar(s7, "Pathologic M Category Performance");

// Chart image (4170x3388, ratio 1.231 — fit to available height, centered)
s7.addImage({
  path: path.join(IMG_DIR, "image3.png"),
  x: 2.23, y: 0.8, w: 5.54, h: 4.50,
});
addPageNum(s7, 7);

// ─────────────────────────────────────
// SLIDE 8: Combined pTNM Performance Summary
// ─────────────────────────────────────
let s8 = pres.addSlide();
s8.background = { color: C.white };
addHeaderBar(s8, "Combined pTNM Performance Summary");

// Chart image (4960x4422, ratio 1.122 — fit to available height, centered)
s8.addImage({
  path: path.join(IMG_DIR, "image4.png"),
  x: 2.48, y: 0.8, w: 5.05, h: 4.50,
});
addPageNum(s8, 8);

// ─────────────────────────────────────
// SLIDE 9: Comparison with Published Studies
// ─────────────────────────────────────
let s9 = pres.addSlide();
s9.background = { color: C.white };
addHeaderBar(s9, "Comparison with Published Studies");

const compHeader = [
  { text: "Study", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 10, fontFace: "Pretendard" } },
  { text: "Model", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 10, fontFace: "Pretendard" } },
  { text: "Cancer", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 10, fontFace: "Pretendard", align: "center" } },
  { text: "n", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 10, fontFace: "Pretendard", align: "center" } },
  { text: "T", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 10, fontFace: "Pretendard", align: "center" } },
  { text: "N", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 10, fontFace: "Pretendard", align: "center" } },
  { text: "M", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 10, fontFace: "Pretendard", align: "center" } },
  { text: "Key Feature", options: { fill: { color: C.tableHeader }, color: C.white, bold: true, fontSize: 10, fontFace: "Pretendard" } },
];

function compRow(study, model, cancer, n, t, nv, m, feat, highlight) {
  const opts = { fontSize: 10, fontFace: "Pretendard" };
  const hOpts = highlight ? { ...opts, color: C.primary, bold: true } : opts;
  return [
    { text: study, options: hOpts },
    { text: model, options: hOpts },
    { text: cancer, options: { ...hOpts, align: "center" } },
    { text: n, options: { ...hOpts, align: "center" } },
    { text: t, options: { ...hOpts, align: "center" } },
    { text: nv, options: { ...hOpts, align: "center" } },
    { text: m, options: { ...hOpts, align: "center" } },
    { text: feat, options: hOpts },
  ];
}

const compRows = [
  compHeader,
  compRow("This study", "Qwen3-30B", "CRC", "1,748", "F1 0.976", "F1 0.993*", "F1 0.943**", "Local, Multi-agent", true),
  compRow("Chizhikova '24", "RoBERTa", "CRC", "1,319", "\u2014", "\u2014", "\u2014", "Radiology, Spanish"),
  compRow("Wiest '25", "Llama 3.1", "CRC", "100", "Acc 0.89", "Acc 0.92", "Acc 0.82", "TCGA, Local"),
  compRow("Kefeli '24", "BB-TEN", "Multi", "15K", "AUC .82-.94", "AUC .82-.94", "AUC .82-.94", "Fine-tuned BERT"),
  compRow("Truhn '24", "GPT-4", "CRC", "TCGA", "High", "High", "\u2014", "Cloud, Zero-shot"),
  compRow("Ishida '25", "Qwen2.5", "Gyn", "~600", "Acc 0.97", "Acc 0.92", "Acc 0.90", "Local, Real-world"),
];

s9.addTable(compRows, {
  x: 0.3, y: 0.85, w: 9.4,
  colW: [1.2, 1.0, 0.7, 0.7, 1.1, 1.1, 1.1, 1.5],
  border: { pt: 0.5, color: "DDDDDD" },
  margin: [3, 4, 3, 4],
  rowH: [0.35, 0.35, 0.3, 0.3, 0.3, 0.3, 0.3],
});

s9.addText("* Nx excluded   ** M0/M1 binary", {
  x: 0.4, y: 3.45, w: 9, h: 0.3,
  fontSize: 10, fontFace: "Pretendard",
  color: "777777", italic: true, margin: 0,
});

// Key Differentiators box
s9.addShape("rect", {
  x: 0.4, y: 3.85, w: 9.2, h: 1.55,
  fill: { color: C.bgSubtle },
});
s9.addShape("rect", {
  x: 0.4, y: 3.85, w: 0.06, h: 1.55,
  fill: { color: C.primary },
});

s9.addText("Key Differentiators", {
  x: 0.7, y: 3.95, w: 8, h: 0.35,
  fontSize: 14, fontFace: "Pretendard",
  color: C.primary, bold: true, margin: 0,
});

s9.addText([
  { text: "Largest real-world CRC dataset (n=1,748) vs TCGA or small cohorts", options: { bullet: true, breakLine: true } },
  { text: "Local on-premise LLM \u2014 zero PHI exposure", options: { bullet: true, breakLine: true } },
  { text: "Multi-agent architecture with selective thinking mode", options: { bullet: true, breakLine: true } },
  { text: "Simultaneous pTNM + cTNM extraction (unique in CRC literature)", options: { bullet: true } },
], {
  x: 0.7, y: 4.3, w: 8.5, h: 1.0,
  fontSize: 11.5, fontFace: "Pretendard",
  color: C.textDark, margin: 0,
  lineSpacingMultiple: 1.3,
});
addPageNum(s9, 9);

// ─────────────────────────────────────
// SLIDE 10: Discussion Points & Next Steps
// ─────────────────────────────────────
let s10 = pres.addSlide();
s10.background = { color: C.primaryDark };
s10.addShape("rect", {
  x: 0, y: 0, w: 10, h: 5.625,
  fill: { color: C.primary, transparency: 30 },
});

s10.addText("Discussion Points & Next Steps", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Pretendard",
  color: C.white, bold: true, margin: 0,
});

// Discussion Points (left)
s10.addShape("rect", {
  x: 0.4, y: 1.1, w: 4.35, h: 3.55,
  fill: { color: "1A6A9C", transparency: 20 },
});
// Header bar (darker accent strip at top of panel)
s10.addShape("rect", {
  x: 0.4, y: 1.1, w: 4.35, h: 0.75,
  fill: { color: "0A4D78" },
  line: { width: 0 },
});

s10.addText("Discussion Points", {
  x: 0.65, y: 1.25, w: 3.8, h: 0.4,
  fontSize: 16, fontFace: "Pretendard",
  color: C.accentSky, bold: true, margin: 0,
});

s10.addText([
  { text: "N1c: Add tumor deposit extraction to prompt", options: { bullet: true, breakLine: true } },
  { text: "N grouping: Present detailed + N0/N1/N2 in parallel", options: { bullet: true, breakLine: true } },
  { text: "M: Focus on binary (M0/M1); detailed as supplementary", options: { bullet: true, breakLine: true } },
  { text: "Clinical TNM: Use N0/N1 notation, recommend Mx", options: { bullet: true, breakLine: true } },
  { text: "Stage analysis: Requires stage_final recalculation logic", options: { bullet: true } },
], {
  x: 0.65, y: 2.05, w: 3.9, h: 2.61,
  fontSize: 12, fontFace: "Pretendard",
  color: C.white, margin: 0,
  lineSpacingMultiple: 1.5,
});

// Next Steps (right)
s10.addShape("rect", {
  x: 5.1, y: 1.1, w: 4.5, h: 3.55,
  fill: { color: "1A6A9C", transparency: 20 },
});
// Header bar (darker accent strip at top of panel)
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
  { text: "Create LLM workflow figure (multi-agent pipeline)", options: { bullet: true, breakLine: true } },
  { text: "Prompt structure as supplementary material", options: { bullet: true, breakLine: true } },
  { text: "Stage-level confusion matrix (after stage validation)", options: { bullet: true, breakLine: true } },
  { text: "Write Clinical TNM results section", options: { bullet: true, breakLine: true } },
  { text: "Complete registry discrepancy comparison analysis", options: { bullet: true } },
], {
  x: 5.35, y: 2.05, w: 4.05, h: 2.61,
  fontSize: 12, fontFace: "Pretendard",
  color: C.white, margin: 0,
  lineSpacingMultiple: 1.5,
});

// Logo bottom (white version)
s10.addImage({
  path: LOGO_W, x: 7.93, y: 5.0, w: 1.67, h: 0.47,
});

// ===== SAVE =====
const outPath = path.resolve("mnt/CRC-TNM-Manuscript/CRC_LLM_pTNM_Analysis_AsanStyle.pptx");
pres.writeFile({ fileName: outPath })
  .then(() => console.log("DONE: " + outPath))
  .catch(err => console.error("ERROR:", err));
