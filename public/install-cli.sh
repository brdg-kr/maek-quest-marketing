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
INSTALL_METHOD="${MAEK_INSTALL_METHOD:-release}"
MAEK_VERSION="${MAEK_VERSION:-main}"
MAEK_RELEASE_BASE_URL="${MAEK_RELEASE_BASE_URL:-https://maek.quest/releases}"
MAEK_RELEASE_MANIFEST_URL="${MAEK_RELEASE_MANIFEST_URL:-${MAEK_RELEASE_BASE_URL}/latest.json}"
MAEK_RELEASE_URL="${MAEK_RELEASE_URL:-}"
MAEK_RELEASE_SHA256="${MAEK_RELEASE_SHA256:-}"
MAEK_RELEASE_SHA256_URL="${MAEK_RELEASE_SHA256_URL:-}"
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
API_HOST="${MAEK_API_HOST:-}"
API_PORT="${MAEK_API_PORT:-}"
PUBLIC_ACCESS="${MAEK_LAN_ACCESS:-${MAEK_PUBLIC_ACCESS:-0}}"
OPEN_FIREWALL="${MAEK_OPEN_FIREWALL:-}"
FIREWALL_REMOTE_ADDRESS="${MAEK_FIREWALL_REMOTE_ADDRESS:-local-subnet}"
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
  --install-method release|git|npm
                                 Install from release package (default), GitHub repos, or npm
  --release                      Shortcut for --install-method release
  --git                          Shortcut for --install-method git
  --npm                          Shortcut for --install-method npm
  --version <ref|tag|version>    Release version, Git ref, or npm version (default: main/latest)
  --release-url <url>            Direct release ZIP URL
  --release-sha256 <sha256>      Direct release ZIP checksum
  --release-sha256-url <url>     Direct release checksum URL
  --release-base-url <url>       Release base URL (default: https://maek.quest/releases)
  --release-manifest-url <url>   Release manifest URL (default: <base>/latest.json)
  --node-version <version>       Node version (default: 22.22.0)
  --bun-version <version>        Bun version (default: 1.3.14)
  --python-version <version>     Python version (default: 3.12.13)
  --brain-url <url>              maek-brain git URL
  --api-url <url>                maek-brain-api git URL
  --gbrain-url <url>             gbrain git URL
  --gbrain-ref <ref>             gbrain ref (default: master)
  --api-host <host>              API/Admin/MCP bind host passed to onboarding
  --api-port <port>              API/Admin/MCP port passed to onboarding
  --lan-access                   Bind API/Admin/MCP to 0.0.0.0 and open LAN firewall when possible
  --public-access                Alias for --lan-access
  --open-firewall                Open or print an OS firewall rule for the API port
  --firewall-remote-address <cidr>
                                 Source range for firewall rule (default: local-subnet)
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
      --release) INSTALL_METHOD="release"; shift ;;
      --git|--github) INSTALL_METHOD="git"; shift ;;
      --npm) INSTALL_METHOD="npm"; shift ;;
      --version) MAEK_VERSION="$2"; shift 2 ;;
      --release-url) MAEK_RELEASE_URL="$2"; shift 2 ;;
      --release-sha256) MAEK_RELEASE_SHA256="$2"; shift 2 ;;
      --release-sha256-url) MAEK_RELEASE_SHA256_URL="$2"; shift 2 ;;
      --release-base-url) MAEK_RELEASE_BASE_URL="${2%/}"; MAEK_RELEASE_MANIFEST_URL="${MAEK_RELEASE_BASE_URL}/latest.json"; shift 2 ;;
      --release-manifest-url) MAEK_RELEASE_MANIFEST_URL="$2"; shift 2 ;;
      --node-version) NODE_VERSION="$2"; shift 2 ;;
      --bun-version) BUN_VERSION="$2"; shift 2 ;;
      --python-version) PYTHON_VERSION="$2"; shift 2 ;;
      --brain-url) MAEK_BRAIN_GIT_URL="$2"; shift 2 ;;
      --api-url) MAEK_BRAIN_API_GIT_URL="$2"; shift 2 ;;
      --gbrain-url) GBRAIN_GIT_URL="$2"; shift 2 ;;
      --gbrain-ref) GBRAIN_REF="$2"; shift 2 ;;
      --api-host|--host) API_HOST="$2"; shift 2 ;;
      --api-port|--port) API_PORT="$2"; shift 2 ;;
      --lan-access|--public-access) PUBLIC_ACCESS=1; OPEN_FIREWALL=1; shift ;;
      --open-firewall) OPEN_FIREWALL=1; shift ;;
      --no-open-firewall) OPEN_FIREWALL=0; shift ;;
      --firewall-remote-address) FIREWALL_REMOTE_ADDRESS="$2"; shift 2 ;;
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

