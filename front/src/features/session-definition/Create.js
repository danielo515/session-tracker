import React from 'react';
import { useCreate } from './redux/hooks';
import DefinitionForm from './DefinitionForm';

export default function Create() {
  const { create, createPending } = useCreate();

  return (
    <DefinitionForm
      definition={{
        duration: 60 * 8,
        name: '',
        color: '#b32aa9',
      }}
      onSubmit={create}
      isLoading={createPending}
    />
  );
}

Create.propTypes = {};
Create.defaultProps = {};
