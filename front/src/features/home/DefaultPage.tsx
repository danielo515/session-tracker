import React, { ReactNode } from 'react';
import Navigation from '../common/Navigation';

type Props = {
  location: {
    pathname: string;
  };
  children: ReactNode;
};

export const DefaultPage = (props: Props) => {
  const { pathname } = props.location; // default to root page name

  return (
    <React.Fragment>
      <Navigation page={pathname} />
      {props.children}
    </React.Fragment>
  );
};

export default DefaultPage;
