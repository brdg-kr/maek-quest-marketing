#!/usr/bin/env bash
set -euo pipefail

# MAEK Brain local-prefix installer.
# Source-informed by OpenClaw's install-cli.sh: user-space Node, SHA-verified
# runtime download, git/npm install modes, wrapper generation, optional onboard.

ensure_home_env() {
  if [[ -n "${HOME:-}" && "${HOME}" != "/" && -d "${HOME}" ]]; then
    return 0
  fi
  local user_name home_dir
  user_name="$(id -un 2>/dev/null || true)"
  home_dir=""
  if [[ -n "$user_name" && "$(uname -s 2>/dev/null || true)" == "Darwin" ]] && command -v dscl >/dev/null 2>&1; then
    home_dir="$(dscl . -read "/Users/${user_name}" NFSHomeDirectory 2>/dev/null | awk '{print $2; exit}' || true)"
  elif [[ -n "$user_name" ]] && command -v getent >/dev/null 2>&1; then
    home_dir="$(getent passwd "$user_name" 2>/dev/null | awk -F: '{print $6; exit}' || true)"
  fi
  if [[ -n "$home_dir" && "$home_dir" != "/" && -d "$home_dir" ]]; then
    export HOME="$home_dir"
  fi
}

ensure_home_env

PREFIX="${MAEK_PREFIX:-${HOME}/.maek-brain}"
NODE_VERSION="${MAEK_NODE_VERSION:-22.22.0}"
BUN_VERSION="${MAEK_BUN_VERSION:-1.3.14}"
PYTHON_VERSION="${MAEK_PYTHON_VERSION:-3.12.13}"
PYTHON_BUILD_TAG="${MAEK_PYTHON_BUILD_TAG:-20260510}"
INSTALL_METHOD="${MAEK_INSTALL_METHOD:-git}"
MAEK_VERSION="${MAEK_VERSION:-main}"
MAEK_BRAIN_GIT_URL="${MAEK_BRAIN_GIT_URL:-https://github.com/brdg-kr/maek-brain.git}"
MAEK_BRAIN_API_GIT_URL="${MAEK_BRAIN_API_GIT_URL:-https://github.com/brdg-kr/maek-brain-api.git}"
GBRAIN_GIT_URL="${GBRAIN_GIT_URL:-https://github.com/garrytan/gbrain.git}"
GBRAIN_REF="${GBRAIN_REF:-master}"
MAEK_NPM_PACKAGE="${MAEK_NPM_PACKAGE:-maek-brain}"
RUN_ONBOARD="${MAEK_RUN_ONBOARD:-0}"
JSON=0
DRY_RUN=0
VERBOSE="${MAEK_VERBOSE:-0}"
GIT_UPDATE="${MAEK_GIT_UPDATE:-1}"
NPM_LOGLEVEL="${MAEK_NPM_LOGLEVEL:-error}"
SETUP_API_VENV="${MAEK_SETUP_API_VENV:-1}"
SETUP_GBRAIN_DEPS="${MAEK_SETUP_GBRAIN_DEPS:-1}"
SCRIPT_PATH="${BASH_SOURCE[0]:-$0}"
SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_PATH")" 2>/dev/null && pwd || true)"
LOCAL_BRAIN_SOURCE=""
LOCAL_API_SOURCE=""
if [[ -n "$SCRIPT_DIR" && -f "${SCRIPT_DIR}/../maek-brain.mjs" ]]; then
  LOCAL_BRAIN_SOURCE="$(cd "${SCRIPT_DIR}/.." && pwd)"
  if [[ -d "${LOCAL_BRAIN_SOURCE}/../maek-brain-api/app" ]]; then
    LOCAL_API_SOURCE="$(cd "${LOCAL_BRAIN_SOURCE}/../maek-brain-api" && pwd)"
  fi
fi

