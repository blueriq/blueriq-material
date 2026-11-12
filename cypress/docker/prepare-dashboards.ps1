param(
  [string] $RuntimeBranch = 'master',
  [string] $RuntimeUrl = 'git@bq-gitlab.everest.nl:blueriq/blueriq.git',
  [switch] $InNetwork,
  [switch] $ComposeOnly,
  [switch] $SkipCompose,
  [switch] $KeepPreparations
)

. "$PSScriptRoot/prepare-common.ps1"

$env:RUNTIME_IMAGE_BRANCH = $RuntimeBranch.ToLower()

if (-not $ComposeOnly) {
  if (-not $KeepPreparations) { Reset-Preparations }
  $runtime = Get-RuntimeProperties $RuntimeUrl $RuntimeBranch
  Copy-MavenArtifact 'blueriq-dcm-lists-standalone' $runtime.'com.blueriq.dcm.lists.api.version'
  Copy-MavenArtifact 'blueriq-dcm-dashboard-service-standalone' $runtime.'com.blueriq.dcm.dashboard.version'
  Copy-MavenArtifact 'blueriq-gateway-service' $runtime.'com.blueriq.gateway.version'
  Copy-Frontend
}

if ($SkipCompose) { exit 0 }

if ($InNetwork) {
  $dockerEnv = @('FRONTEND_HOST=e2e-blueriq-material-theme', 'KEYCLOAK_HOST=e2e-keycloak:8080', 'HOST_PORT=80')
  $composeFiles = @('--file', 'cypress/docker/dashboards/docker-compose.yml')
} else {
  $dockerEnv = @('FRONTEND_HOST=host.docker.internal:9081', 'KEYCLOAK_HOST=host.docker.internal:9079', 'HOST_PORT=9081')
  $composeFiles = @('--file', 'cypress/docker/dashboards/docker-compose.yml', '--file', 'cypress/docker/dashboards/docker-compose.ports.yml')
}
$dockerEnv | Set-Content -Encoding ascii "$Preparations/.dockerEnv"

Start-ComposeStack ($composeFiles + @('--env-file', "$Preparations/.dockerEnv"))
