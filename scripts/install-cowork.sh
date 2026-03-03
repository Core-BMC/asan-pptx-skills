#!/usr/bin/env bash
# ============================================================
# install-cowork.sh
# Asan PPTX Skills — Cowork / Claude Desktop 설치 스크립트
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="${HOME}/.skills/skills"

SKILLS=("asan-pptx" "asan-slide-curator")

echo "=== Asan PPTX Skills — Cowork Installer ==="
echo "Source : ${SCRIPT_DIR}/skills"
echo "Target : ${SKILLS_DIR}"
echo ""

for skill in "${SKILLS[@]}"; do
    src="${SCRIPT_DIR}/skills/${skill}"
    dst="${SKILLS_DIR}/${skill}"

    if [ ! -d "$src" ]; then
        echo "[ERROR] Source not found: ${src}"
        exit 1
    fi

    if [ -d "$dst" ]; then
        echo "[UPDATE] ${skill} — removing old version..."
        rm -rf "$dst"
    fi

    cp -r "$src" "$dst"
    echo "[OK] ${skill} → ${dst}"
done

echo ""
echo "Installation complete. Restart Cowork to load the skills."