print_usage() {
  cat <<EOF
Usage: install-cli.sh [options]
  --json                         Emit NDJSON events
  --prefix <path>                Install prefix (default: ~/.maek-brain)
  --install-method git|npm       Install from GitHub repos (default) or npm
  --git                          Shortcut for --install-method git
  --npm                          Shortcut for --install-method npm
  --version <ref|tag|version>    Git ref or npm version (default: main)
  --node-version <version>       Node version (default: 22.22.0)
  --bun-version <version>        Bun version (default: 1.3.14)
  --python-version <version>     Python version (default: 3.12.13)
  --brain-url <url>              maek-brain git URL
  --api-url <url>                maek-brain-api git URL
  --gbrain-url <url>             gbrain git URL
  --gbrain-ref <ref>             gbrain ref (default: master)
  --no-git-update                Do not pull existing git checkouts
  --skip-api-venv                Do not create/update maek-brain-api .venv
  --skip-gbrain-deps             Do not install gbrain-src Bun dependencies
  --onboard                      Run maek-brain onboard after install
  --no-onboard                   Skip onboarding
  --dry-run                      Print actions without changing files
  --verbose                      Show raw git/bun/pip command output
  --help                         Show this help

Examples:
  curl -fsSL https://maek.quest/install-cli.sh | bash
  curl -fsSL https://maek.quest/install-cli.sh | bash -s -- --prefix /opt/maek-brain --onboard
EOF
}

log() {
  if [[ "$JSON" -eq 0 ]]; then
    echo "$@"
  fi
}

emit_json() {
  if [[ "$JSON" -eq 1 ]]; then
    printf '%s\n' "$1"
  fi
}

fail() {
  local msg="$1"
  emit_json "{\"event\":\"error\",\"message\":\"${msg//\"/\\\"}\"}"
  log "ERROR: $msg"
  exit 1
}

log_verbose() {
  if [[ "$VERBOSE" == "1" ]]; then
    log "$@"
  fi
}

install_log_file() {
  echo "${PREFIX}/logs/install/install-cli.log"
}

init_install_log() {
  if [[ "$DRY_RUN" -eq 1 || "$VERBOSE" == "1" ]]; then
    return
  fi
  mkdir -p "$(dirname "$(install_log_file)")"
  : >"$(install_log_file)"
}

run() {
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "+ $*"
    return 0
  fi
  if [[ "$VERBOSE" == "1" ]]; then
    "$@"
    return
  fi
  local log_file status
  log_file="$(install_log_file)"
  mkdir -p "$(dirname "$log_file")"
  printf '\n[%s] $ %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >>"$log_file"
  "$@" >>"$log_file" 2>&1
  status=$?
  if [[ "$status" -ne 0 ]]; then
    log "ERROR: command failed: $*"
    log "Log: $log_file"
  fi
  return "$status"
}

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --json) JSON=1; shift ;;
      --prefix) PREFIX="$2"; shift 2 ;;
      --install-method|--method) INSTALL_METHOD="$2"; shift 2 ;;
      --git|--github) INSTALL_METHOD="git"; shift ;;
      --npm) INSTALL_METHOD="npm"; shift ;;
      --version) MAEK_VERSION="$2"; shift 2 ;;
      --node-version) NODE_VERSION="$2"; shift 2 ;;
      --bun-version) BUN_VERSION="$2"; shift 2 ;;
      --python-version) PYTHON_VERSION="$2"; shift 2 ;;
      --brain-url) MAEK_BRAIN_GIT_URL="$2"; shift 2 ;;
      --api-url) MAEK_BRAIN_API_GIT_URL="$2"; shift 2 ;;
      --gbrain-url) GBRAIN_GIT_URL="$2"; shift 2 ;;
      --gbrain-ref) GBRAIN_REF="$2"; shift 2 ;;
      --no-git-update) GIT_UPDATE=0; shift ;;
      --skip-api-venv) SETUP_API_VENV=0; shift ;;
      --skip-gbrain-deps) SETUP_GBRAIN_DEPS=0; shift ;;
      --onboard) RUN_ONBOARD=1; shift ;;
      --no-onboard) RUN_ONBOARD=0; shift ;;
      --dry-run) DRY_RUN=1; shift ;;
      --verbose) VERBOSE=1; shift ;;
      --help|-h) print_usage; exit 0 ;;
      *) fail "Unknown option: $1" ;;
    esac
  done
}

