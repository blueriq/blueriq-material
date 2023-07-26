export class DashboardError {
  constructor(readonly message: string) {
  }
}

export const EMPTY: DashboardError = new DashboardError('');
