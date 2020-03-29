import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Copyright } from '../common/Copyright';
import { Version } from '../common/Version';

export default class FooterWithVersion extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const classNames = ["common-footer-with-version", this.props.className].join(' ')
    return (
      <div className={classNames}>
        <Copyright />
        <Version />
      </div>
    );
  }
}

FooterWithVersion.defaultProps = {
  className: ''
};