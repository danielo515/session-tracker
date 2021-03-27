export type Session = {
  name: string;
  /**
   * Iso date format
   */
  startDate: string;
  /**
   * Iso date format
   */
  endDate?: string;
  id: string;
};

export type SessionWithDuration = {
  name: string;
  startDate: string;
  endDate?: string;
  id: string;
  duration: number;
};

export type RunningSession = {
  name: string;
  startDate: string;
};

export interface SessionGroup {
  name: string;
  total: number;
  lastRun: string;
  sessions: Session[];
}

export interface Route {
  path: string;
  name: string;
  isIndex?: boolean;
  component?: any;
  childRoutes?: Route[];
  exact?: boolean;
}

export interface IndexRoute extends Route {
  exact: boolean;
  autoIndexRoute: boolean;
}
