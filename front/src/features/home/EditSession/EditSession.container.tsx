import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelEditSession, deleteSession, updateSession } from '../redux/actions';
import selectSessionToEdit from '../redux/selectSessionToEdit';
import EditSession from './EditSession';
/** @typedef {import('@types').Session} Session*/
/** @typedef {import('rootReducer').RootState} RootState*/

export default function EditSessionConnect() {
  const sessionToEdit = useSelector(selectSessionToEdit);
  const editing = useSelector(
    (
/** @param {RootState} state*/
state: RootState) => state.home.editing,
  );
  const dispatch = useDispatch();
  const [onCancel, onUpdate, onDelete] = useMemo(() => {
    return [
      () => dispatch(cancelEditSession()),
      (
/** @param {Session} session */
session: Session) => dispatch(updateSession(session)),
      (
/** @param {string} id */
id: string) => dispatch(deleteSession(id)),
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
