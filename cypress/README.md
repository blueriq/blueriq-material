# Prerequisites

* A Blueriq license file is required before starting docker. Copy the license to `./docker/config`
* The Runtime and Case Engine come from the `runtime-test-container-<branch>` and `case-engine-test-container-<branch>`
  images that the Blueriq branch build pushes; the service versions are read from that branch's `Runtime/parent/pom.xml`.
  The branch defaults to `master`; pass `-runtimeBranch <branch>` to the prepare scripts to test a specific branch.

# How to test
Run `pnpm run e2e:dev` to execute the end-to-end tests via Cypress when you want to run everything from docker
This will first start docker with a runtime, customer data and dcm list and after completion it will start the Cypress UI

Run `pnpm run e2e:local` to execute the end-to-end tests via Cypress when you everything running from your local environment (make sure to check your ports!)

## Visual regression testing

The chosen library for visual regression testing is `cypress-image-diff-js`. 
This library creates slightly different screenshots based on the machine. 
The baseline screenshots from the CI are used to avoid these differences on CI. 

### Updating the baseline

In order to update the baseline, the following steps need to be taken:
* Run the `blueriq-material-e2e-cypress` job on CI (with the desired branch selected).
* Navigate to the `comparison` directory on the CI job build artifacts and download the created screenshots.
* Copy the contents of the downloaded `comparison` directory to the `../cypress-visual-screenshots/baseline` directory.


