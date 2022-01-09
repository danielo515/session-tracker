import React, { Component } from 'react';
import Navigation from '../common/Navigation';

export class DefaultPage extends Component {
  render() {
    const { pathname } = this.props.location; // default to root page name

    return (
      <React.Fragment>
        <Navigation page={pathname} />
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default DefaultPage;
