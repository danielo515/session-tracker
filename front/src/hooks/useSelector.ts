import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'rootReducer';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
