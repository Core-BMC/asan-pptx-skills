#!/usr/bin/env python3
"""
DOI 메타데이터 조회 스크립트.
CrossRef API를 사용하여 DOI에서 논문 메타데이터를 가져온다.

사용법:
    python doi_lookup.py 10.1038/s41591-024-02857-3
    python doi_lookup.py --search "TNM staging LLM automated" --limit 5
    python doi_lookup.py --validate refs.json
"""

import argparse
import json
import sys
import urllib.request
import urllib.parse
import urllib.error
from typing import Optional


CROSSREF_API = "https://api.crossref.org"
USER_AGENT = "AMC-SlideCurator/1.0 (mailto:heoh@amc.seoul.kr)"


def fetch_doi_metadata(doi: str) -> Optional[dict]:
    """CrossRef API로 DOI 메타데이터 조회."""
    url = f"{CROSSREF_API}/works/{urllib.parse.quote(doi, safe='')}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            item = data.get("message", {})
            return _parse_crossref_item(item, doi)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return {"doi": doi, "error": "DOI not found"}
        return {"doi": doi, "error": f"HTTP {e.code}"}
    except Exception as e:
        return {"doi": doi, "error": str(e)}


def search_crossref(query: str, limit: int = 5) -> list[dict]:
    """CrossRef API로 키워드 검색."""
    params = urllib.parse.urlencode({
        "query": query,
        "rows": limit,
        "sort": "relevance",
        "order": "desc",
    })
    url = f"{CROSSREF_API}/works?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            items = data.get("message", {}).get("items", [])
            return [_parse_crossref_item(it) for it in items]
    except Exception as e:
        return [{"error": str(e)}]


def _parse_crossref_item(item: dict, doi: str = "") -> dict:
    """CrossRef 응답을 표준 레퍼런스 카드 형식으로 변환."""
    authors_raw = item.get("author", [])
    if authors_raw:
        first = authors_raw[0]
        first_name = f"{first.get('family', '')}"
        authors = f"{first_name} et al." if len(authors_raw) > 1 else first_name
    else:
        authors = "Unknown"

    title_parts = item.get("title", [])
    title = title_parts[0] if title_parts else "No title"

    journal_parts = item.get("container-title", [])
    journal = journal_parts[0] if journal_parts else ""

    # 연도 추출
    date_parts = item.get("published-print", item.get("published-online", {}))
    year = None
    if date_parts and "date-parts" in date_parts:
        year = date_parts["date-parts"][0][0]

    return {
        "doi": item.get("DOI", doi),
        "title": title,
        "authors": authors,
        "journal": journal,
        "year": year,
        "type": item.get("type", ""),
        "cited_by": item.get("is-referenced-by-count", 0),
        "url": item.get("URL", f"https://doi.org/{item.get('DOI', doi)}"),
    }


def validate_references(refs_file: str) -> list[dict]:
    """레퍼런스 JSON 파일의 모든 DOI를 검증."""
    with open(refs_file) as f:
        refs = json.load(f)

    results = []
    for ref in refs:
        doi = ref.get("doi", "")
        if not doi:
            results.append({"id": ref.get("id"), "status": "no_doi"})
            continue
        meta = fetch_doi_metadata(doi)
        if "error" in meta:
            results.append({"id": ref.get("id"), "doi": doi, "status": "invalid", "error": meta["error"]})
        else:
            results.append({"id": ref.get("id"), "doi": doi, "status": "valid", "title": meta["title"]})
    return results


def format_vancouver(ref: dict) -> str:
    """Vancouver 스타일 포맷."""
    authors = ref.get("authors", "")
    title = ref.get("title", "")
    journal = ref.get("journal", "")
    year = ref.get("year", "")
    doi = ref.get("doi", "")
    return f"{authors}. {title}. {journal}. {year}. doi:{doi}"


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="DOI metadata lookup via CrossRef API")
    parser.add_argument("doi", nargs="?", help="DOI to look up")
    parser.add_argument("--search", help="Search query for CrossRef")
    parser.add_argument("--limit", type=int, default=5, help="Max results for search")
    parser.add_argument("--validate", help="Validate DOIs in a JSON file")
    parser.add_argument("--vancouver", action="store_true", help="Output in Vancouver format")

    args = parser.parse_args()

    if args.validate:
        results = validate_references(args.validate)
        print(json.dumps(results, indent=2, ensure_ascii=False))
    elif args.search:
        results = search_crossref(args.search, args.limit)
        if args.vancouver:
            for r in results:
                print(format_vancouver(r))
        else:
            print(json.dumps(results, indent=2, ensure_ascii=False))
    elif args.doi:
        result = fetch_doi_metadata(args.doi)
        if args.vancouver:
            print(format_vancouver(result))
        else:
            print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        parser.print_help()
