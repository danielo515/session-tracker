import { formatMinutes4Human } from 'formatters/formatMinutes4Human';
import React from 'react';
import { Slider } from '@mui/material';

import withStyles from '@mui/styles/withStyles';

export const sliderMarks = Array.from(Array(12), (_, i) => {
  const minuteValue = i * 60;
  return {
    value: minuteValue,
    label: minuteValue / 60,
  };
});

interface DurationSliderProps {
  onChange: (value: number) => void;
  value: number;
  valueLabelDisplay?: 'auto' | 'on' | 'off';
  classes: { wrapper: string };
}
const DurationSlider_ = ({
  onChange,
  value,
  classes: { wrapper, ...classes },
  valueLabelDisplay,
}: DurationSliderProps) => {
  return (
    <div className={wrapper}>
      <Slider
        marks={sliderMarks}
        // @ts-expect-error wrong library typings?
        onChange={(e, value: number) => onChange(value)}
        valueLabelDisplay={valueLabelDisplay}
        value={value}
        classes={classes}
        min={0}
        max={60 * 12}
        step={5}
        valueLabelFormat={value => formatMinutes4Human(value)}
      />
    </div>
  );
};

export const DurationSlider = withStyles(({ palette, spacing }) => ({
  wrapper: {
    padding: spacing(2),
  },
  markLabel: {
    transform: 'unset',
  },
  valueLabel: {
    top: -22,
    '& *': {
      width: '80px',
      transform: 'unset',
      background: 'transparent',
      color: palette.text.secondary,
    },
  },
}))(DurationSlider_);