prepare_network_options() {
  if [[ "$PUBLIC_ACCESS" == "1" && -z "$API_HOST" ]]; then
    API_HOST="0.0.0.0"
  fi
  if [[ -z "$OPEN_FIREWALL" ]]; then
    if [[ "$PUBLIC_ACCESS" == "1" ]]; then
      OPEN_FIREWALL=1
    else
      OPEN_FIREWALL=0
    fi
  fi
  if [[ -n "$API_PORT" && ! "$API_PORT" =~ ^[0-9]+$ ]]; then
    fail "Invalid API port: ${API_PORT}"
  fi
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

resolve_release_package() {
  local requested version sha_url sha_file manifest_file
  requested="$MAEK_VERSION"
  if [[ -n "$MAEK_RELEASE_URL" ]]; then
    printf '%s\t%s\n' "$MAEK_RELEASE_URL" "$MAEK_RELEASE_SHA256"
    return
  fi

  if [[ "$requested" == "main" || "$requested" == "master" || "$requested" == "latest" ]]; then
    manifest_file="$(mktemp)"
    download_file "$MAEK_RELEASE_MANIFEST_URL" "$manifest_file"
    "$(node_bin)" - "$manifest_file" <<'JS'
const fs = require("node:fs");
const manifest = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const url = manifest.url || manifest.zipUrl || manifest.artifactUrl;
const sha256 = manifest.sha256 || "";
if (!url) {
  throw new Error("Release manifest is missing url");
}
process.stdout.write(`${url}\t${sha256}\n`);
JS
    rm -f "$manifest_file"
    return
  fi

  version="${requested#v}"
  printf '%s\t%s\n' "${MAEK_RELEASE_BASE_URL}/maek-brain-v${version}.zip" "$MAEK_RELEASE_SHA256"
}

find_release_root() {
  local extract_dir="$1"
  local child
  if [[ -d "${extract_dir}/maek-brain" && -d "${extract_dir}/maek-brain-api" ]]; then
    echo "$extract_dir"
    return
  fi
  while IFS= read -r child; do
    if [[ -d "${child}/maek-brain" && -d "${child}/maek-brain-api" ]]; then
      echo "$child"
      return
    fi
  done < <(find "$extract_dir" -mindepth 1 -maxdepth 1 -type d 2>/dev/null)
  fail "Release package must contain maek-brain/ and maek-brain-api/"
}

install_from_release() {
  emit_json "{\"event\":\"step\",\"name\":\"maek-brain\",\"status\":\"start\",\"method\":\"release\",\"version\":\"${MAEK_VERSION}\"}"
  local release_url release_sha archive sha_file actual expected tmp extract_dir root app_dir
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "Would download and install MAEK Brain release package from ${MAEK_RELEASE_URL:-${MAEK_RELEASE_MANIFEST_URL}}"
    emit_json '{"event":"step","name":"maek-brain","status":"ok","method":"release","dryRun":true}'
    return
  fi

  IFS=$'\t' read -r release_url release_sha < <(resolve_release_package)
  [[ -n "$release_url" ]] || fail "Release URL is empty"
  tmp="$(mktemp -d)"
  archive="${tmp}/maek-brain.zip"
  log "Installing MAEK Brain release package"
  download_file "$release_url" "$archive"
  if [[ -z "$release_sha" ]]; then
    sha_file="${tmp}/maek-brain.zip.sha256"
    download_file "${MAEK_RELEASE_SHA256_URL:-${release_url}.sha256}" "$sha_file"
    release_sha="$(awk '{print $1; exit}' "$sha_file")"
  fi
  [[ -n "$release_sha" ]] || fail "Release checksum is empty"
  actual="$(sha256_file "$archive" | tr 'A-F' 'a-f')"
  expected="$(printf '%s' "$release_sha" | tr 'A-F' 'a-f')"
  [[ "$actual" == "$expected" ]] || fail "Release checksum mismatch"

  extract_dir="${tmp}/extract"
  mkdir -p "$extract_dir"
  command -v unzip >/dev/null 2>&1 || fail "unzip is required to install MAEK Brain release packages"
  unzip -q "$archive" -d "$extract_dir"
  root="$(find_release_root "$extract_dir")"
  app_dir="${PREFIX}/app"
  run mkdir -p "$app_dir"
  run rm -rf "${app_dir}/maek-brain" "${app_dir}/maek-brain-api"
  run cp -R "${root}/maek-brain" "${app_dir}/maek-brain"
  run cp -R "${root}/maek-brain-api" "${app_dir}/maek-brain-api"
  rm -rf "$tmp"
  emit_json "{\"event\":\"step\",\"name\":\"maek-brain\",\"status\":\"ok\",\"method\":\"release\",\"url\":\"${release_url//\"/\\\"}\"}"
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

configured_api_port() {
  if [[ -n "$API_PORT" ]]; then
    echo "$API_PORT"
    return
  fi
  if [[ -f "${PREFIX}/config/maek-brain.json" && -x "$(node_bin)" ]]; then
    "$(node_bin)" -e "const fs=require('fs'); const c=JSON.parse(fs.readFileSync(process.argv[1], 'utf8')); console.log(c?.api?.port || 8790)" "${PREFIX}/config/maek-brain.json" 2>/dev/null || echo 8790
    return
  fi
  echo 8790
}

firewall_sources() {
  if [[ "$FIREWALL_REMOTE_ADDRESS" != "local-subnet" ]]; then
    echo "$FIREWALL_REMOTE_ADDRESS"
    return
  fi
  if command -v ip >/dev/null 2>&1; then
    ip -o route show scope link 2>/dev/null | awk '$1 ~ /\// {print $1}' | sort -u
    return
  fi
}

open_firewall() {
  local port os_name sources source
  port="$(configured_api_port)"
  os_name="$(os_detect)"
  sources="$(firewall_sources)"
  if [[ "$API_HOST" == "127.0.0.1" || "$API_HOST" == "localhost" ]]; then
    log "WARNING: firewall is open, but API_HOST=${API_HOST}; use --api-host 0.0.0.0 or a LAN IP for external access."
  fi
  if [[ -z "$sources" ]]; then
    log "WARNING: could not resolve local subnet firewall sources; pass --firewall-remote-address <cidr> explicitly."
  fi
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "+ open firewall for tcp/${port} from ${sources:-<explicit-cidr-required>}"
    return
  fi
  case "$os_name" in
    linux)
      if [[ "$(id -u)" == "0" ]]; then
        if [[ -n "$sources" ]] && command -v ufw >/dev/null 2>&1; then
          while IFS= read -r source; do
            [[ -n "$source" ]] || continue
            run ufw allow from "$source" to any port "$port" proto tcp
          done <<< "$sources"
          return
        fi
        if [[ -n "$sources" ]] && command -v firewall-cmd >/dev/null 2>&1; then
          while IFS= read -r source; do
            [[ -n "$source" ]] || continue
            if [[ "$source" == "any" ]]; then
              run firewall-cmd --permanent --add-port="${port}/tcp"
            else
              run firewall-cmd --permanent --add-rich-rule="rule family=ipv4 source address=${source} port port=${port} protocol=tcp accept"
            fi
          done <<< "$sources"
          run firewall-cmd --reload
          return
        fi
      fi
      log "Firewall rule requires elevated privileges. Run one of these on the server:"
      if [[ -n "$sources" ]]; then
        while IFS= read -r source; do
          [[ -n "$source" ]] || continue
          log "  sudo ufw allow from ${source} to any port ${port} proto tcp"
          log "  sudo firewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=${source} port port=${port} protocol=tcp accept'"
        done <<< "$sources"
        log "  sudo firewall-cmd --reload"
      else
        log "  sudo ufw allow from <cidr> to any port ${port} proto tcp"
      fi
      ;;
    darwin)
      log "macOS firewall is application-based. Allow incoming connections for the MAEK service process or expose MAEK through a controlled reverse proxy."
      log "API/Admin/MCP port: ${port}"
      ;;
  esac
}