os_detect() {
  case "$(uname -s)" in
    Darwin) echo "darwin" ;;
    Linux) echo "linux" ;;
    *) fail "Unsupported OS: $(uname -s)" ;;
  esac
}

arch_detect() {
  case "$(uname -m)" in
    arm64|aarch64) echo "arm64" ;;
    x86_64|amd64) echo "x64" ;;
    *) fail "Unsupported architecture: $(uname -m)" ;;
  esac
}

node_dir() {
  echo "${PREFIX}/tools/node-v${NODE_VERSION}"
}

node_bin() {
  echo "$(node_dir)/bin/node"
}

npm_bin() {
  echo "$(node_dir)/bin/npm"
}

bun_dir() {
  echo "${PREFIX}/tools/bun"
}

bun_bin() {
  echo "$(bun_dir)/bin/bun"
}

python_dir_versioned() {
  echo "${PREFIX}/tools/python-${PYTHON_VERSION}"
}

python_dir() {
  echo "${PREFIX}/tools/python"
}

python_bin() {
  echo "$(python_dir)/bin/python3"
}

download_file() {
  local url="$1"
  local output="$2"
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL --proto '=https' --tlsv1.2 --retry 3 --retry-delay 1 --retry-connrefused -o "$output" "$url"
    return
  fi
  if command -v wget >/dev/null 2>&1; then
    wget -q --https-only --secure-protocol=TLSv1_2 --tries=3 --timeout=20 -O "$output" "$url"
    return
  fi
  fail "Missing downloader: curl or wget is required"
}

is_windows_shell() {
  case "$(uname -s 2>/dev/null || true)" in
    MINGW*|MSYS*|CYGWIN*) return 0 ;;
    *) return 1 ;;
  esac
}

delegate_windows_install() {
  if [[ -f "${SCRIPT_DIR}/install.sh" ]]; then
    MAEK_INSTALL_DEFAULT_ONBOARD=0 exec bash "${SCRIPT_DIR}/install.sh" "$@"
  fi
  local tmp
  tmp="$(mktemp)"
  download_file "${MAEK_INSTALL_URL:-https://maek.quest/install.sh}" "$tmp"
  MAEK_INSTALL_DEFAULT_ONBOARD=0 exec bash "$tmp" "$@"
}

sha256_file() {
  local file="$1"
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$file" | awk '{print $1}'
    return
  fi
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$file" | awk '{print $1}'
    return
  fi
  if command -v openssl >/dev/null 2>&1; then
    openssl dgst -sha256 "$file" | awk '{print $NF}'
    return
  fi
  fail "Missing sha256 tool"
}

install_node() {
  local dir os arch base_url tarball tmp expected actual
  dir="$(node_dir)"
  if [[ -x "$(node_bin)" ]]; then
    emit_json "{\"event\":\"step\",\"name\":\"node\",\"status\":\"skip\",\"path\":\"${dir//\"/\\\"}\"}"
    return
  fi
  emit_json "{\"event\":\"step\",\"name\":\"node\",\"status\":\"start\",\"version\":\"${NODE_VERSION}\"}"
  log "Installing Node ${NODE_VERSION} under ${PREFIX}/tools"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "Would download and verify Node ${NODE_VERSION}"
    return
  fi
  os="$(os_detect)"
  arch="$(arch_detect)"
  base_url="https://nodejs.org/dist/v${NODE_VERSION}"
  tarball="node-v${NODE_VERSION}-${os}-${arch}.tar.gz"
  tmp="$(mktemp -d)"
  download_file "${base_url}/SHASUMS256.txt" "$tmp/SHASUMS256.txt"
  expected="$(grep "  ${tarball}$" "$tmp/SHASUMS256.txt" | awk '{print $1}' | head -n1 || true)"
  [[ -n "$expected" ]] || fail "Could not resolve Node checksum for ${tarball}"
  download_file "${base_url}/${tarball}" "$tmp/node.tgz"
  actual="$(sha256_file "$tmp/node.tgz")"
  [[ "$actual" == "$expected" ]] || fail "Node checksum mismatch"
  run mkdir -p "${PREFIX}/tools"
  run rm -rf "$dir"
  run mkdir -p "$dir"
  run tar -xzf "$tmp/node.tgz" -C "$dir" --strip-components=1
  run ln -sfn "$dir" "${PREFIX}/tools/node"
  rm -rf "$tmp"
  emit_json "{\"event\":\"step\",\"name\":\"node\",\"status\":\"ok\"}"
}

