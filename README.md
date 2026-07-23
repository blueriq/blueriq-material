## Development server
Run `pnpm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
If your Blueriq runtime is not at `http://localhost:10080`, set the environment variable `BQ_MATERIAL_NG_PROXY_TARGET_URL`

## Install
Run `pnpm install` to install required dependencies.

## Build
Run `pnpm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `pnpm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running lints
Run `pnpm run lint` to execute the lints via eslint

## All together
Run `pnpm run verify:all` to run all linting and tests with code-coverage

## Running end-to-end tests
Run `pnpm run e2e:dev` to execute the end-to-end tests via Cypress.

## Further help
This project was generated with [Angular CLI](https://github.com/angular/angular-cli).
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
