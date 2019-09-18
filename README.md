## Development server
Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
If your Blueriq runtime is not at `http://localhost:10080`, set the environment variable `BQ_MATERIAL_NG_PROXY_TARGET_URL`

## Install
Run `yarn install` to install required dependencies. Note that before installing the dependencies for the first time 
after cloning the Blueriq Material Theme from Github, you should remove the `yarn.lock` file. Running `yarn install` 
will generate your own `yarn.lock` file.

## Build
Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running lints
Run `yarn lint` to execute the lints via [tslint](https://palantir.github.io/tslint/rules/).

## All together
Run `yarn verify:all` to run all linting and tests with code-coverage

## Running end-to-end tests
Run `yarn e2e:dev` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
If your dev server is not at `http://localhost:4200/`, pass `--baseUrl MY_DEV_URL` to Yarn. Replace `MY_DEV_URL` with the correct URL.

## Further help
This project was generated with [Angular CLI](https://github.com/angular/angular-cli).
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
