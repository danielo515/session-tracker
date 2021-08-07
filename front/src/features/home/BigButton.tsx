import React from 'react';
import Fab from '@material-ui/core/Fab';
import TimelineIcon from '@material-ui/icons/Timeline';

const variants = {
  color: {
    chart: 'default',
    play: 'primary',
    stop: 'secondary',
  },
} as const;

type BigButtonProps = {
  variant: keyof typeof variants.color;
  icon: React.ElementType;
  onClick: () => void;
};

const BigButton = (props: BigButtonProps) => {
  const { variant, onClick, icon } = props;
  const color = variants.color[variant];
  const Icon = variant === 'chart' ? TimelineIcon : icon;
  return (
    <Fab
      variant="extended"
      color={color}
      aria-label="add"
      classes={{
        root: 'home-big-button',
      }}
      onClick={onClick}
    >
      <Icon className="home-big-button" />
    </Fab>
  );
};

export default BigButton;
