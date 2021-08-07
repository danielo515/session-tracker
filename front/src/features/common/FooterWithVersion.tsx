import React, { Component } from 'react';
import { Copyright } from '../common/Copyright';
import { Version } from '../common/Version';

type OwnProps = {
    className?: string;
};

type Props = OwnProps & typeof FooterWithVersion.defaultProps;

export default class FooterWithVersion extends Component<Props> {
static defaultProps = {
    className: ''
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