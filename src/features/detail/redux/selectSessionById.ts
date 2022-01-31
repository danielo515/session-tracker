import selectSessions from 'features/home/redux/selectSessions';
import { createSelector } from '@reduxjs/toolkit';

export const selectSessionById = createSelector(
  selectSessions,
  (_: unknown, id: string) => id,
  (sessions, id) => sessions.find((s) => s.id === id),
);
