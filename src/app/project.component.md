### Project component
This component allows users to start a Blueriq application. 
A Blueriq application can be started in different ways. For the options described below, Angular Routes are 
configured. The available options are:
* Providing the name of a configured Blueriq application shortcut
  * Example URL: `https://{HOST}/shortcut/{SHORTCUT_NAME}` (Angular route: `{'shortcut/:shortcut'}`)
* Providing a flow name for a specific Blueriq application
  * Example URL: `https://{HOST}/flow/{PROJECT_NAME}/{FLOW_NAME}` (Angular route: `{'flow/:project/:flow'}`)
    * Optionally a version can be provided. If not provided, the default version will be started
      * Example URL: `https://{HOST}/flow/{PROJECT_NAME}/{FLOW_NAME}/{VERSION_NAME}` (Angular route: 
      `{'flow/:project/:flow/:version'}`)
    * Optionally a language code can be provided to start a project in a specific language. If not provided, the default
     language is used.
      * Example URL: `https://{HOST}/flow/{PROJECT_NAME}/{FLOW_NAME}/{LANGUAGE_CODE}` (Angular route: 
      `{'flow/:project/:flow/:version/:language'}`)
* Providing a Session Id for an already started Blueriq application (for you HTTP session)
  * Example URL: `https://{HOST}/session/{SESSION_ID}` (Angular route: `{'session/:sessionId'}`)
* By starting the default shortcut configured in the Blueriq Runtime
  * Example URL: `https://{HOST}/shortcut/default` (Angular route: `{'shortcut/default'}`)
 
Additionally, when no route is provided, the default shortcut is started.
Angular route: `{'**', redirectTo: 'shortcut/default', pathMatch: 'full'}`
