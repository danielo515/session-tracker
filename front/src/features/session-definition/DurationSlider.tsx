import { formatMinutes4Human } from 'formatters/formatMinutes4Human';
import React from 'react';
import { Slider, withStyles } from '@material-ui/core';

export const sliderMarks = Array.from(Array(12), (val, i) => {
  const minuteValue = i * 60;
  return {
    value: minuteValue,
    label: minuteValue / 60,
  };
});

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
}))(({ onChange, value, classes: { wrapper, ...classes }, valueLabelDisplay }) => {
  return (
    <div className={wrapper}>
      <Slider
        marks={sliderMarks}
        onChange={(e, value) => onChange(value)}
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
});
