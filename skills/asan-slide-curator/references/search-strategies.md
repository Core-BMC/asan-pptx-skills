# 의료 AI 분야별 검색 전략

학술 레퍼런스를 효율적으로 찾기 위한 분야별 검색 전략.

## 기본 원칙

1. **핵심어 조합**: 주제 + 방법론 + 연도 (최근 2년)
2. **단계적 확장**: 좁은 검색 → 넓은 검색 → 인용 네트워크
3. **검증 필수**: 모든 DOI는 `scripts/doi_lookup.py`로 메타데이터 확인

---

## 분야별 전략

### 1. 의료 영상 분할 (Medical Image Segmentation)

**핵심 저널/학회:**
- Medical Image Analysis (MedIA)
- IEEE TMI (Transactions on Medical Imaging)
- MICCAI proceedings
- Nature Medicine / Nature Methods (고영향 논문)

**검색어 템플릿:**
```
1차: "[modality] segmentation [method] [year]"
  예: "CT liver segmentation SAM2 2024"
  예: "MRI brain tumor few-shot segmentation 2025"

2차: "[method] medical image [dataset/benchmark]"
  예: "foundation model medical image TotalSegmentator"

3차: 핵심 논문 DOI → 피인용 논문 추적
```

**주요 벤치마크/데이터셋:**
- TotalSegmentator, BTCV, ACDC, BraTS
- MSD (Medical Segmentation Decathlon)
- AbdomenAtlas, SA-Med2D

**분야 특화 키워드:**
- few-shot, zero-shot, foundation model, SAM, SAM2
- nnU-Net, MONAI, FS-MedSAM2
- semi-supervised, self-supervised, domain adaptation

### 2. 자연어처리 기반 임상 분류 (Clinical NLP / TNM Staging)

**핵심 저널/학회:**
- Journal of the American Medical Informatics Association (JAMIA)
- npj Digital Medicine
- Journal of Clinical Oncology (JCO) informatics
- ACL/EMNLP Clinical NLP Workshop

**검색어 템플릿:**
```
1차: "[task] LLM [cancer type] [year]"
  예: "TNM staging LLM automated 2024"
  예: "pathology report extraction GPT-4 2025"

2차: "[clinical task] natural language processing accuracy"
  예: "cancer staging NLP accuracy validation"

3차: "[guideline] edition automated classification"
  예: "AJCC 8th edition automated TNM"
```

**주요 가이드라인:**
- AJCC Cancer Staging Manual (8th Edition)
- WHO Classification of Tumours (5th Edition)
- NCCN Guidelines (버전 명시 필수)

**분야 특화 키워드:**
- structured reporting, information extraction
- rule-based vs LLM hybrid
- multi-agent, chain-of-thought, few-shot prompting
- pathology report, operative note, radiology report

### 3. 멀티에이전트 시스템 (Multi-Agent AI Systems)

**핵심 저널/학회:**
- arXiv (cs.AI, cs.CL, cs.MA)
- NeurIPS, ICML, ICLR
- AAMAS (Autonomous Agents and Multi-Agent Systems)

**검색어 템플릿:**
```
1차: "multi-agent [application] [framework] [year]"
  예: "multi-agent clinical decision support 2024"
  예: "LLM multi-agent medical reasoning 2025"

2차: "[framework] agent orchestration"
  예: "CrewAI LangGraph medical agent"
```

**주요 프레임워크:**
- LangGraph, CrewAI, AutoGen, MetaGPT
- Claude Tool Use, OpenAI Function Calling

### 4. 생성형 AI 의료 응용 (Generative AI in Medicine)

**핵심 저널/학회:**
- Nature Medicine, The Lancet Digital Health
- NEJM AI
- Radiology: Artificial Intelligence

**검색어 템플릿:**
```
1차: "[model] [medical task] performance [year]"
  예: "GPT-4 clinical reasoning benchmark 2024"
  예: "multimodal LLM radiology report 2025"

2차: "[evaluation type] medical AI [metric]"
  예: "hallucination medical LLM evaluation"
```

---

## 검색 실행 가이드

### web_search 쿼리 작성 규칙

1. **1-6단어**, 전문용어 중심
2. **연도 필터** 반드시 포함 (예: "2024 2025")
3. **불용어 제거**: the, of, for, in, with 등 제외
4. **약어 사용**: Natural Language Processing → NLP

### DOI 검증 워크플로

```bash
# 단일 DOI 조회
python scripts/doi_lookup.py 10.1038/s41591-024-02857-3

# 키워드 검색 (상위 5건)
python scripts/doi_lookup.py --search "TNM staging LLM automated" --limit 5

# 레퍼런스 파일 일괄 검증
python scripts/doi_lookup.py --validate refs.json

# Vancouver 스타일 출력
python scripts/doi_lookup.py 10.1038/s41591-024-02857-3 --vancouver
```

### 레퍼런스 카드 출력 형식

```json
{
  "id": "ref-01",
  "doi": "10.1038/s41591-024-xxxxx",
  "title": "논문 제목",
  "authors": "First Author et al.",
  "journal": "Nature Medicine",
  "year": 2024,
  "cited_by": 42,
  "relevance": "슬라이드 2의 정확도 주장 뒷받침",
  "key_finding": "LLM 기반 TNM 분류 94.2% 정확도",
  "slides": [2, 3]
}
```

---

## 검색 품질 체크리스트

- [ ] 최근 2년 이내 논문이 포함되었는가?
- [ ] Peer-reviewed 저널 논문이 우선인가? (arXiv만으로 구성 금지)
- [ ] DOI가 모두 유효한가? (`--validate`로 확인)
- [ ] 핵심 주장마다 최소 1개 레퍼런스가 매핑되었는가?
- [ ] 가이드라인 참조에 판본/연도가 명시되었는가?
