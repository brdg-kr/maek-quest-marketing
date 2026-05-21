param(
  [string]$Prefix = $(if ($env:MAEK_PREFIX) { $env:MAEK_PREFIX } else { Join-Path $env:USERPROFILE ".maek-brain" }),
  [ValidateSet("release", "git", "npm")]
  [string]$InstallMethod = $(if ($env:MAEK_INSTALL_METHOD) { $env:MAEK_INSTALL_METHOD } else { "release" }),
  [string]$Version = $(if ($env:MAEK_VERSION) { $env:MAEK_VERSION } else { "main" }),
  [string]$ReleaseBaseUrl = $(if ($env:MAEK_RELEASE_BASE_URL) { $env:MAEK_RELEASE_BASE_URL.TrimEnd("/") } else { "https://maek.quest/releases" }),
  [string]$ReleaseManifestUrl = $(if ($env:MAEK_RELEASE_MANIFEST_URL) { $env:MAEK_RELEASE_MANIFEST_URL } else { "" }),
  [string]$ReleaseUrl = $(if ($env:MAEK_RELEASE_URL) { $env:MAEK_RELEASE_URL } else { "" }),
  [string]$ReleaseSha256 = $(if ($env:MAEK_RELEASE_SHA256) { $env:MAEK_RELEASE_SHA256 } else { "" }),
  [string]$ReleaseSha256Url = $(if ($env:MAEK_RELEASE_SHA256_URL) { $env:MAEK_RELEASE_SHA256_URL } else { "" }),
  [string]$NodeVersion = $(if ($env:MAEK_NODE_VERSION) { $env:MAEK_NODE_VERSION } else { "22.22.0" }),
  [string]$BunVersion = $(if ($env:MAEK_BUN_VERSION) { $env:MAEK_BUN_VERSION } else { "1.3.14" }),
  [string]$PythonVersion = $(if ($env:MAEK_PYTHON_VERSION) { $env:MAEK_PYTHON_VERSION } else { "3.12.10" }),
  [string]$PythonUrl = $(if ($env:MAEK_PYTHON_URL) { $env:MAEK_PYTHON_URL } else { "https://api.nuget.org/v3-flatcontainer/python/3.12.10/python.3.12.10.nupkg" }),
  [string]$PythonSha256 = $(if ($env:MAEK_PYTHON_SHA256) { $env:MAEK_PYTHON_SHA256 } else { "0eb85c2dfccccf1b17352de4c397f69194035b7d37149eacc16f1147d93de3b8" }),
  [string]$PostgresVersion = $(if ($env:MAEK_POSTGRES_VERSION) { $env:MAEK_POSTGRES_VERSION } else { "17.10-1" }),
  [string]$PostgresUrl = $(if ($env:MAEK_POSTGRES_URL) { $env:MAEK_POSTGRES_URL } else { "https://get.enterprisedb.com/postgresql/postgresql-$PostgresVersion-windows-x64-binaries.zip" }),
  [string]$PostgresSha256 = $(if ($env:MAEK_POSTGRES_SHA256) { $env:MAEK_POSTGRES_SHA256 } else { "f9aafca58e7026a1ef2caeee711acf761671e57904d430adc85f468374f5a821" }),
  [string]$PgvectorTag = $(if ($env:MAEK_PGVECTOR_TAG) { $env:MAEK_PGVECTOR_TAG } else { "0.8.2_17.6" }),
  [string]$PgvectorAsset = $(if ($env:MAEK_PGVECTOR_ASSET) { $env:MAEK_PGVECTOR_ASSET } else { "vector.v0.8.2-pg17.zip" }),
  [string]$PgvectorSha256 = $(if ($env:MAEK_PGVECTOR_SHA256) { $env:MAEK_PGVECTOR_SHA256 } else { "9747c300cc4344f9532cc1d9dbc0403afc88efb0358e20e814cb0a0497db91ec" }),
  [string]$BrainUrl = $(if ($env:MAEK_BRAIN_GIT_URL) { $env:MAEK_BRAIN_GIT_URL } else { "https://github.com/brdg-kr/maek-brain.git" }),
  [string]$ApiUrl = $(if ($env:MAEK_BRAIN_API_GIT_URL) { $env:MAEK_BRAIN_API_GIT_URL } else { "https://github.com/brdg-kr/maek-brain-api.git" }),
  [string]$GbrainUrl = $(if ($env:GBRAIN_GIT_URL) { $env:GBRAIN_GIT_URL } else { "https://github.com/garrytan/gbrain.git" }),
  [string]$GbrainRef = $(if ($env:GBRAIN_REF) { $env:GBRAIN_REF } else { "master" }),
  [string]$ApiHost = $(if ($env:MAEK_API_HOST) { $env:MAEK_API_HOST } else { "" }),
  [int]$ApiPort = $(if ($env:MAEK_API_PORT) { [int]$env:MAEK_API_PORT } else { 0 }),
  [switch]$LanAccess,
  [switch]$PublicAccess,
  [switch]$OpenFirewall,
  [string]$FirewallRemoteAddress = $(if ($env:MAEK_FIREWALL_REMOTE_ADDRESS) { $env:MAEK_FIREWALL_REMOTE_ADDRESS } else { "LocalSubnet" }),
  [switch]$SkipApiVenv,
  [switch]$SkipGbrainDeps,
  [switch]$SkipPostgres,
  [switch]$NoOnboard,
  [switch]$DryRun,
  [switch]$Verbose
)

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$IsWindowsOs = [System.Runtime.InteropServices.RuntimeInformation]::IsOSPlatform([System.Runtime.InteropServices.OSPlatform]::Windows)
if (-not $IsWindowsOs) {
  throw "install.ps1 is the Windows installer. Use install/install.sh or install/install-cli.sh on macOS/Linux."
}

