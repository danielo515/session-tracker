import React from 'react';
import { useCreate } from './redux/hooks';
import DefinitionForm from './DefinitionForm';

export default function Update({ match }) {
  const { create, createPending, sessionDefinitions } = useCreate();
  const params = match.params;
  const definition = sessionDefinitions[params.name];

  return (
    <DefinitionForm
      definition={{
        ...definition,
      }}
      onSubmit={create}
      isLoading={createPending}
    />
  );
}
