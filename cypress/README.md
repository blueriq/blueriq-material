# Prerequisites

* A Blueriq license file is required before starting docker. Copy the license to `./docker/config`
* If for any reason another version of Blueriq Runtime needs to be tested this could be achieved by doing the following:
  * Go to `prepare.cmd` and change the version number on top
  * OR put a war in `./cypress/docker/preparations`, check the Dockerfile.Runtime what the name should be so docker
    actually copies this war to its container

# How to test
Run `yarn e2e:dev` to execute the end-to-end tests via Cypress when you everything running from docker
This will first start docker with a runtime, customerdata and dcm list and after completion it will start the Cypress UI

Run `yarn e2e:local` to execute the end-to-end tests via Cypress when you everything running from your local environment (make sure to check your ports!)

## Visual regression testing

The chosen library for visual regression testing is `cypress-image-diff-js`. 
This library creates slightly different screenshots based on the machine. 
The baseline screenshots from the CI are used to avoid these differences on CI. 

### Updating the baseline

In order to update the baseline, the following steps need to be taken:
* Run the `blueriq-material-e2e-cypress` job on CI (with the desired branch selected).
* Navigate to the `comparison` directory on the CI job build artifacts and download the created screenshots.
* Copy the contents of the downloaded `comparison` directory to the `../cypress-visual-screenshots/baseline` directory.


