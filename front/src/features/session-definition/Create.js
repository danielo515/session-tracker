import { Button, Container, Slider, TextField, Typography, withStyles } from '@material-ui/core';
import { HexColorPicker } from 'react-colorful';

import { Page } from 'features/common';
import FormRow from 'features/common/FormRow';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useCreate } from './redux/hooks';
import { formatMinutes4Human } from 'formatters/formatMinutes4Human';

const DurationSlider = withStyles(({ palette, spacing }) => ({
  wrapper: {
    paddingTop: spacing(2),
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
}))(({ onChange, value, classes, valueLabelDisplay }) => {
  return (
    <div className={classes.wrapper}>
      <Slider
        marks={[
          { value: 0, label: '0 min' },
          { value: 60 * 24, label: '24 h' },
        ]}
        onChange={(e, value) => onChange(value)}
        valueLabelDisplay={valueLabelDisplay}
        value={value}
        classes={classes}
        min={1}
        max={60 * 24}
        valueLabelFormat={value => formatMinutes4Human(value)}
      />
    </div>
  );
});

export default function Create() {
  const { create, createPending } = useCreate();
  const [color, setColor] = useState('#b32aa9');
  const [duration, setDuration] = useState(60 * 8);

  const submit = (/** @type { import('react').SyntheticEvent } */ e) => {
    e.preventDefault();
    create({
      name: 'test',
      color: '#cefec',
      expectedDuration: 90000,
    });
  };
  return (
    <Page className="session-definition-create">
      <Container maxWidth="sm">
        <form onSubmit={submit}>
          <FormRow>
            <Typography variant="h6">Title</Typography>
            <Typography variant="subtitle1">
              How sessions created with this template will be named
            </Typography>
            <TextField type="text" variant="outlined" fullWidth />
          </FormRow>
          <FormRow centered>
            <Typography variant="h6">Color</Typography>
            <Typography variant="subtitle1">
              Assigning a color will give you a visual help to find sessions of this type
            </Typography>
            <HexColorPicker color={color} onChange={setColor} />
          </FormRow>
          <FormRow>
            <Typography variant="h6">Expected Duration</Typography>
            <Typography variant="subtitle1">How much will this task usually last?</Typography>
            <DurationSlider value={duration} onChange={setDuration} valueLabelDisplay="on" />
          </FormRow>
          <FormRow>
            <Button
              type="submit"
              disabled={createPending}
              color="primary"
              variant="contained"
              size="large"
            >
              Create
            </Button>
          </FormRow>
        </form>
      </Container>
    </Page>
  );
}

Create.propTypes = {};
Create.defaultProps = {};