$ScriptPath = if ($PSCommandPath) { $PSCommandPath } else { $MyInvocation.MyCommand.Path }
$ScriptRoot = if ($ScriptPath) { Split-Path -Parent $ScriptPath } else { "" }
$script:MaekVerbose = [bool]$Verbose -or ($env:MAEK_VERBOSE -eq "1")
$PublicAccessRequested = [bool]$LanAccess -or [bool]$PublicAccess -or ($env:MAEK_LAN_ACCESS -eq "1") -or ($env:MAEK_PUBLIC_ACCESS -eq "1")
$OpenFirewallRequested = [bool]$OpenFirewall -or ($env:MAEK_OPEN_FIREWALL -eq "1") -or $PublicAccessRequested
if ([string]::IsNullOrWhiteSpace($ApiHost) -and $PublicAccessRequested) {
  $ApiHost = "0.0.0.0"
}
if ($script:MaekVerbose) {
  $env:MAEK_VERBOSE = "1"
} else {
  $ProgressPreference = "SilentlyContinue"
}
$LocalBrainSource = ""
$LocalApiSource = ""
if ($ScriptRoot -and (Test-Path (Join-Path $ScriptRoot "..\maek-brain.mjs"))) {
  $LocalBrainSource = (Resolve-Path (Join-Path $ScriptRoot "..")).Path
  $localApiCandidate = Join-Path $LocalBrainSource "..\maek-brain-api"
  if (Test-Path (Join-Path $localApiCandidate "app")) {
    $LocalApiSource = (Resolve-Path $localApiCandidate).Path
  }
}

function Write-Step([string]$Message) {
  Write-Host "==> $Message"
}