bun_asset() {
  local os arch
  os="$(os_detect)"
  arch="$(arch_detect)"
  case "${os}-${arch}" in
    darwin-arm64) echo "bun-darwin-aarch64.zip" ;;
    darwin-x64) echo "bun-darwin-x64.zip" ;;
    linux-arm64) echo "bun-linux-aarch64.zip" ;;
    linux-x64) echo "bun-linux-x64.zip" ;;
    *) fail "Unsupported Bun platform: ${os}-${arch}" ;;
  esac
}

bun_sha256() {
  local asset="$1"
  case "$asset" in
    bun-darwin-aarch64.zip) echo "d8b96221828ad6f97ac7ac0ab7e95872341af763001e8803e8267652c2652620" ;;
    bun-darwin-x64.zip) echo "4183df3374623e5bab315c547cfa0974533cd457d86b73b639f7a87974cd6633" ;;
    bun-linux-aarch64.zip) echo "a27ffb63a8310375836e0d6f668ae17fa8d8d18b88c37c821c65331973a19a3b" ;;
    bun-linux-x64.zip) echo "951ee2aee855f08595aeec6225226a298d3fea83a3dcd6465c09cbccdf7e848f" ;;
    *) fail "No Bun sha256 pinned for $asset" ;;
  esac
}

install_bun() {
  local dir asset url tmp expected actual extracted
  dir="$(bun_dir)"
  if [[ -x "$(bun_bin)" ]]; then
    emit_json "{\"event\":\"step\",\"name\":\"bun\",\"status\":\"skip\",\"path\":\"$(bun_bin)\"}"
    return
  fi
  emit_json "{\"event\":\"step\",\"name\":\"bun\",\"status\":\"start\",\"version\":\"${BUN_VERSION}\"}"
  log "Installing Bun ${BUN_VERSION} under ${dir}"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "Would download and verify Bun ${BUN_VERSION}"
    return
  fi
  command -v unzip >/dev/null 2>&1 || fail "unzip is required to install Bun"
  asset="$(bun_asset)"
  expected="$(bun_sha256 "$asset")"
  url="https://github.com/oven-sh/bun/releases/download/bun-v${BUN_VERSION}/${asset}"
  tmp="$(mktemp -d)"
  download_file "$url" "$tmp/bun.zip"
  actual="$(sha256_file "$tmp/bun.zip")"
  [[ "$actual" == "$expected" ]] || fail "Bun checksum mismatch"
  rm -rf "$dir"
  mkdir -p "$dir"
  unzip -q "$tmp/bun.zip" -d "$tmp"
  extracted="$(find "$tmp" -type f -name bun | head -n1 || true)"
  [[ -n "$extracted" ]] || fail "Bun binary missing after unzip"
  mkdir -p "$dir/bin"
  cp "$extracted" "$dir/bin/bun"
  chmod +x "$dir/bin/bun"
  rm -rf "$tmp"
  emit_json "{\"event\":\"step\",\"name\":\"bun\",\"status\":\"ok\",\"path\":\"$(bun_bin)\"}"
}

