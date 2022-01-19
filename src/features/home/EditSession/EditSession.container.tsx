import { RootState } from '@common/configStore';
import { Session } from '@types';
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelEditSession, deleteSession, updateSession } from '../redux/actions';
import selectSessionToEdit from '../redux/selectSessionToEdit';
import EditSession from './EditSession';

export default function EditSessionConnect() {
  const sessionToEdit = useSelector(selectSessionToEdit);
  const editing = useSelector((state: RootState) => state.home.editing);
  const dispatch = useDispatch();
  const [onCancel, onUpdate, onDelete] = useMemo(() => {
    return [
      () => dispatch(cancelEditSession()),
      (session: Session) => dispatch(updateSession(session)),
      (id: string) => dispatch(deleteSession(id)),
    ];
  }, [dispatch]);
  if (!sessionToEdit) return null;
  return (
    <EditSession
      open={editing}
      cancel={onCancel}
      onDelete={onDelete}
      onSubmit={onUpdate}
      {...sessionToEdit}
    />
  );
}
