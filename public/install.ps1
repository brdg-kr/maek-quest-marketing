$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$forwardArgs = @()
foreach ($arg in $args) {
  if ($arg -eq "--verbose") {
    $forwardArgs += "-Verbose"
  } else {
    $forwardArgs += $arg
  }
}
if (($env:MAEK_VERBOSE -eq "1") -and -not ($forwardArgs -contains "-Verbose")) {
  $forwardArgs += "-Verbose"
}

function Test-WindowsOs {
  [System.Runtime.InteropServices.RuntimeInformation]::IsOSPlatform([System.Runtime.InteropServices.OSPlatform]::Windows)
}

function Get-CurrentScriptRoot {
  $scriptPath = if ($PSCommandPath) { $PSCommandPath } else { $MyInvocation.MyCommand.Path }
  if (-not $scriptPath) {
    return ""
  }
  Split-Path -Parent $scriptPath
}

function Download-Installer([string]$Url, [string]$Name) {
  $target = Join-Path ([System.IO.Path]::GetTempPath()) ("maek-$Name-" + [guid]::NewGuid())
  Invoke-WebRequest -UseBasicParsing -Uri $Url -OutFile $target
  $target
}

function Invoke-PowerShellInstaller([string]$Path, [string[]]$ForwardArgs) {
  $psExe = (Get-Process -Id $PID).Path
  & $psExe -NoProfile -ExecutionPolicy Bypass -File $Path @ForwardArgs
  if ($LASTEXITCODE) {
    throw "MAEK Windows installer failed with exit code $LASTEXITCODE."
  }
}

$scriptRoot = Get-CurrentScriptRoot
$baseUrl = if ($env:MAEK_INSTALL_BASE_URL) { $env:MAEK_INSTALL_BASE_URL.TrimEnd("/") } else { "https://maek.quest" }

if (Test-WindowsOs) {
  $localWindowsInstaller = if ($scriptRoot) { Join-Path $scriptRoot "install-windows.ps1" } else { "" }
  if ($localWindowsInstaller -and (Test-Path $localWindowsInstaller)) {
    Invoke-PowerShellInstaller $localWindowsInstaller $forwardArgs
    return
  }
  $downloadedWindowsInstaller = Download-Installer "$baseUrl/install-windows.ps1" "install-windows.ps1"
  try {
    Invoke-PowerShellInstaller $downloadedWindowsInstaller $forwardArgs
  } finally {
    Remove-Item -Force $downloadedWindowsInstaller -ErrorAction SilentlyContinue
  }
  return
}

$localUnixInstaller = if ($scriptRoot) { Join-Path $scriptRoot "install-cli.sh" } else { "" }
if (-not (Get-Command bash -ErrorAction SilentlyContinue)) {
  throw "bash is required on macOS/Linux. Install bash or run install/install-cli.sh with a compatible shell."
}
$unixForwardArgs = @()
foreach ($arg in $forwardArgs) {
  if ($arg -eq "-Verbose") {
    $unixForwardArgs += "--verbose"
  } else {
    $unixForwardArgs += $arg
  }
}
if ($localUnixInstaller -and (Test-Path $localUnixInstaller)) {
  & bash $localUnixInstaller @unixForwardArgs
  if ($LASTEXITCODE) {
    throw "MAEK Unix installer failed with exit code $LASTEXITCODE."
  }
  return
}

$downloadedUnixInstaller = Download-Installer "$baseUrl/install-cli.sh" "install-cli.sh"
try {
  & bash $downloadedUnixInstaller @unixForwardArgs
  if ($LASTEXITCODE) {
    throw "MAEK Unix installer failed with exit code $LASTEXITCODE."
  }
} finally {
  Remove-Item -Force $downloadedUnixInstaller -ErrorAction SilentlyContinue
}