python_asset() {
  local os arch
  os="$(os_detect)"
  arch="$(arch_detect)"
  case "${PYTHON_VERSION}+${PYTHON_BUILD_TAG}:${os}-${arch}" in
    3.12.13+20260510:darwin-arm64) echo "cpython-3.12.13+20260510-aarch64-apple-darwin-install_only.tar.gz" ;;
    3.12.13+20260510:darwin-x64) echo "cpython-3.12.13+20260510-x86_64-apple-darwin-install_only.tar.gz" ;;
    3.12.13+20260510:linux-arm64) echo "cpython-3.12.13+20260510-aarch64-unknown-linux-gnu-install_only.tar.gz" ;;
    3.12.13+20260510:linux-x64) echo "cpython-3.12.13+20260510-x86_64-unknown-linux-gnu-install_only.tar.gz" ;;
    *) fail "No pinned Python runtime for ${PYTHON_VERSION}+${PYTHON_BUILD_TAG} on ${os}-${arch}" ;;
  esac
}

python_sha256() {
  local asset="$1"
  case "$asset" in
    cpython-3.12.13+20260510-aarch64-apple-darwin-install_only.tar.gz) echo "5a30271f8d345a5b02b0c9e4e31e0f1e1455a8e4a04fba95cd9762472abc3b17" ;;
    cpython-3.12.13+20260510-x86_64-apple-darwin-install_only.tar.gz) echo "cd369e76973c3179bc578230d8615ab621968ed758c5e32f636eecef4ad79894" ;;
    cpython-3.12.13+20260510-aarch64-unknown-linux-gnu-install_only.tar.gz) echo "87097de12bc212e41ea8409efd0083fe06465d725e35d130e4007a4bf7e4f1c8" ;;
    cpython-3.12.13+20260510-x86_64-unknown-linux-gnu-install_only.tar.gz) echo "e7332b4b4bb85006deb48d251c786a04c14de104c9b3a006b33457a4a604b8bc" ;;
    *) fail "No Python sha256 pinned for $asset" ;;
  esac
}

install_python() {
  local dir asset url tmp expected actual
  dir="$(python_dir_versioned)"
  if [[ -x "$(python_bin)" ]]; then
    emit_json "{\"event\":\"step\",\"name\":\"python\",\"status\":\"skip\",\"path\":\"$(python_bin)\"}"
    return
  fi
  emit_json "{\"event\":\"step\",\"name\":\"python\",\"status\":\"start\",\"version\":\"${PYTHON_VERSION}\"}"
  log "Installing Python ${PYTHON_VERSION} under ${dir}"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "Would download and verify Python ${PYTHON_VERSION}+${PYTHON_BUILD_TAG}"
    return
  fi
  asset="$(python_asset)"
  expected="$(python_sha256 "$asset")"
  url="https://github.com/astral-sh/python-build-standalone/releases/download/${PYTHON_BUILD_TAG}/${asset/+/%2B}"
  tmp="$(mktemp -d)"
  download_file "$url" "$tmp/python.tgz"
  actual="$(sha256_file "$tmp/python.tgz")"
  [[ "$actual" == "$expected" ]] || fail "Python checksum mismatch"
  rm -rf "$dir"
  mkdir -p "$dir"
  tar -xzf "$tmp/python.tgz" -C "$dir" --strip-components=1
  ln -sfn "$dir" "$(python_dir)"
  "$(python_bin)" - <<'PY' || fail "Bundled Python failed self-check"
import sys
raise SystemExit(0 if sys.version_info >= (3, 12) else 1)
PY
  rm -rf "$tmp"
  emit_json "{\"event\":\"step\",\"name\":\"python\",\"status\":\"ok\",\"path\":\"$(python_bin)\"}"
}

ensure_git() {
  if command -v git >/dev/null 2>&1; then
    emit_json '{"event":"step","name":"git","status":"ok"}'
    return
  fi
  fail "Git is required. Install git and rerun the installer."
}

checkout_ref() {
  local repo_dir="$1"
  local ref="$2"
  if [[ "$ref" == "main" || "$ref" == "master" ]]; then
    run git -C "$repo_dir" fetch --no-tags origin "$ref"
    run git -C "$repo_dir" checkout "$ref"
    if [[ "$GIT_UPDATE" == "1" ]]; then
      run git -C "$repo_dir" pull --ff-only origin "$ref" || true
    fi
    return
  fi
  run git -C "$repo_dir" fetch --tags origin
  run git -C "$repo_dir" checkout "$ref"
}

