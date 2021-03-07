export type Session = {
  name: string;
  startDate: string;
  endDate?: string;
  id: string;
};
export type RunningSession = {
  name: string;
  startDate: string;
};

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
