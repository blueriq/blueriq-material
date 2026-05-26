@Library('cve-checks') _

nodePipeline {
  cveCheck.yarn1(name: 'material-theme')
}