clone_or_update() {
  local name="$1"
  local url="$2"
  local dir="$3"
  emit_json "{\"event\":\"step\",\"name\":\"${name}\",\"status\":\"start\",\"url\":\"${url//\"/\\\"}\"}"
  if [[ -d "$dir/.git" ]]; then
    log_verbose "Updating ${name}: ${dir}"
  elif [[ -e "$dir" && -n "$(ls -A "$dir" 2>/dev/null || true)" ]]; then
    fail "${name} target exists and is not a git repo: ${dir}"
  else
    run mkdir -p "$(dirname "$dir")"
    run git clone "$url" "$dir"
  fi
  checkout_ref "$dir" "$MAEK_VERSION"
  emit_json "{\"event\":\"step\",\"name\":\"${name}\",\"status\":\"ok\",\"path\":\"${dir//\"/\\\"}\"}"
}

clone_or_update_ref() {
  local name="$1"
  local url="$2"
  local dir="$3"
  local ref="$4"
  emit_json "{\"event\":\"step\",\"name\":\"${name}\",\"status\":\"start\",\"url\":\"${url//\"/\\\"}\"}"
  if [[ -d "$dir/.git" ]]; then
    log_verbose "Updating ${name}: ${dir}"
  elif [[ -e "$dir" && -n "$(ls -A "$dir" 2>/dev/null || true)" ]]; then
    fail "${name} target exists and is not a git repo: ${dir}"
  else
    run mkdir -p "$(dirname "$dir")"
    run git clone "$url" "$dir"
  fi
  if [[ "$ref" == "main" || "$ref" == "master" ]]; then
    run git -C "$dir" fetch --no-tags origin "$ref"
    run git -C "$dir" checkout "$ref"
    if [[ "$GIT_UPDATE" == "1" ]]; then
      run git -C "$dir" pull --ff-only origin "$ref" || true
    fi
  else
    run git -C "$dir" fetch --tags origin
    run git -C "$dir" checkout "$ref"
  fi
  emit_json "{\"event\":\"step\",\"name\":\"${name}\",\"status\":\"ok\",\"path\":\"${dir//\"/\\\"}\"}"
}

install_from_git() {
  ensure_git
  local app_dir="${PREFIX}/app"
  log "Preparing source modules"
  clone_or_update "maek-brain" "$MAEK_BRAIN_GIT_URL" "${app_dir}/maek-brain"
  clone_or_update_ref "gbrain-src" "$GBRAIN_GIT_URL" "${app_dir}/maek-brain/gbrain-src" "$GBRAIN_REF"
  clone_or_update "maek-brain-api" "$MAEK_BRAIN_API_GIT_URL" "${app_dir}/maek-brain-api"
  overlay_local_sources
}

copy_file_if_present() {
  local source="$1"
  local target="$2"
  if [[ -f "$source" ]]; then
    run mkdir -p "$(dirname "$target")"
    run cp "$source" "$target"
  fi
}

copy_dir_if_present() {
  local source="$1"
  local target="$2"
  if [[ -d "$source" ]]; then
    run rm -rf "$target"
    run mkdir -p "$(dirname "$target")"
    run cp -R "$source" "$target"
  fi
}

