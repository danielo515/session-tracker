import React from 'react';
import { useCreate } from './redux/hooks';
import DefinitionForm from './DefinitionForm';

export default function Create() {
  const { create, createPending } = useCreate();

  return (
    <DefinitionForm
      isUpdate={false}
      definition={{
        expectedDuration: 60 * 8,
        name: '',
        color: '#b32aa9',
        icon: 'Default',
      }}
      onSubmit={create}
      isLoading={createPending}
    />
  );
}

Create.propTypes = {};
Create.defaultProps = {};
