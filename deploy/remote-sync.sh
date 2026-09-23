#!/bin/bash
# Installs an uploaded build tarball into the document root.
#
# Runs ON THE SERVER, uploaded next to the tarball by the deploy workflow.
# This exists because the host has no rsync: it reproduces `rsync --delete`
# using tar and a manifest, so stale hashed files from previous builds are removed
# instead of accumulating forever under assets/.
#
# Anything the host or cPanel owns must survive a deploy, so a small set of
# paths is never written and never deleted.

set -euo pipefail

TARBALL="${1:?usage: remote-sync.sh <tarball> <target-dir>}"
TARGET="${2:?usage: remote-sync.sh <tarball> <target-dir>}"

STAGING="$HOME/.deploy_staging"
MANIFEST="$HOME/.deploy_manifest"
CURRENT="$HOME/.deploy_current"
STALE="$HOME/.deploy_stale"

# Paths the deploy must never touch, matched against the target-relative path.
protected() {
  case "$1" in
    .well-known/*|cgi-bin/*|php.ini|.user.ini|.htpasswd|.htpasswds/*) return 0 ;;
    *) return 1 ;;
  esac
}

cleanup() { rm -rf "$STAGING" "$MANIFEST" "$CURRENT" "$STALE" "$TARBALL"; }
trap cleanup EXIT

[ -d "$TARGET" ] || { echo "target $TARGET does not exist"; exit 1; }

rm -rf "$STAGING"
mkdir -p "$STAGING"
tar xzf "$TARBALL" -C "$STAGING"

# Refuse to touch the live site if the upload was not a real build. Without
# this, a truncated transfer would delete every page in the document root.
for required in index.html .htaccess; do
  [ -e "$STAGING/$required" ] || { echo "upload is missing $required — aborting"; exit 1; }
done
[ -d "$STAGING/assets" ] || { echo "upload is missing assets/ — aborting"; exit 1; }

( cd "$STAGING" && find . -type f -printf '%P\n' ) | sort > "$MANIFEST"
[ -s "$MANIFEST" ] || { echo "manifest is empty — aborting"; exit 1; }

# Remove files the new build did not produce.
#
# Written with temp files rather than `done < <(...)`: this host runs a jailed
# shell (CageFS) with no /dev/fd, so process substitution fails outright with
# "/dev/fd/63: No such file or directory".
( cd "$TARGET" && find . -type f -printf '%P\n' ) | sort > "$CURRENT"

# grep exits 1 when nothing is stale, which is a normal outcome, not an error.
grep -vxF -f "$MANIFEST" "$CURRENT" > "$STALE" || true

removed=0
while IFS= read -r relative; do
  [ -n "$relative" ] || continue
  protected "$relative" && continue
  rm -f -- "$TARGET/$relative"
  removed=$((removed + 1))
done < "$STALE"

# Install the new build over the top.
cp -a "$STAGING/." "$TARGET/"

# Tidy directories the removals emptied, without descending into protected ones.
find "$TARGET" -mindepth 1 -type d -empty \
  -not -path "$TARGET/.well-known*" \
  -not -path "$TARGET/cgi-bin*" \
  -delete 2>/dev/null || true

installed=$(wc -l < "$MANIFEST")
echo "installed $installed files into $TARGET, removed $removed stale"