overlay_local_sources() {
  if [[ -n "$LOCAL_BRAIN_SOURCE" ]]; then
    local brain_target="${PREFIX}/app/maek-brain"
    log_verbose "Overlaying local maek-brain checkout into ${brain_target}"
    copy_file_if_present "${LOCAL_BRAIN_SOURCE}/maek-brain.mjs" "${brain_target}/maek-brain.mjs"
    copy_file_if_present "${LOCAL_BRAIN_SOURCE}/package.json" "${brain_target}/package.json"
    copy_file_if_present "${LOCAL_BRAIN_SOURCE}/README.md" "${brain_target}/README.md"
    copy_dir_if_present "${LOCAL_BRAIN_SOURCE}/bin" "${brain_target}/bin"
    copy_dir_if_present "${LOCAL_BRAIN_SOURCE}/docs" "${brain_target}/docs"
    copy_dir_if_present "${LOCAL_BRAIN_SOURCE}/install" "${brain_target}/install"
  fi
  if [[ -n "$LOCAL_API_SOURCE" ]]; then
    local api_target="${PREFIX}/app/maek-brain-api"
    log_verbose "Overlaying local maek-brain-api checkout into ${api_target}"
    copy_file_if_present "${LOCAL_API_SOURCE}/README.md" "${api_target}/README.md"
    copy_file_if_present "${LOCAL_API_SOURCE}/requirements.txt" "${api_target}/requirements.txt"
    copy_dir_if_present "${LOCAL_API_SOURCE}/app" "${api_target}/app"
  fi
}

remove_gbrain_pglite_dependency() {
  local package_json="${PREFIX}/app/maek-brain/gbrain-src/package.json"
  if [[ ! -f "$package_json" ]]; then
    return
  fi
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "+ remove unused @electric-sql/pglite dependency from ${package_json}"
    return
  fi
  "$(node_bin)" - "$package_json" <<'JS'
const fs = require('node:fs');
const file = process.argv[2];
const json = JSON.parse(fs.readFileSync(file, 'utf8'));
let changed = false;
if (json.dependencies && Object.hasOwn(json.dependencies, '@electric-sql/pglite')) {
  delete json.dependencies['@electric-sql/pglite'];
  changed = true;
}
if (Array.isArray(json.trustedDependencies)) {
  const next = json.trustedDependencies.filter((name) => name !== '@electric-sql/pglite');
  if (next.length !== json.trustedDependencies.length) {
    json.trustedDependencies = next;
    changed = true;
  }
}
if (changed) {
  fs.writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
}
JS
}

install_from_npm() {
  emit_json "{\"event\":\"step\",\"name\":\"maek-brain\",\"status\":\"start\",\"method\":\"npm\",\"version\":\"${MAEK_VERSION}\"}"
  local requested="$MAEK_VERSION"
  if [[ "$requested" == "main" || "$requested" == "master" ]]; then
    requested="latest"
  fi
  local spec="${MAEK_NPM_PACKAGE}@${requested}"
  log "Installing ${spec}"
  run "$(npm_bin)" install -g --prefix "$(node_dir)" --loglevel "$NPM_LOGLEVEL" --no-fund --no-audit "$spec"
  emit_json "{\"event\":\"step\",\"name\":\"maek-brain\",\"status\":\"ok\",\"method\":\"npm\"}"
}

setup_api_venv() {
  if [[ "$SETUP_API_VENV" != "1" ]]; then
    emit_json '{"event":"step","name":"api-venv","status":"skip"}'
    return
  fi
  local api_dir="${PREFIX}/app/maek-brain-api"
  local req="${api_dir}/requirements.txt"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    emit_json '{"event":"step","name":"api-venv","status":"start"}'
    log "Would create ${api_dir}/.venv and install ${req}"
    return
  fi
  if [[ ! -f "$req" ]]; then
    emit_json '{"event":"step","name":"api-venv","status":"skip","reason":"missing requirements.txt"}'
    return
  fi
  emit_json '{"event":"step","name":"api-venv","status":"start"}'
  log "Preparing maek-brain-api Python environment"
  [[ -x "$(python_bin)" ]] || fail "Bundled Python is missing. Re-run installer without --skip-api-venv."
  run "$(python_bin)" -m venv "${api_dir}/.venv"
  run "${api_dir}/.venv/bin/python" -m pip install --upgrade pip
  run "${api_dir}/.venv/bin/python" -m pip install -r "$req"
  emit_json '{"event":"step","name":"api-venv","status":"ok"}'
}

