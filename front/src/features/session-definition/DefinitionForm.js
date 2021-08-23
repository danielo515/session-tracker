import { DurationSlider } from './DurationSlider';
import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import { HexColorPicker } from 'react-colorful';

import { Page } from 'features/common';
import FormRow from 'features/common/FormRow';
import React, { useState } from 'react';
import useHandleChange from 'features/home/hooks/useHandleChange';
import { Link } from 'react-router-dom';

/** @typedef {import('@types').SessionDefinition}  SessionDefinition*/

/**
 * @export
 * @param {Object} props
 * @param {boolean} props.isLoading
 * @param {(a: SessionDefinition) => any} props.onSubmit
 * @param {import('@types').SessionDefinition} props.definition
 */
export default function DefinitionForm({ definition, onSubmit, isLoading }) {
  const [color, setColor] = useState(definition.color);
  const [duration, setDuration] = useState(definition.expectedDuration);
  const [name, setName] = useHandleChange(definition.name);

  const submit = (/** @type { import('react').SyntheticEvent } */ e) => {
    e.preventDefault();
    onSubmit({
      name,
      color,
      expectedDuration: duration,
    });
  };
  return (
    <Page className="session-definition-create" scroll>
      <Container maxWidth="sm">
        <form onSubmit={submit}>
          <FormRow>
            <Typography variant="h6">Title</Typography>
            <Typography variant="subtitle1">
              How sessions created with this template will be named
            </Typography>
            <TextField
              type="text"
              variant="filled"
              id="session"
              name="session-name"
              autoComplete="session"
              fullWidth
              value={name}
              onChange={setName}
            />
          </FormRow>
          <FormRow>
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
          <Box pb={2}>
            <FormRow centered row>
              <Button
                disabled={isLoading}
                color="secondary"
                variant="outlined"
                size="large"
                component={Link}
                to="/"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                color="primary"
                variant="contained"
                size="large"
              >
                Create
              </Button>
            </FormRow>
          </Box>
        </form>
      </Container>
    </Page>
  );
}
