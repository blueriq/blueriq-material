### Login component
The login component will be routed to when the user needs to authenticate. After authentication, if a flow was
passed, it will be started. Otherwise, the default shortcut will be started.

Note that logging out and logging in again will start the default shortcut by default. As the behavior is highly
dependant on the projects available on the runtime, you are encouraged to customize this component according 
to your needs.
