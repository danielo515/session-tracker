import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../common/Navigation';
import { setupApp } from '../common/redux/actions';
import * as actions from './redux/actions';

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

/* istanbul ignore next */
/**
 * @param {import('rootReducer').RootState} state
 */
function mapStateToProps(state) {
  return {};
}

/* istanbul ignore next */
const mapDispatchToProps = {
  ...actions,
  setupApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
