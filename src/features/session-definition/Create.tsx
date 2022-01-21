import React from 'react';
import { useCreate } from './redux/hooks';
import DefinitionForm from './DefinitionForm';
import { useAppThunkDispatch } from '@common/configStore';
import { back } from '@lagunovsky/redux-react-router';
import { SessionDefinition } from '@types';

export default function Create() {
  const { create, createPending } = useCreate();
  const dispatch = useAppThunkDispatch();

  const onSubmit = async (definition: SessionDefinition) => {
    await create(definition);
    return dispatch(back());
  };

  return (
    <DefinitionForm
      isUpdate={false}
      definition={{
        expectedDuration: 60 * 8,
        name: '',
        color: '#b32aa9',
        icon: 'Default',
      }}
      onSubmit={onSubmit}
      isLoading={createPending}
    />
  );
}

Create.propTypes = {};
Create.defaultProps = {};
