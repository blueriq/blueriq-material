### OpenId Connect Verify component

The OpenIdConnectVerify component will be routed to as callback endpoint from an OpenId Connect provider's login mechanism.
The route is guarded by the OpenIdConnectVerifyGuard that verifies the provided data with the Blueriq Runtime. If successful,
it will immediately route away from this component, preventing it from ever activating.

If verification fails, the routing is allowed to proceed such that this component is actually being activated. That means
that this component is only ever shown in case of an error situation, hence the component always shows an error.
