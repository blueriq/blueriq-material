### External Container
This component will be rendered for a container with the `AQ_ExternalContainer` container type.
The modeled display name will be shown at the top of the widget.

The session (and implicitly, the flow) of the external project is rendered inside this container.

External project containers are similar to flow widgets in that they start a new flow in a new, independent session.
The main differences between external containers and flow widgets are:
- the session of the external project container is not a child of the dashboard session
- the flow of the external project container can be defined in another project
- the profile of the new session is initialized using an interface profile and a forward mapping pair: 
  - dashboard profile -> interface profile
  - interface -> external flow
- the external project container has exit events which map one-to-one with the exits of the external flow
- when the flow in the external project container ends, the flow of the dashboard page continues with the corresponding exit event on the container
- the results of the external flow are communicated to the dashboard using the backward mapping pair:
  - interface <- external flow
  - dashboard profile <- interface profile
- the use of portal messages is not required in order to transfer data between the dashboard flow and the external flow
- when no portal messages are used, dashboard projects are scalable and support failover
- unlike the flow widget which requires one call to create the flow widget session, the external project container uses two calls:
  - an initialize call which executes the dashboard profile -> interface profile mapping and stores the interface profile
  - a start call which reads the stored interface profile, executes the interface profile -> external profile mapping and starts the flow
  
From the frontend's perspective, these differences are handled transparently using the `ExternalContainer` service from `@blueriq/angular`.

**Note**: this container is available in the Blueriq Runtime starting with release 12.0 using the V2 API. If you are still using an older
version of Blueriq, this component will not be used but would also not introduce incompatibilities so it can be kept around safely.
