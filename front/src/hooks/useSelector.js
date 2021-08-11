import { useSelector } from 'react-redux';

/**
 * @typedef {import("rootReducer").RootState} RootState
 * */

/**
 * @type {import('react-redux').TypedUseSelectorHook<RootState>}
 * */
const useAppSelector = useSelector;

export default useAppSelector;