function Test-IsAdministrator {
  $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = [Security.Principal.WindowsPrincipal]::new($identity)
  $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Get-ConfiguredApiPort {
  if ($ApiPort -gt 0) {
    return $ApiPort
  }
  $configPath = Join-Path $Prefix "config\maek-brain.json"
  if (Test-Path $configPath) {
    try {
      $config = Get-Content -Raw -Path $configPath | ConvertFrom-Json
      if ($config.api.port) {
        return [int]$config.api.port
      }
    } catch {
      Write-Host "WARNING: Could not read configured API port from $configPath"
    }
  }
  8790
}

function Ensure-WindowsFirewallRule([int]$Port, [string]$RemoteAddress) {
  if ($Port -le 0) {
    throw "Invalid API port for firewall rule: $Port"
  }
  $displayName = "MAEK Brain API $Port"
  $commandText = "New-NetFirewallRule -DisplayName `"$displayName`" -Direction Inbound -Action Allow -Protocol TCP -LocalPort $Port -Profile Domain,Private -RemoteAddress `"$RemoteAddress`""
  if ($DryRun) {
    Write-Host "+ $commandText"
    return
  }
  if (-not (Get-Command New-NetFirewallRule -ErrorAction SilentlyContinue)) {
    Write-Host "WARNING: Windows firewall cmdlets are not available on this machine."
    Write-Host "Run manually as Administrator:"
    Write-Host "  $commandText"
    return
  }
  if (-not (Test-IsAdministrator)) {
    Write-Host "WARNING: Opening Windows Defender Firewall requires an elevated PowerShell session."
    Write-Host "Run manually as Administrator:"
    Write-Host "  $commandText"
    return
  }

  $existing = Get-NetFirewallRule -DisplayName $displayName -ErrorAction SilentlyContinue
  if ($existing) {
    Set-NetFirewallRule -DisplayName $displayName -Enabled True -Profile Domain,Private -Action Allow
    $existing | Get-NetFirewallPortFilter | Set-NetFirewallPortFilter -Protocol TCP -LocalPort $Port
    $existing | Get-NetFirewallAddressFilter | Set-NetFirewallAddressFilter -RemoteAddress $RemoteAddress
    Write-Step "Updated Windows firewall rule: $displayName"
    return
  }

  New-NetFirewallRule -DisplayName $displayName -Direction Inbound -Action Allow -Protocol TCP -LocalPort $Port -Profile Domain,Private -RemoteAddress $RemoteAddress | Out-Null
  Write-Step "Created Windows firewall rule: $displayName"
}

function Invoke-Step([scriptblock]$Block, [string]$Text, [switch]$AllowFailure) {
  if ($DryRun) {
    Write-Host "+ $Text"
    if ($AllowFailure) {
      return 0
    }
    return
  }
  if ($script:MaekVerbose) {
    Write-Host "+ $Text"
    $global:LASTEXITCODE = 0
    & $Block
    $status = if ($null -ne $global:LASTEXITCODE) { $global:LASTEXITCODE } else { 0 }
    if ($status -ne 0) {
      if ($AllowFailure) {
        return $status
      }
      throw "Command failed ($status): $Text"
    }
    if ($AllowFailure) {
      return $status
    }
    return
  }

  $logFile = Join-Path $Prefix "logs\install\install-windows.log"
  New-Item -ItemType Directory -Force -Path (Split-Path $logFile) | Out-Null
  Add-Content -Encoding UTF8 -Path $logFile -Value ""
  Add-Content -Encoding UTF8 -Path $logFile -Value ("[{0}] $ {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Text)
  $global:LASTEXITCODE = 0
  $oldErrorActionPreference = $ErrorActionPreference
  try {
    $ErrorActionPreference = "Continue"
    & $Block *>&1 | Out-File -FilePath $logFile -Append -Encoding UTF8
  } catch {
    Add-Content -Encoding UTF8 -Path $logFile -Value $_.Exception.Message
    if ($AllowFailure) {
      return 1
    }
    Write-Host "ERROR: command failed: $Text"
    Write-Host "Log: $logFile"
    throw
  } finally {
    $ErrorActionPreference = $oldErrorActionPreference
  }
  $status = if ($null -ne $global:LASTEXITCODE) { $global:LASTEXITCODE } else { 0 }
  if ($status -ne 0) {
    if ($AllowFailure) {
      return $status
    }
    Write-Host "ERROR: command failed: $Text"
    Write-Host "Log: $logFile"
    throw "Command failed ($status): $Text"
  }
  if ($AllowFailure) {
    return $status
  }
  return
}

function Get-Arch {
  switch ($env:PROCESSOR_ARCHITECTURE) {
    "ARM64" { "arm64"; break }
    default { "x64" }
  }
}

function New-TempDir([string]$Name) {
  $dir = Join-Path ([System.IO.Path]::GetTempPath()) ("maek-$Name-" + [guid]::NewGuid())
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $dir
}

function Download-File([string]$Url, [string]$OutFile) {
  if ($Url -notmatch "^https?://") {
    Copy-Item -Force -LiteralPath $Url -Destination $OutFile
    return
  }
  Invoke-WebRequest -UseBasicParsing -Uri $Url -OutFile $OutFile
}

function Assert-Sha256([string]$Path, [string]$Expected, [string]$Label) {
  if ([string]::IsNullOrWhiteSpace($Expected)) {
    return
  }
  $actual = (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash.ToLowerInvariant()
  if ($actual -ne $Expected.ToLowerInvariant()) {
    throw "$Label checksum mismatch. Expected $Expected, got $actual."
  }
}

function Expand-ZipFile([string]$ZipPath, [string]$DestinationPath) {
  New-Item -ItemType Directory -Force -Path $DestinationPath | Out-Null
  if (Get-Command tar.exe -ErrorAction SilentlyContinue) {
    & tar.exe -xf $ZipPath -C $DestinationPath
    if ($LASTEXITCODE -ne 0) {
      throw "ZIP extraction failed: $ZipPath"
    }
    return
  }
  Expand-Archive -Path $ZipPath -DestinationPath $DestinationPath -Force
}

function Get-NodeRoot {
  Join-Path $Prefix "tools\node-v$NodeVersion"
}

function Get-NodeExe {
  Join-Path (Get-NodeRoot) "node.exe"
}

function Get-NpmCmd {
  Join-Path (Get-NodeRoot) "npm.cmd"
}

function Get-BunExe {
  Join-Path $Prefix "tools\bun\bin\bun.exe"
}

function Get-PythonExe {
  Join-Path $Prefix "tools\python\python.exe"
}

function Get-PostgresRoot {
  Join-Path $Prefix "tools\postgres"
}

function Install-Node {
  $nodeRoot = Get-NodeRoot
  $nodeExe = Get-NodeExe
  if (Test-Path $nodeExe) {
    Write-Step "Node already installed: $nodeExe"
    return
  }

  Write-Step "Installing Node $NodeVersion under $Prefix"
  if ($DryRun) {
    Write-Host "+ download and verify Node $NodeVersion"
    return
  }

  $arch = Get-Arch
  $baseUrl = "https://nodejs.org/dist/v$NodeVersion"
  $zipName = "node-v$NodeVersion-win-$arch.zip"
  $tmp = New-TempDir "node"
  try {
    $shaPath = Join-Path $tmp "SHASUMS256.txt"
    $zipPath = Join-Path $tmp $zipName
    Download-File "$baseUrl/SHASUMS256.txt" $shaPath
    Download-File "$baseUrl/$zipName" $zipPath
    $expected = (Select-String -Path $shaPath -Pattern "  $([regex]::Escape($zipName))$" | Select-Object -First 1).Line.Split(" ")[0]
    if (-not $expected) {
      throw "Could not resolve checksum for $zipName"
    }
    Assert-Sha256 $zipPath $expected "Node"
    New-Item -ItemType Directory -Force -Path (Join-Path $Prefix "tools") | Out-Null
    Remove-Item -Recurse -Force $nodeRoot -ErrorAction SilentlyContinue
    Expand-ZipFile $zipPath (Join-Path $Prefix "tools")
    Rename-Item -Path (Join-Path $Prefix "tools\node-v$NodeVersion-win-$arch") -NewName "node-v$NodeVersion"
  } finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
  }
}

function Get-BunAsset {
  switch (Get-Arch) {
    "arm64" {
      [pscustomobject]@{
        Name = "bun-windows-aarch64.zip"
        Sha256 = "89841f5a57f2348b67ec0839b718f4bf4ea7d07c371c9ba4b77b6c790f918953"
      }
      break
    }
    default {
      [pscustomobject]@{
        Name = "bun-windows-x64.zip"
        Sha256 = "0a0620930b6675d7ba440e81f4e0e00d3cfbe096c4b140d3fff02205e9e18922"
      }
    }
  }
}

function Install-Bun {
  $bunExe = Get-BunExe
  if (Test-Path $bunExe) {
    Write-Step "Bun already installed: $bunExe"
    return
  }

  Write-Step "Installing Bun $BunVersion under $Prefix"
  if ($DryRun) {
    Write-Host "+ download and verify Bun $BunVersion"
    return
  }

  $asset = Get-BunAsset
  $tmp = New-TempDir "bun"
  try {
    $zipPath = Join-Path $tmp $asset.Name
    $extractDir = Join-Path $tmp "extract"
    Download-File "https://github.com/oven-sh/bun/releases/download/bun-v$BunVersion/$($asset.Name)" $zipPath
    Assert-Sha256 $zipPath $asset.Sha256 "Bun"
    Expand-ZipFile $zipPath $extractDir
    $extracted = Get-ChildItem -Path $extractDir -Recurse -Filter bun.exe | Select-Object -First 1
    if (-not $extracted) {
      throw "Bun binary missing after extraction."
    }
    $bunDir = Split-Path $bunExe
    New-Item -ItemType Directory -Force -Path $bunDir | Out-Null
    Copy-Item -Force -LiteralPath $extracted.FullName -Destination $bunExe
  } finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
  }
}

function Install-Python {
  if ((Get-Arch) -ne "x64") {
    throw "Bundled Python NuGet package is currently configured for Windows x64 only."
  }
  $pythonRoot = Join-Path $Prefix "tools\python"
  $pythonExe = Get-PythonExe
  if (Test-Path $pythonExe) {
    Write-Step "Python already installed: $pythonExe"
    return
  }

  Write-Step "Installing Python $PythonVersion under $Prefix"
  if ($DryRun) {
    Write-Host "+ download and verify Python $PythonVersion NuGet package"
    return
  }

  $tmp = New-TempDir "python"
  try {
    $archiveName = Split-Path -Leaf $PythonUrl
    if (-not $archiveName) {
      $archiveName = "python.$PythonVersion.nupkg"
    }
    $archivePath = Join-Path $tmp $archiveName
    $extractDir = Join-Path $tmp "extract"
    New-Item -ItemType Directory -Force -Path $extractDir | Out-Null
    Download-File $PythonUrl $archivePath
    Assert-Sha256 $archivePath $PythonSha256 "Python"
    Expand-ZipFile $archivePath $extractDir
    $source = Join-Path $extractDir "tools"
    if (-not (Test-Path (Join-Path $source "python.exe"))) {
      throw "Python binary missing after extraction."
    }
    Remove-Item -Recurse -Force $pythonRoot -ErrorAction SilentlyContinue
    New-Item -ItemType Directory -Force -Path (Split-Path $pythonRoot) | Out-Null
    Move-Item -LiteralPath $source -Destination $pythonRoot
    & $pythonExe -c "import sys; raise SystemExit(0 if sys.version_info >= (3, 12) else 1)"
    if ($LASTEXITCODE -ne 0) {
      throw "Bundled Python failed self-check."
    }
    & $pythonExe -c "import subprocess, sys; subprocess.run([sys.executable, '-c', 'import sys; raise SystemExit(0)'], check=True)"
    if ($LASTEXITCODE -ne 0) {
      throw "Bundled Python subprocess self-check failed."
    }
  } finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
  }
}

