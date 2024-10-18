### Dashboard component

This component allows users to start a Blueriq DCM Dashboard application.
A Blueriq DCM Dashboard application can be started in different ways. For the options described below, Angular Routes are
configured in the `app.module.ts` file.

### Start a dashboard configured in the Blueriq Dcm Dashboard by a project reference, dashboard name and a page name

The project reference is build up by the following structures:

- `{datasource}-{project_name}:{version}`
- `{datasource}-{repository}-{project_name}:{version}`

Which could form the following examples:

- export-foundation:V7_3_0
- studio-foundation-foundation:V7_3_0

> _URL format:_ `https://{HOST}/dashboard/{PROJECT_REFERENCE}/{DASHBOARD_NAME}/{PAGE_NAME}`  

