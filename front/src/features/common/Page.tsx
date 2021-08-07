import React from 'react';
// import PropTypes from 'prop-types';

export default function Page({ children }) {
  return <div className="common-page">{children}</div>;
}

Page.propTypes = {};
Page.defaultProps = {};
