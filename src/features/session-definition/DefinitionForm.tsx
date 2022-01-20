import { IconSelector } from './Iconselector';
import { DurationSlider } from './DurationSlider';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { Page } from 'features/common';
import FormRow from 'features/common/FormRow';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SessionDefinition, SessionDefinitionFromDb } from '@types';

const defaultDuration = 60;
const defaultIcon = 'Default';

type Props =
  | {
      isLoading: boolean;
      onSubmit: (a: SessionDefinition) => unknown;
      definition: SessionDefinition;
      isUpdate: false;
    }
  | {
      isLoading: boolean;
      onSubmit: (a: SessionDefinitionFromDb) => unknown;
      definition: SessionDefinitionFromDb;
      isUpdate: true;
    };

export default function DefinitionForm({ definition, onSubmit, isLoading, isUpdate }: Props) {
  const [color, setColor] = useState(definition.color);
  const [duration, setDuration] = useState(definition.expectedDuration || defaultDuration);
  const [name, setName] = useState(definition.name);
  const [icon, setIcon] = useState(definition.icon || defaultIcon);

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({
      ...definition,
      name,
      color,
      expectedDuration: duration,
      icon,
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
              onChange={(e) => setName(e.target.value)}
              required
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
          <FormRow>
            <Typography variant="h6">Icon</Typography>
            <Typography variant="subtitle1">Assign an icon to this task</Typography>
            <IconSelector icon={icon} onChange={setIcon} />
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
                {isUpdate ? 'Save' : 'Create'}
              </Button>
            </FormRow>
          </Box>
        </form>
      </Container>
    </Page>
  );
}