function Install-Pgvector([string]$PostgresRoot) {
  $controlPath = Join-Path $PostgresRoot "share\extension\vector.control"
  $dllPath = Join-Path $PostgresRoot "lib\vector.dll"
  if ((Test-Path $controlPath) -and (Test-Path $dllPath)) {
    return
  }

  Write-Step "Installing pgvector $PgvectorTag into bundled PostgreSQL"
  if ($DryRun) {
    Write-Host "+ download and verify $PgvectorAsset"
    return
  }

  $tmp = New-TempDir "pgvector"
  try {
    $zipPath = Join-Path $tmp $PgvectorAsset
    $extractDir = Join-Path $tmp "extract"
    Download-File "https://github.com/andreiramani/pgvector_pgsql_windows/releases/download/$PgvectorTag/$PgvectorAsset" $zipPath
    Assert-Sha256 $zipPath $PgvectorSha256 "pgvector"
    Expand-ZipFile $zipPath $extractDir
    foreach ($dirName in @("include", "lib", "share")) {
      $source = Join-Path $extractDir $dirName
      if (Test-Path $source) {
        Copy-Item -Recurse -Force -LiteralPath $source -Destination $PostgresRoot
      }
    }
    if (-not ((Test-Path $controlPath) -and (Test-Path $dllPath))) {
      throw "pgvector files were not installed into bundled PostgreSQL."
    }
  } finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
  }
}

