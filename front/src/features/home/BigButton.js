import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import TimelineIcon from '@material-ui/icons/Timeline';
import PropTypes from 'prop-types';

const variants = {
  color: {
    chart: 'default',
    play: 'primary',
    stop: 'secondary',
  },
};
export default class BigButton extends Component {
  static propTypes = {
    icon: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(Object.keys(variants.color)),
  };

  static defaultProps = {
    variant: 'play',
  };

  render() {
    const { variant, onClick, icon } = this.props;
    const color = variants.color[variant];
    const Icon = variant === 'chart' ? TimelineIcon : icon;
    return (
      <Fab
        variant="extended"
        color={color}
        aria-label="add"
        classes={{ root: 'home-big-button' }}
        onClick={onClick}
      >
        <Icon className="home-big-button" />
      </Fab>
    );
  }
}
