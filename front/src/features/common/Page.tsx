import React from 'react';

type OwnProps = {};

// @ts-expect-error ts-migrate(2565) FIXME: Property 'defaultProps' is used before being assig... Remove this comment to see the full error message
type Props = OwnProps & typeof Page.defaultProps;
// import PropTypes from 'prop-types';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type 'OwnPro... Remove this comment to see the full error message
export default function Page({ children }: Props) {
  return <div className="common-page">{children}</div>;
}
Page.defaultProps = {};
