# Blueriq with Angular

This document briefly describes how to get started with Angular development.

## Installing tools

### Node.js

You need Node.js to start developing an Angular application. [Download the LTS version][NodeJS]
and run to installer.

### Yarn

Yarn is an alternative to Node's default package manager NPM and is known to be much faster than NPM. Open a command
prompt and install Yarn globally:

```
npm install -g yarn
```

Verify that it works and that you have at least v.1.4.0 by running `yarn --version`.

> Yarn is required to properly resolve dependencies, given that we rely on its workspaces feature that NPM does not have.

### Chrome extensions

For Angular development, [Augury] is a convenient Chrome extension to inspect your app. To
observe events, consider installing the [Redux DevTools plugin].

## Adjust configuration

### Configure NPM repository

Create an `.npmrc` file in your user directory with the following:

```
registry = "http://bq-artifactory.everest.nl:8080/artifactory/api/npm/yarn/"
_authToken = <your-auth-token>
always-auth = true
 
# Configure an authentication token for artifactory.blueriq.com for actual tarball downloads
//artifactory.blueriq.com/artifactory/api/npm/yarn/:_authToken=<your-auth-token>
//artifactory.blueriq.com/artifactory/api/npm/yarn/:always-auth=true
```

> Normally, you should be able to authenticate using Basic auth. Due to an issue with our reverse proxy we have to
configure our internal server as primary repository. The tarballs however are requested through the reverse proxy
for which we need to instruct NPM to apply the authentication token as well. Due to a bug in Yarn, only Bearer tokens
are considered for such secondary registries, so only _authToken can be used properly. You can request your Bearer
token by executing the following curl request
```
curl -u<username>:<password> -XPOST http://artifactory.blueriq.com/artifactory/api/security/token -d "username=<username>" -d "expires_in=0"
```

### Install dependencies

Run `yarn install` to download third party dependencies into node_modules.

### Configure Angular CLI

Instruct the Angular CLI to use Yarn by default:

```
yarn ng set --global packageManager=yarn
```

> We use `yarn ng` instead of `ng` directly in order to use the Angular CLI binary from our own node_modules folder.
This way we do not need the Angular CLI to be globally installed.

### Configure proxy

In order to reach a Blueriq runtime through the development server's port (to avoid cross-origin request limitations)
a [proxy redirect must be configured][proxy.conf.json]. An example configuration is provided in `/proxy.conf.json.example`, copy this file
to `/proxy.json.conf` and change it to suit your needs. Changes to `/proxy.json.conf` are ignored by Git.

### IntelliJ code formatter

For IntelliJ/WebStorm, a codestyle profile is available in `/intellij-codestyle.xml` that should be activated for consistent code formatting.

## Useful commands

The Angular CLI provides some easy to use commands.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code linting

Run `ng lint` to verify the codebase against common code standards.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma].

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor].

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README].

[NodeJS]: https://nodejs.org/en/download/
[Augury]: https://augury.angular.io
[Redux DevTools plugin]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
[proxy.conf.json]: https://github.com/angular/angular-cli/blob/f72472291414552d9deaf6e6b919c6e651395e2e/docs/documentation/stories/proxy.md
[Karma]: https://karma-runner.github.io
[Protractor]: http://www.protractortest.org/
[Angular CLI README]: https://github.com/angular/angular-cli/blob/master/README.md
