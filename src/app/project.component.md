### Project component
This component allows users to start a Blueriq application. 
A Blueriq application can be started in different ways. For the options described below, Angular Routes are 
configured in the `app.module.ts` file.

### Start a shortcut configured in the Blueriq Runtime
> _URL format:_ `https://{HOST}/shortcut/{SHORTCUT_NAME}`  

### Start the default shortcut configured in the Blueriq Runtime
> _URL format:_ `https://{HOST}/shortcut/default`  
  
### Start a flow for a specific Blueriq application
> _URL format:_ `https://{HOST}/flow/{PROJECT_NAME}/{FLOW_NAME}`  
 
Optionally, a version can be provided. If not provided, the default version will be started:
> _URL format:_ `https://{HOST}/flow/{PROJECT_NAME}/{FLOW_NAME}/{VERSION_NAME}`  
      
Optionally, a language code can be provided to start a project in a specific language. If not provided, the default
     language is used:
> _URL format:_ `https://{HOST}/flow/{PROJECT_NAME}/{FLOW_NAME}/{VERSION_NAME}/{LANGUAGE_CODE}`  

### Provide a Session Id for an already started Blueriq application (for your HTTP session)
> _URL format:_ `https://{HOST}/session/{SESSION_ID}`
 
Additionally, for any other route, the user will be redirected to the default shortcut.
