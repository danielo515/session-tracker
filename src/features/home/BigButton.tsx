import React from 'react';
import Fab from '@mui/material/Fab';
import TimelineIcon from '@mui/icons-material/Timeline';

const variants = {
  color: {
    chart: 'default',
    play: 'primary',
    stop: 'secondary',
  },
} as const;

type Props = {
  variant: keyof typeof variants.color;
  onClick: () => void;
  icon: React.ComponentType;
};

const BigButton = (props: Props) => {
  const { variant = 'play', onClick, icon } = props;
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
