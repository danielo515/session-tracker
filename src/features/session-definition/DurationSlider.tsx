import { formatMinutes4Human } from 'formatters/formatMinutes4Human';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Slider, sliderClasses } from '@mui/material';

const Root = styled('div')(({ theme: { spacing } }) => ({
  padding: spacing(2),
}));

const StyledSlider = styled(Slider)(({ theme: { palette } }) => ({
  [`& .${sliderClasses.markLabel}`]: {
    transform: 'unset',
  },

  [`& .${sliderClasses.valueLabel}`]: {
    top: '-2px',
    width: '80px',
    transform: 'unset',
    background: 'transparent',
    fontWeight: '400',
    color: palette.text.secondary,
  },
}));

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
}
export const DurationSlider = ({ onChange, value, valueLabelDisplay }: DurationSliderProps) => {
  return (
    <Root>
      <StyledSlider
        marks={sliderMarks}
        onChange={(e, value) => onChange(value as number)}
        valueLabelDisplay={valueLabelDisplay}
        value={value}
        min={0}
        max={60 * 12}
        step={5}
        valueLabelFormat={(value) => formatMinutes4Human(value)}
        size="small"
      />
    </Root>
  );
};
