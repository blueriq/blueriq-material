# DCM Dashboard
Besides regular Blueriq UI components this repository now also includes specific components to use in a Blueriq application that servers as a dashboard.

MyBlueriq documentation on DCM dashboard UI: https://my.blueriq.com/pages/viewpage.action?pageId=166822999

## Dashboard module
The `DashboardModule` is an Angular module that loads under the root routing path `/dashboard`.
The path following this root should be the name of a dashboard definition that is retrieved from a configurable endpoint inside `environment.ts`.
You can use the module as is or use it as a template to build on.
No extra steps are required on making it work expect of course having the right backend services running.
Find a more detailed explanation on how and what on MyBlueriq.
