#!/usr/bin/env bash
# Fail when a credential looks like it is sitting in this repository.
#
# The point is not to be clever. It is to stop the next commit that carries a token,
# a password, or a key. It prints the pattern name and the location, never the value,
# because a scanner that prints the secret only moves the leak somewhere else.
#
# Usage:
#   bash tools/check-no-secrets.sh              # tracked files plus .git/config
#   bash tools/check-no-secrets.sh --all        # also untracked, non-ignored files
#   bash tools/check-no-secrets.sh --staged     # only what is staged, for a pre-commit hook
#   bash tools/check-no-secrets.sh --quiet      # print only failures
#
# Exit 0 means clean. Exit 1 means at least one finding.

set -u

MODE=tracked
QUIET=0
for arg in "$@"; do
  case "$arg" in
    --all) MODE=all ;;
    --staged) MODE=staged ;;
    --quiet) QUIET=1 ;;
    -h|--help) sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "argumen tidak dikenal: $arg" >&2; exit 2 ;;
  esac
done

ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || { echo "bukan repo git" >&2; exit 2; }
cd "$ROOT" || exit 2

SELF="tools/check-no-secrets.sh"
FINDINGS=0

# High confidence patterns. Each line is: <name>|<extended regex>.
# Nothing here matches itself, and the scanner always skips its own file.
PATTERNS=$(cat <<'EOF'
github-token|gh[pousr]_[A-Za-z0-9]{20,}
github-fine-grained|github_pat_[A-Za-z0-9_]{20,}
gitlab-token|glpat-[A-Za-z0-9_-]{20,}
slack-token|xox[abprs]-[A-Za-z0-9-]{10,}
aws-access-key|AKIA[0-9A-Z]{16}
google-api-key|AIza[0-9A-Za-z_-]{35}
stripe-live-key|sk_live_[0-9A-Za-z]{20,}
private-key-block|-----BEGIN [A-Z ]*PRIVATE KEY-----
credential-in-url|://[^/[:space:]@]+:[^/[:space:]@]+@
assigned-secret|(TOKEN|PASSWORD|PASSWD|SECRET|API_KEY|BEARER)[A-Z_]*[[:space:]]*[:=][[:space:]]*["']?[A-Za-z0-9_.+/-][A-Za-z0-9_.+/=-]{15,}
EOF
)

MAX_LINES=40

report() {
  FINDINGS=$((FINDINGS + 1))
  [ "$FINDINGS" -gt "$MAX_LINES" ] && return 0
  printf '[TEMUAN] %-20s %s\n' "$1" "$2"
  [ "$FINDINGS" -eq "$MAX_LINES" ] && echo "[TEMUAN] ... sisa temuan disembunyikan, jalankan per berkas"
}

# Third party trees are not ours to fix, and their own test fixtures trip every
# pattern in this file. Skipping them keeps the signal readable.
is_vendor() {
  case "$1" in
    node_modules/*|*/node_modules/*|vendor/*|*/vendor/*|.venv/*|*/site-packages/*|*.min.js) return 0 ;;
  esac
  return 1
}

scan_file() {
  local file="$1"
  [ "$file" = "$SELF" ] && return 0
  is_vendor "$file" && return 0
  [ -f "$file" ] || return 0
  # Anything above 2 MB is data or a bundle, not a line of code someone typed.
  [ "$(wc -c < "$file" 2>/dev/null || echo 0)" -gt 2097152 ] && return 0
  grep -Iq . "$file" 2>/dev/null || return 0
  local name regex hits line
  while IFS='|' read -r name regex; do
    [ -z "$name" ] && continue
    all=$(grep -nIE -- "$regex" "$file" 2>/dev/null)
    if [ "$name" = "assigned-secret" ]; then
      # A value read from the environment, or an obvious placeholder, is not a secret.
      # These are the shapes that account for almost every false alarm in real code.
      all=$(echo "$all" | grep -viE 'process\.env|os\.environ|\$\{|\$[A-Z_]|[<][A-Za-z_ ]+[>]|your|replace|xxxx|placeholder|dummy|example|redacted')
    fi
    all=$(echo "$all" | cut -d: -f1)
    [ -z "$all" ] && continue
    for line in $(echo "$all" | head -3); do
      report "$name" "$file:$line (nilai tidak dicetak)"
    done
    extra=$(( $(echo "$all" | wc -l) - 3 ))
    [ "$extra" -gt 0 ] && report "$name" "$file (+$extra baris lain, nilai tidak dicetak)"
  done <<< "$PATTERNS"
}

# 1. Contents of the files this mode covers.
case "$MODE" in
  tracked) FILES=$(git ls-files) ;;
  all) FILES=$(git ls-files --cached --others --exclude-standard) ;;
  staged) FILES=$(git diff --cached --name-only --diff-filter=ACMR) ;;
esac
for f in $FILES; do
  scan_file "$f"
done

# 2. The git config, because a token inside a remote URL never shows up as a file.
CFG=".git/config"
if [ -f "$CFG" ]; then
  if grep -qIE '://[^/[:space:]@]+:[^/[:space:]@]+@' "$CFG" 2>/dev/null; then
    report "credential-in-remote" "$CFG (nilai tidak dicetak)"
  fi
fi

# 3. Report.
if [ "$FINDINGS" -gt 0 ]; then
  echo
  echo "HASIL: $FINDINGS temuan. Hapus nilainya, lalu rotasi kredensialnya."
  echo "Nilai tidak dicetak di sini dengan sengaja. Buka berkas dan baris yang disebut."
  exit 1
fi

[ "$QUIET" -eq 1 ] || echo "HASIL: bersih, tidak ada kredensial yang terlihat (mode $MODE)"
exit 0
