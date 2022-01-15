import { RootState } from '@common/configStore';
import { createSelector } from 'reselect';

// create a generic type called AppSelector
export type AppSelector<Return> = (state: RootState) => Return;
// create a custom `createSelector` that uses the type above
export const createAppSelector: <R>(selector: AppSelector<R>) => AppSelector<R> = createSelector;
