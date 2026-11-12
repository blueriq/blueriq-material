param(
  [string] $RuntimeBranch = 'master',
  [string] $RuntimeUrl = 'git@bq-gitlab.everest.nl:blueriq/blueriq.git',
  [switch] $InNetwork,
  [switch] $ComposeOnly,
  [switch] $SkipCompose
)

. "$PSScriptRoot/prepare-common.ps1"

$env:RUNTIME_IMAGE_BRANCH = $RuntimeBranch.ToLower()

if (-not $ComposeOnly) {
  Reset-Preparations
  $runtime = Get-RuntimeProperties $RuntimeUrl $RuntimeBranch
  Copy-MavenArtifact 'blueriq-customerdata-sql-store-standalone-rest' $runtime.'com.blueriq.customerdata.api.version'
  Copy-Frontend
}

if ($SkipCompose) { exit 0 }

$composeArgs = @('--file', 'cypress/docker/docker-compose.yml')
if (-not $InNetwork) { $composeArgs += @('--file', 'cypress/docker/docker-compose.ports.yml') }
Start-ComposeStack $composeArgs