function Install-Postgres {
  if ($SkipPostgres) {
    Write-Step "Skipping bundled PostgreSQL install"
    return
  }
  if ((Get-Arch) -ne "x64") {
    throw "Bundled PostgreSQL binary ZIP is currently available for Windows x64 only. Use --SkipPostgres and external-postgres on this machine."
  }

  $postgresRoot = Get-PostgresRoot
  $pgCtl = Join-Path $postgresRoot "bin\pg_ctl.exe"
  $initdb = Join-Path $postgresRoot "bin\initdb.exe"
  if ((Test-Path $pgCtl) -and (Test-Path $initdb)) {
    Write-Step "PostgreSQL already installed: $postgresRoot"
    Install-Pgvector $postgresRoot
    return
  }

  Write-Step "Installing PostgreSQL $PostgresVersion under $Prefix"
  if ($DryRun) {
    Write-Host "+ download PostgreSQL $PostgresVersion Windows binaries"
    Write-Host "+ install pgvector $PgvectorTag"
    return
  }

  $tmp = New-TempDir "postgres"
  try {
    $zipName = Split-Path -Leaf $PostgresUrl
    if (-not $zipName) {
      $zipName = "postgresql-$PostgresVersion-windows-x64-binaries.zip"
    }
    $zipPath = Join-Path $tmp $zipName
    $extractDir = Join-Path $tmp "extract"
    Download-File $PostgresUrl $zipPath
    Assert-Sha256 $zipPath $PostgresSha256 "PostgreSQL"
    Expand-ZipFile $zipPath $extractDir
    $source = Join-Path $extractDir "pgsql"
    if (-not (Test-Path (Join-Path $source "bin\pg_ctl.exe"))) {
      throw "PostgreSQL binary ZIP layout is not recognized."
    }
    Remove-Item -Recurse -Force $postgresRoot -ErrorAction SilentlyContinue
    New-Item -ItemType Directory -Force -Path (Split-Path $postgresRoot) | Out-Null
    Move-Item -LiteralPath $source -Destination $postgresRoot
    Install-Pgvector $postgresRoot
  } finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
  }
}

function Ensure-Git {
  if (Get-Command git -ErrorAction SilentlyContinue) {
    return
  }
  throw "Git is required for --install-method git. Install Git for Windows or rerun with -InstallMethod npm."
}

function Checkout-Ref([string]$Dir, [string]$Ref) {
  if ($Ref -eq "main" -or $Ref -eq "master") {
    Invoke-Step { git -C $Dir fetch --no-tags origin $Ref } "git -C $Dir fetch --no-tags origin $Ref"
    Invoke-Step { git -C $Dir checkout $Ref } "git -C $Dir checkout $Ref"
    Invoke-Step { git -C $Dir pull --ff-only origin $Ref } "git -C $Dir pull --ff-only origin $Ref"
    return
  }
  Invoke-Step { git -C $Dir fetch --tags origin } "git -C $Dir fetch --tags origin"
  Invoke-Step { git -C $Dir checkout $Ref } "git -C $Dir checkout $Ref"
}

function Clone-Or-Update([string]$Name, [string]$Url, [string]$Dir, [string]$Ref) {
  Write-Step "Installing $Name"
  if (Test-Path (Join-Path $Dir ".git")) {
    Checkout-Ref $Dir $Ref
    return
  }
  if ((Test-Path $Dir) -and ((Get-ChildItem $Dir -Force | Measure-Object).Count -gt 0)) {
    throw "$Name target exists and is not empty: $Dir"
  }
  Invoke-Step { New-Item -ItemType Directory -Force -Path (Split-Path $Dir) | Out-Null } "mkdir $(Split-Path $Dir)"
  Invoke-Step { git clone $Url $Dir } "git clone $Url $Dir"
  Checkout-Ref $Dir $Ref
}

function Install-FromGit {
  Ensure-Git
  $appDir = Join-Path $Prefix "app"
  $brainDir = Join-Path $appDir "maek-brain"
  Clone-Or-Update "maek-brain" $BrainUrl $brainDir $Version
  Clone-Or-Update "gbrain-src" $GbrainUrl (Join-Path $brainDir "gbrain-src") $GbrainRef
  Clone-Or-Update "maek-brain-api" $ApiUrl (Join-Path $appDir "maek-brain-api") $Version
}

