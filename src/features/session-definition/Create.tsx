import React from 'react';
import { useCreate } from './redux/hooks';
import DefinitionForm from './DefinitionForm';
import { useAppThunkDispatch } from '@common/configStore';
import { back } from '@lagunovsky/redux-react-router';
import { SessionDefinition } from '@types';
import { Container, Typography } from '@mui/material';

export default function Create() {
  const { create, createPending } = useCreate();
  const dispatch = useAppThunkDispatch();

  const onSubmit = async (definition: SessionDefinition) => {
    await create(definition);
    return dispatch(back());
  };

  return (
    <Container>
      <Typography variant="h4" p={2}>
        Create a new session
      </Typography>
      <DefinitionForm
        definition={{
          expectedDuration: 60 * 8,
          name: '',
          color: '#b32aa9',
          icon: 'Default',
        }}
        action="create"
        onSubmit={onSubmit}
        isLoading={createPending}
      />
    </Container>
  );
}

Create.propTypes = {};
Create.defaultProps = {};
