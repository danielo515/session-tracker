import React, { useCallback, useEffect, useState } from 'react';
import { useCreate } from './redux/hooks';
import DefinitionForm from './DefinitionForm';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

export default function Update({ match }) {
  const { create, createPending, sessionDefinitions } = useCreate();
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => setShowAlert(false);
  const params = match.params;
  const definition = sessionDefinitions[params.name];
  const onSubmit = useCallback(
    definition => {
      create(definition).then(() => setShowAlert(true));
    },
    [create],
  );

  return (
    <>
      <Snackbar open={showAlert} autoHideDuration={2000} onClose={closeAlert}>
        <Alert onClose={closeAlert}>Session {params.name} updated!</Alert>
      </Snackbar>
      <DefinitionForm
        definition={{
          ...definition,
          name: params.name,
        }}
        onSubmit={onSubmit}
        isLoading={createPending}
      />
    </>
  );
}