function Install-FromNpm {
  $nodeRoot = Get-NodeRoot
  $npm = Get-NpmCmd
  $requested = $Version
  if ($requested -eq "main" -or $requested -eq "master") {
    $requested = "latest"
  }
  $cacheDir = Join-Path $Prefix "cache\npm"
  Invoke-Step { New-Item -ItemType Directory -Force -Path $cacheDir | Out-Null } "mkdir $cacheDir"
  Invoke-Step { & $npm install -g --prefix $nodeRoot --cache $cacheDir --loglevel error --no-fund --no-audit "maek-brain@$requested" } "$npm install -g maek-brain@$requested"

  Ensure-Git
  $appDir = Join-Path $Prefix "app"
  $brainDir = Join-Path $appDir "maek-brain"
  $packageDir = Join-Path $nodeRoot "node_modules\maek-brain"
  if (-not $DryRun) {
    Remove-Item -Recurse -Force $brainDir -ErrorAction SilentlyContinue
    New-Item -ItemType Directory -Force -Path (Split-Path $brainDir) | Out-Null
    Copy-Item -Recurse -Force -LiteralPath $packageDir -Destination $brainDir
  } else {
    Write-Host "+ copy npm package to $brainDir"
  }
  Clone-Or-Update "gbrain-src" $GbrainUrl (Join-Path $brainDir "gbrain-src") $GbrainRef
  Clone-Or-Update "maek-brain-api" $ApiUrl (Join-Path $appDir "maek-brain-api") $Version
}

function Resolve-ReleasePackage {
  if ($ReleaseUrl) {
    return [pscustomobject]@{
      Url = $ReleaseUrl
      Sha256 = $ReleaseSha256
    }
  }

  if ($Version -eq "main" -or $Version -eq "master" -or $Version -eq "latest") {
    $manifestUrl = if ($ReleaseManifestUrl) { $ReleaseManifestUrl } else { "$ReleaseBaseUrl/latest.json" }
    $tmp = Join-Path (New-TempDir "release-manifest") "latest.json"
    Download-File $manifestUrl $tmp
    $manifest = Get-Content -Raw -Path $tmp | ConvertFrom-Json
    $url = if ($manifest.url) { $manifest.url } elseif ($manifest.zipUrl) { $manifest.zipUrl } else { $manifest.artifactUrl }
    if (-not $url) {
      throw "Release manifest is missing url."
    }
    return [pscustomobject]@{
      Url = [string]$url
      Sha256 = [string]$manifest.sha256
    }
  }

  $releaseVersion = $Version.TrimStart("v")
  [pscustomobject]@{
    Url = "$ReleaseBaseUrl/maek-brain-v$releaseVersion.zip"
    Sha256 = $ReleaseSha256
  }
}

function Get-ReleaseSha256([string]$Url, [string]$Sha256, [string]$TempDir) {
  if (-not [string]::IsNullOrWhiteSpace($Sha256)) {
    return $Sha256
  }
  $shaUrl = if ($ReleaseSha256Url) { $ReleaseSha256Url } else { "$Url.sha256" }
  $shaFile = Join-Path $TempDir "maek-brain.zip.sha256"
  Download-File $shaUrl $shaFile
  $content = Get-Content -Raw -Path $shaFile
  $match = [regex]::Match($content, "[a-fA-F0-9]{64}")
  if (-not $match.Success) {
    throw "Release checksum file did not contain a SHA256 value: $shaUrl"
  }
  $match.Value
}

function Find-ReleaseRoot([string]$ExtractDir) {
  if ((Test-Path (Join-Path $ExtractDir "maek-brain")) -and (Test-Path (Join-Path $ExtractDir "maek-brain-api"))) {
    return $ExtractDir
  }
  foreach ($child in Get-ChildItem -Path $ExtractDir -Directory) {
    if ((Test-Path (Join-Path $child.FullName "maek-brain")) -and (Test-Path (Join-Path $child.FullName "maek-brain-api"))) {
      return $child.FullName
    }
  }
  throw "Release package must contain maek-brain\ and maek-brain-api\."
}

function Install-FromRelease {
  if ($DryRun) {
    $source = if ($ReleaseUrl) { $ReleaseUrl } elseif ($ReleaseManifestUrl) { $ReleaseManifestUrl } else { "$ReleaseBaseUrl/latest.json" }
    Write-Step "Would install MAEK Brain release package from $source"
    return
  }

  $release = Resolve-ReleasePackage
  $tmp = New-TempDir "release"
  $zipPath = Join-Path $tmp "maek-brain.zip"
  Write-Step "Installing MAEK Brain release package"
  Download-File $release.Url $zipPath
  $sha256 = Get-ReleaseSha256 $release.Url $release.Sha256 $tmp
  Assert-Sha256 $zipPath $sha256 "MAEK Brain release"

  $extractDir = Join-Path $tmp "extract"
  Expand-ZipFile $zipPath $extractDir
  $root = Find-ReleaseRoot $extractDir
  $appDir = Join-Path $Prefix "app"
  $brainDir = Join-Path $appDir "maek-brain"
  $apiDir = Join-Path $appDir "maek-brain-api"
  New-Item -ItemType Directory -Force -Path $appDir | Out-Null
  Remove-Item -LiteralPath $brainDir,$apiDir -Recurse -Force -ErrorAction SilentlyContinue
  Copy-Item -Recurse -Force -LiteralPath (Join-Path $root "maek-brain") -Destination $brainDir
  Copy-Item -Recurse -Force -LiteralPath (Join-Path $root "maek-brain-api") -Destination $apiDir
  Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
}

