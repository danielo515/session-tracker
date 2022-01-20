import React, { useCallback, useState } from 'react';
import { useCreate } from './redux/hooks';
import DefinitionForm from './DefinitionForm';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { back } from '@lagunovsky/redux-react-router';
import { useAppThunkDispatch } from '@common/configStore';
import { SessionDefinitionFromDb } from '@types';
import useAppSelector from 'hooks/useSelector';
import { updateSessionDefinition } from './redux/updateSessionDefinition';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Update() {
  const params = useParams<'name'>();
  if (!params.name) {
    return <Alert severity="error">No session name, this URL is incorrect</Alert>;
  }
  const { definitions, pending } = useAppSelector(({ sessionDefinition }) => {
    return {
      definitions: sessionDefinition.byName,
      pending: sessionDefinition.updateSessionDefinitionPending,
    };
  });
  const dispatch = useAppThunkDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => setShowAlert(false);
  const definition = definitions[params.name];
  const onSubmit = useCallback(
    (definition: SessionDefinitionFromDb) => {
      dispatch(updateSessionDefinition(definition))
        .then(() => {
          setShowAlert(true);
          return wait(500);
        })
        .then(() => dispatch(back()));
    },
    [dispatch],
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
        isLoading={pending}
        isUpdate
      />
    </>
  );
}
