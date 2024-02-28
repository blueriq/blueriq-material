export abstract class DashboardError {
}

export class DashboardMessageError extends DashboardError {
  constructor(readonly message: string) {
    super();
  }
}

export class DashboardUnauthorizedError extends DashboardError {
}

