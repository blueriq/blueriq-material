# Prerequisites

* A Blueriq license file is required before starting docker. Copy the license to `./docker/config`
* If for any reason another version of Blueriq Runtime needs to be tested this could be achieved by doing the following:
  * Go to `prepare.cmd` and change the version number on top
  * OR put a war in `./cypress/docker/preparations`, check the Dockerfile.Runtime what the name should be so docker
    actually copies this war to its container

# How to test

Run `yarn e2e:dev` to execute the end-to-end tests via Cypress.
This will first start docker with a runtime, customerdata and dcm list and after completion it will start the Cypress UI
