import React, { useCallback, useState } from 'react';
import { useCreate } from './redux/hooks';
import DefinitionForm from './DefinitionForm';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { back } from '@lagunovsky/redux-react-router';
import { useAppDispatch } from '@common/configStore';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Update() {
  const params = useParams<'name'>();
  if (!params.name) {
    return <Alert severity="error">No session name, this URL is incorrect</Alert>;
  }
  const { create, createPending, sessionDefinitions } = useCreate();
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => setShowAlert(false);
  const dispatch = useAppDispatch();
  const definition = sessionDefinitions[params.name];
  const onSubmit = useCallback(
    (definition) => {
      create(definition)
        .then(() => {
          setShowAlert(true);
          return wait(500);
        })
        .then(() => dispatch(back()));
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
        isUpdate
      />
    </>
  );
}
