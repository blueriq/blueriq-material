### Project component
This component makes it possible for users to start a Blueriq application. 
A Blueriq application can be started in different ways. For the options described below Angular Routes are configured. The available options are:
* by providing the name of a configured Blueriq application shortcut
  * Example url: https://{HOST}/shortcut/{SHORTCUT_NAME} (Angular route: {'shortcut/:shortcut'})
* by providing an Flow-name for a specific Blueriq application
  * Example url: https://{HOST}/flow/{PROJECT_NAME}/{FLOW_NAME} (Angular route: {'flow/:project/:flow'})
    * Optionally a version can be provided, if not provided the default version will be started
      * Example url: https://{HOST}/flow/{PROJECT_NAME}/{FLOW_NAME}/{VERSION_NAME} (Angular route: {'flow/:project/:flow/:version'})
    * Optionally a language code can be provided to start a project in a specific language, if not provided the default language is used.
      * Example url: https://{HOST}/flow/{PROJECT_NAME}/{FLOW_NAME}/{LANGUAGE_CODE} (Angular route: {'flow/:project/:flow/:version/:language'})
* by sessionId for an already started Blueriq application(for you HTTP-session)
  * Example url: https://{HOST}/session/{SESSION_ID} (Angular route: {'session/:sessionId'})
* by starting the default shortcut configured in the Blueriq Runtime
  * Example url: https://{HOST}/shortcut/default (Angular route: {'shortcut/default'})
 
Additionally when no route is provided the default shortcut is started.
Angular route: {'**', redirectTo: 'shortcut/default', pathMatch: 'full'}
