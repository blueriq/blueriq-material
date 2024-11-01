### Dashboard component

This component allows users to start a Blueriq DCM Dashboard application.
A Blueriq DCM Dashboard application can be started in different ways. For the options described below, Angular Routes are
configured in the `app.module.ts` file.

### Start a dashboard configured in the Blueriq DCM Dashboard by a project reference, project version, dashboard name and a page name

The project reference is build up by the following structures:

- `{datasource}-{project_name}`
- `{datasource}-{repository}-{project_name}`

Which could form the following examples:

- export-foundation
- studio-foundation-foundation

The version is the branch name of the project in Encore.

> _URL format:_ `https://{HOST}/dashboard/{PROJECT_REFERENCE}/{VERSION}/{DASHBOARD_NAME}/{PAGE_NAME}`

### Start a dashboard configured in the Blueriq DCM Dashboard by shortcut

> _URL format:_ `https://{HOST}/dashboard/shortcut/{SHORTCUT_NAME}`

### Start a dashboard configured in the Blueriq DCM Dashboard by shortcut and a page

> _URL format:_ `https://{HOST}/dashboard/shortcut/{SHORTCUT_NAME}/{PAGE_NAME}`  
