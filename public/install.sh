#!/usr/bin/env bash
set -euo pipefail

# Friendly installer entrypoint.
# It detects the host shell OS first, then delegates to the platform-specific
# local-prefix installer.

INSTALL_CLI_URL="${MAEK_INSTALL_CLI_URL:-https://maek.quest/install-cli.sh}"
INSTALL_WINDOWS_URL="${MAEK_INSTALL_WINDOWS_URL:-https://maek.quest/install-windows.ps1}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TMP_FILE="$(mktemp)"
TMP_WINDOWS_FILE=""
trap 'rm -f "$TMP_FILE" "$TMP_WINDOWS_FILE"' EXIT
DEFAULT_ARGS=()
if [[ "${MAEK_INSTALL_DEFAULT_ONBOARD:-1}" != "0" ]]; then
  DEFAULT_ARGS+=(--onboard)
fi

is_windows_shell() {
  case "$(uname -s 2>/dev/null || true)" in
    MINGW*|MSYS*|CYGWIN*) return 0 ;;
    *) return 1 ;;
  esac
}

find_powershell() {
  if command -v powershell.exe >/dev/null 2>&1; then
    command -v powershell.exe
    return 0
  fi
  if command -v pwsh >/dev/null 2>&1; then
    command -v pwsh
    return 0
  fi
  if command -v powershell >/dev/null 2>&1; then
    command -v powershell
    return 0
  fi
  echo "ERROR: PowerShell is required for Windows install" >&2
  return 1
}

to_windows_path() {
  if command -v cygpath >/dev/null 2>&1; then
    cygpath -w "$1"
    return
  fi
  printf '%s\n' "$1"
}

download_file() {
  local url="$1"
  local output="$2"
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL --proto '=https' --tlsv1.2 --retry 3 --retry-delay 1 -o "$output" "$url"
  elif command -v wget >/dev/null 2>&1; then
    wget -q --https-only --secure-protocol=TLSv1_2 --tries=3 --timeout=20 -O "$output" "$url"
  else
    echo "ERROR: curl or wget is required" >&2
    exit 1
  fi
}

translate_windows_args() {
  local out=()
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --prefix) out+=("-Prefix" "$2"); shift 2 ;;
      --install-method|--method) out+=("-InstallMethod" "$2"); shift 2 ;;
      --git|--github) out+=("-InstallMethod" "git"); shift ;;
      --npm) out+=("-InstallMethod" "npm"); shift ;;
      --version) out+=("-Version" "$2"); shift 2 ;;
      --node-version) out+=("-NodeVersion" "$2"); shift 2 ;;
      --bun-version) out+=("-BunVersion" "$2"); shift 2 ;;
      --python-version) out+=("-PythonVersion" "$2"); shift 2 ;;
      --postgres-version) out+=("-PostgresVersion" "$2"); shift 2 ;;
      --postgres-url) out+=("-PostgresUrl" "$2"); shift 2 ;;
      --brain-url) out+=("-BrainUrl" "$2"); shift 2 ;;
      --api-url) out+=("-ApiUrl" "$2"); shift 2 ;;
      --gbrain-url) out+=("-GbrainUrl" "$2"); shift 2 ;;
      --gbrain-ref) out+=("-GbrainRef" "$2"); shift 2 ;;
      --skip-api-venv) out+=("-SkipApiVenv"); shift ;;
      --skip-gbrain-deps) out+=("-SkipGbrainDeps"); shift ;;
      --skip-postgres) out+=("-SkipPostgres"); shift ;;
      --no-onboard) out+=("-NoOnboard"); shift ;;
      --onboard) shift ;;
      --dry-run) out+=("-DryRun"); shift ;;
      --verbose) out+=("-Verbose"); shift ;;
      *) out+=("$1"); shift ;;
    esac
  done
  printf '%s\0' "${out[@]}"
}

run_windows_installer() {
  local installer="$1"
  shift
  local ps installer_path
  ps="$(find_powershell)"
  installer_path="$(to_windows_path "$installer")"
  "$ps" -NoProfile -ExecutionPolicy Bypass -File "$installer_path" "$@"
}

if is_windows_shell; then
  WINDOWS_ARGS=()
  while IFS= read -r -d '' arg; do
    WINDOWS_ARGS+=("$arg")
  done < <(translate_windows_args "${DEFAULT_ARGS[@]}" "$@")

  if [[ -f "${SCRIPT_DIR}/install-windows.ps1" ]]; then
    run_windows_installer "${SCRIPT_DIR}/install-windows.ps1" "${WINDOWS_ARGS[@]}"
    exit $?
  fi

  TMP_WINDOWS_FILE="${TMP_FILE}.ps1"
  download_file "$INSTALL_WINDOWS_URL" "$TMP_WINDOWS_FILE"
  run_windows_installer "$TMP_WINDOWS_FILE" "${WINDOWS_ARGS[@]}"
  exit $?
fi

if [[ -f "${SCRIPT_DIR}/install-cli.sh" ]]; then
  exec bash "${SCRIPT_DIR}/install-cli.sh" "${DEFAULT_ARGS[@]}" "$@"
fi

download_file "$INSTALL_CLI_URL" "$TMP_FILE"

exec bash "$TMP_FILE" "${DEFAULT_ARGS[@]}" "$@"
