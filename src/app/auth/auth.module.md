### Authentication

The Material theme offers two modes of authentication out of the box:
1. OpenId Connect
2. Direct Runtime Authentication

By default, it is first attempted to authenticate using OpenId Connect, with graceful fallback behavior to
authenticate in the Runtime. This setup is chosen such that we support OpenId Connect out of the box, while
still allowing to work on a Runtime that is not configured to use OpenId Connect, or simply does not have
support for it all.

### Removing OpenId Connect Support

If you are not using OpenId Connect at all, you may want to remove the support for it from the theme entirely.
For this reason, the OpenId Connect logic is incorporated into this single Angular module. Below is a number
of steps to complete to fully remove OpenId Connect support from the theme:

1. Remove the OpenId callback verification endpoint from `./routes.ts`. Also remove the `canActivate` guard from the login component.
2. Remove the `OpenIdConnectAuth` injected service from `AuthService`'s constructor. Since most of the logic is OpenId Connect specific, clean up the parts that you no longer need.
3. Remove the `./openid.ts` connect folder relative to this file.
4. Remove the `OpenIdConnectAuthModule` import from `AuthModule` and get rid of any declarations for OpenId Connect components.
