import React from 'react';
// import PropTypes from 'prop-types';

export default function Page({ children, className = '', scroll = false }) {
  return (
    <div className={`${className} common-page ${scroll ? 'page-scroll' : ''}`}>{children}</div>
  );
}

Page.propTypes = {};
Page.defaultProps = {};