function Copy-FileIfPresent([string]$Source, [string]$Target) {
  if (Test-Path $Source) {
    New-Item -ItemType Directory -Force -Path (Split-Path $Target) | Out-Null
    Copy-Item -Force -LiteralPath $Source -Destination $Target
  }
}

function Copy-DirIfPresent([string]$Source, [string]$Target) {
  if (Test-Path $Source) {
    Remove-Item -Recurse -Force $Target -ErrorAction SilentlyContinue
    New-Item -ItemType Directory -Force -Path (Split-Path $Target) | Out-Null
    Copy-Item -Recurse -Force -LiteralPath $Source -Destination $Target
  }
}

function Overlay-LocalSources {
  if ($DryRun) {
    return
  }
  if ($LocalBrainSource) {
    $brainTarget = Join-Path $Prefix "app\maek-brain"
    Write-Step "Overlaying local maek-brain checkout"
    Copy-FileIfPresent (Join-Path $LocalBrainSource "maek-brain.mjs") (Join-Path $brainTarget "maek-brain.mjs")
    Copy-FileIfPresent (Join-Path $LocalBrainSource "package.json") (Join-Path $brainTarget "package.json")
    Copy-FileIfPresent (Join-Path $LocalBrainSource "README.md") (Join-Path $brainTarget "README.md")
    Copy-DirIfPresent (Join-Path $LocalBrainSource "bin") (Join-Path $brainTarget "bin")
    Copy-DirIfPresent (Join-Path $LocalBrainSource "docs") (Join-Path $brainTarget "docs")
    Copy-DirIfPresent (Join-Path $LocalBrainSource "install") (Join-Path $brainTarget "install")
  }
  if ($LocalApiSource) {
    $apiTarget = Join-Path $Prefix "app\maek-brain-api"
    Write-Step "Overlaying local maek-brain-api checkout"
    Copy-FileIfPresent (Join-Path $LocalApiSource "README.md") (Join-Path $apiTarget "README.md")
    Copy-FileIfPresent (Join-Path $LocalApiSource "requirements.txt") (Join-Path $apiTarget "requirements.txt")
    Copy-DirIfPresent (Join-Path $LocalApiSource "app") (Join-Path $apiTarget "app")
  }
}

function Remove-GbrainPgliteDependency {
  $packageJson = Join-Path $Prefix "app\maek-brain\gbrain-src\package.json"
  if (-not (Test-Path $packageJson)) {
    return
  }
  if ($DryRun) {
    Write-Host "+ remove unused @electric-sql/pglite dependency from $packageJson"
    return
  }
  $json = Get-Content -Raw -Path $packageJson | ConvertFrom-Json
  $changed = $false
  if ($json.dependencies -and $json.dependencies.PSObject.Properties.Name -contains "@electric-sql/pglite") {
    $json.dependencies.PSObject.Properties.Remove("@electric-sql/pglite")
    $changed = $true
  }
  if ($json.trustedDependencies) {
    $filtered = @($json.trustedDependencies | Where-Object { $_ -ne "@electric-sql/pglite" })
    if ($filtered.Count -ne $json.trustedDependencies.Count) {
      $json.trustedDependencies = $filtered
      $changed = $true
    }
  }
  if ($changed) {
    Write-Step "Removing unused pglite dependency from gbrain-src"
    $json | ConvertTo-Json -Depth 50 | Set-Content -Encoding UTF8 -Path $packageJson
  }
}

function Setup-GbrainDeps {
  if ($SkipGbrainDeps) {
    Write-Step "Skipping gbrain-src Bun dependencies"
    return
  }
  $gbrainDir = Join-Path $Prefix "app\maek-brain\gbrain-src"
  $packageJson = Join-Path $gbrainDir "package.json"
  if (-not (Test-Path $packageJson)) {
    Write-Step "Skipping gbrain-src dependencies; package.json is missing"
    return
  }
  Write-Step "Installing gbrain-src Bun dependencies"
  if ($DryRun) {
    Write-Host "+ bun install --backend=copyfile --no-cache --ignore-scripts in $gbrainDir"
    return
  }
  $bun = Get-BunExe
  $nodeRoot = Get-NodeRoot
  $cacheDir = Join-Path $Prefix "cache\bun"
  $tmpDir = Join-Path $Prefix "cache\tmp"
  New-Item -ItemType Directory -Force -Path $cacheDir | Out-Null
  New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null
  $oldPath = $env:PATH
  $oldCache = $env:BUN_INSTALL_CACHE_DIR
  $oldTemp = $env:TEMP
  $oldTmp = $env:TMP
  try {
    $env:PATH = "$(Split-Path $bun);$nodeRoot;$env:PATH"
    $env:BUN_INSTALL_CACHE_DIR = $cacheDir
    $env:TEMP = $tmpDir
    $env:TMP = $tmpDir
    Push-Location $gbrainDir
    $status = Invoke-Step { & $bun install --backend=copyfile --no-cache --ignore-scripts } "$bun install --backend=copyfile --no-cache --ignore-scripts" -AllowFailure
    if ($status -ne 0) {
      Write-Step "Bun install failed; clearing prefix-local Bun cache and retrying"
      Remove-Item -Recurse -Force $cacheDir -ErrorAction SilentlyContinue
      New-Item -ItemType Directory -Force -Path $cacheDir | Out-Null
      Invoke-Step { & $bun install --backend=copyfile --no-cache --ignore-scripts } "$bun install --backend=copyfile --no-cache --ignore-scripts"
    }
  } finally {
    Pop-Location
    $env:PATH = $oldPath
    $env:BUN_INSTALL_CACHE_DIR = $oldCache
    $env:TEMP = $oldTemp
    $env:TMP = $oldTmp
  }
}

