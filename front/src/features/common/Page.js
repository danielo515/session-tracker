import React from 'react';
// import PropTypes from 'prop-types';

export default function Page({ children, scroll = false }) {
  return <div className={`common-page ${scroll ? 'page-scroll' : ''}`}>{children}</div>;
}

Page.propTypes = {};
Page.defaultProps = {};
