$ErrorActionPreference = 'Stop'
Set-Location (Resolve-Path "$PSScriptRoot/../..")
$Preparations = 'cypress/docker/preparations'

function Invoke-Checked([scriptblock] $Command) {
  & $Command
  if ($LASTEXITCODE -ne 0) { throw "Exit code ${LASTEXITCODE}: $Command" }
}

function Reset-Preparations {
  if (Test-Path $Preparations) { Remove-Item $Preparations -Recurse -Force }
}

function Get-RuntimeProperties([string] $RuntimeUrl, [string] $RuntimeBranch) {
  New-Item -ItemType Directory -Force $Preparations | Out-Null
  $archive = "$Preparations/runtime-parent-pom.tar"
  Invoke-Checked { git archive --remote=$RuntimeUrl --output=$archive $RuntimeBranch Runtime/parent/pom.xml }
  Invoke-Checked { & "$env:SystemRoot\System32\tar.exe" -x -f $archive -C $Preparations }
  ([xml](Get-Content "$Preparations/Runtime/parent/pom.xml")).project.properties
}

function Copy-MavenArtifact([string] $ArtifactId, [string] $Version) {
  Invoke-Checked { mvn -B dependency:copy "-Dartifact=com.blueriq:${ArtifactId}:${Version}:jar" "-DoutputDirectory=$Preparations" }
}

function Copy-Frontend {
  $target = "$Preparations/dist"
  New-Item -ItemType Directory -Force $target | Out-Null
  Copy-Item dist/* $target -Recurse -Force
}

function Start-ComposeStack([string[]] $ComposeArgs) {
  Invoke-Checked { docker-compose --compatibility @ComposeArgs build --pull }
  Invoke-Checked { docker-compose --compatibility @ComposeArgs up -d }
}