setup_gbrain_deps() {
  if [[ "$SETUP_GBRAIN_DEPS" != "1" ]]; then
    emit_json '{"event":"step","name":"gbrain-deps","status":"skip"}'
    return
  fi
  local gbrain_dir="${PREFIX}/app/maek-brain/gbrain-src"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    emit_json '{"event":"step","name":"gbrain-deps","status":"start"}'
    log "Would run bun install --backend=copyfile --no-cache --ignore-scripts in ${gbrain_dir}"
    return
  fi
  if [[ ! -f "${gbrain_dir}/package.json" ]]; then
    emit_json '{"event":"step","name":"gbrain-deps","status":"skip","reason":"missing package.json"}'
    return
  fi
  emit_json '{"event":"step","name":"gbrain-deps","status":"start"}'
  log "Installing gbrain-src Bun dependencies"
  [[ -x "$(bun_bin)" ]] || fail "Bundled Bun is missing. Re-run installer."
  (
    cd "$gbrain_dir"
    run env BUN_INSTALL_CACHE_DIR="${PREFIX}/cache/bun" "$(bun_bin)" install --backend=copyfile --no-cache --ignore-scripts
  )
  emit_json '{"event":"step","name":"gbrain-deps","status":"ok"}'
}

write_wrapper() {
  local target="${PREFIX}/bin/maek-brain"
  local entry=""
  if [[ "$INSTALL_METHOD" == "npm" ]]; then
    entry="$(node_dir)/lib/node_modules/${MAEK_NPM_PACKAGE}/maek-brain.mjs"
  else
    entry="${PREFIX}/app/maek-brain/maek-brain.mjs"
  fi
  run mkdir -p "${PREFIX}/bin"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "Would write wrapper ${target} -> ${entry}"
  else
    cat > "$target" <<EOF
#!/usr/bin/env bash
set -euo pipefail
export MAEK_PREFIX="${PREFIX}"
export MAEK_BUN_BIN="${PREFIX}/tools/bun/bin/bun"
export MAEK_PYTHON_BIN="${PREFIX}/tools/python/bin/python3"
export PATH="${PREFIX}/tools/python/bin:${PREFIX}/tools/bun/bin:${PREFIX}/tools/node/bin:\${PATH}"
exec "${PREFIX}/tools/node/bin/node" "${entry}" "\$@"
EOF
    chmod +x "$target"
  fi
  emit_json "{\"event\":\"step\",\"name\":\"wrapper\",\"status\":\"ok\",\"path\":\"${target//\"/\\\"}\"}"
}

main() {
  if is_windows_shell; then
    delegate_windows_install "$@"
  fi
  parse_args "$@"
  init_install_log
  PATH="$(node_dir)/bin:${PREFIX}/bin:${PATH}"
  export PATH
  emit_json "{\"event\":\"start\",\"prefix\":\"${PREFIX//\"/\\\"}\",\"method\":\"${INSTALL_METHOD}\"}"
  install_node
  install_bun
  install_python
  case "$INSTALL_METHOD" in
    git) install_from_git ;;
    npm) install_from_npm ;;
    *) fail "Unknown install method: ${INSTALL_METHOD}" ;;
  esac
  remove_gbrain_pglite_dependency
  setup_gbrain_deps
  setup_api_venv
  write_wrapper
  emit_json '{"event":"done","ok":true}'
  log ""
  log "MAEK Brain files installed."
  log "Prefix: ${PREFIX}"
  log "CLI: ${PREFIX}/bin/maek-brain"
  log ""
  log "Next actions:"
  log "1. Run onboarding:"
  log "   ${PREFIX}/bin/maek-brain onboard --install-daemon"
  log "2. Check status:"
  log "   ${PREFIX}/bin/maek-brain doctor"
  log "3. Optional shell PATH:"
  log "   export PATH=\"${PREFIX}/bin:\$PATH\""
  if [[ "$RUN_ONBOARD" == "1" && "$DRY_RUN" -eq 0 ]]; then
    local onboard_args=(onboard --install-daemon)
    if [[ "$VERBOSE" == "1" ]]; then
      onboard_args+=(--verbose)
    fi
    "${PREFIX}/bin/maek-brain" "${onboard_args[@]}"
  fi
}

main "$@"