function Setup-ApiVenv {
  if ($SkipApiVenv) {
    Write-Step "Skipping maek-brain-api Python venv"
    return
  }
  $apiDir = Join-Path $Prefix "app\maek-brain-api"
  $requirements = Join-Path $apiDir "requirements.txt"
  if (-not (Test-Path $requirements)) {
    Write-Step "Skipping API venv; requirements.txt is missing"
    return
  }
  Write-Step "Preparing maek-brain-api Python environment"
  if ($DryRun) {
    Write-Host "+ python -m venv $apiDir\.venv"
    Write-Host "+ pip install -r $requirements"
    return
  }
  $python = Get-PythonExe
  $venvPython = Join-Path $apiDir ".venv\Scripts\python.exe"
  $pipCache = Join-Path $Prefix "cache\pip"
  New-Item -ItemType Directory -Force -Path $pipCache | Out-Null
  Invoke-Step { & $python -m venv (Join-Path $apiDir ".venv") } "$python -m venv $apiDir\.venv"
  Invoke-Step { & $venvPython -m pip install --disable-pip-version-check --cache-dir $pipCache --upgrade pip } "$venvPython -m pip install --upgrade pip"
  Invoke-Step { & $venvPython -m pip install --disable-pip-version-check --cache-dir $pipCache -r $requirements } "$venvPython -m pip install -r $requirements"
}

function Write-Wrapper {
  $binDir = Join-Path $Prefix "bin"
  $cmdPath = Join-Path $binDir "maek-brain.cmd"
  $nodeExe = Get-NodeExe
  $bunExe = Get-BunExe
  $pythonExe = Get-PythonExe
  if ($InstallMethod -eq "npm") {
    $entry = Join-Path (Get-NodeRoot) "node_modules\maek-brain\maek-brain.mjs"
  } else {
    $entry = Join-Path $Prefix "app\maek-brain\maek-brain.mjs"
  }
  Invoke-Step { New-Item -ItemType Directory -Force -Path $binDir | Out-Null } "mkdir $binDir"
  if ($DryRun) {
    Write-Host "+ write $cmdPath"
    return
  }
  @"
@echo off
set "MAEK_PREFIX=$Prefix"
set "MAEK_BUN_BIN=$bunExe"
set "MAEK_PYTHON_BIN=$pythonExe"
set "PATH=$(Split-Path $pythonExe);$(Split-Path $bunExe);$(Get-NodeRoot);%PATH%"
"$nodeExe" "$entry" %*
"@ | Set-Content -Encoding ASCII -Path $cmdPath
}

Install-Node
Install-Bun
Install-Python
Install-Postgres
if ($InstallMethod -eq "release") {
  Install-FromRelease
} elseif ($InstallMethod -eq "git") {
  Install-FromGit
} else {
  Install-FromNpm
}
Overlay-LocalSources
Remove-GbrainPgliteDependency
Setup-GbrainDeps
Setup-ApiVenv
Write-Wrapper

Write-Host "MAEK Brain installed."
Write-Host "Prefix: $Prefix"
Write-Host "CLI: $Prefix\bin\maek-brain.cmd"
if (-not $NoOnboard -and -not $DryRun) {
  $onboardArgs = @("onboard", "--install-daemon")
  if (-not [string]::IsNullOrWhiteSpace($ApiHost)) {
    $onboardArgs += @("--host", $ApiHost)
  }
  if ($ApiPort -gt 0) {
    $onboardArgs += @("--port", [string]$ApiPort)
  }
  if ($script:MaekVerbose) {
    $onboardArgs += "--verbose"
  }
  & (Join-Path $Prefix "bin\maek-brain.cmd") @onboardArgs
  if ($OpenFirewallRequested) {
    Ensure-WindowsFirewallRule -Port (Get-ConfiguredApiPort) -RemoteAddress $FirewallRemoteAddress
  }
} elseif ($OpenFirewallRequested) {
  Ensure-WindowsFirewallRule -Port (Get-ConfiguredApiPort) -RemoteAddress $FirewallRemoteAddress
}
