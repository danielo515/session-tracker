import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { setupApp } from '../common/redux/actions';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  componentDidMount() {
    this.props.setupApp();
  }

  render() {
    const { isSetupPending } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="page-container">{isSetupPending ? null : this.props.children}</div>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}
/* istanbul ignore next */
/**
 * @param {import('rootReducer').RootState} state
 */
function mapStateToProps(state) {
  return {
    isSetupPending: state.common.setupAppPending,
  };
}

/* istanbul ignore next */
const mapDispatchToProps = {
  setupApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