main() {
  if is_windows_shell; then
    delegate_windows_install "$@"
  fi
  parse_args "$@"
  prepare_network_options
  init_install_log
  PATH="$(node_dir)/bin:${PREFIX}/bin:${PATH}"
  export PATH
  emit_json "{\"event\":\"start\",\"prefix\":\"${PREFIX//\"/\\\"}\",\"method\":\"${INSTALL_METHOD}\"}"
  install_node
  install_bun
  install_python
  case "$INSTALL_METHOD" in
    release) install_from_release ;;
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
  if [[ -n "$API_HOST" || -n "$API_PORT" ]]; then
    log "   ${PREFIX}/bin/maek-brain onboard --install-daemon${API_HOST:+ --host ${API_HOST}}${API_PORT:+ --port ${API_PORT}}"
  else
    log "   ${PREFIX}/bin/maek-brain onboard --install-daemon"
  fi
  log "2. Check status:"
  log "   ${PREFIX}/bin/maek-brain doctor"
  log "3. Optional shell PATH:"
  log "   export PATH=\"${PREFIX}/bin:\$PATH\""
  if [[ "$RUN_ONBOARD" == "1" && "$DRY_RUN" -eq 0 ]]; then
    local onboard_args=(onboard --install-daemon)
    if [[ -n "$API_HOST" ]]; then
      onboard_args+=(--host "$API_HOST")
    fi
    if [[ -n "$API_PORT" ]]; then
      onboard_args+=(--port "$API_PORT")
    fi
    if [[ "$VERBOSE" == "1" ]]; then
      onboard_args+=(--verbose)
    fi
    "${PREFIX}/bin/maek-brain" "${onboard_args[@]}"
    if [[ "$OPEN_FIREWALL" == "1" ]]; then
      open_firewall
    fi
  elif [[ "$OPEN_FIREWALL" == "1" ]]; then
    open_firewall
  fi
}

main "$@"
