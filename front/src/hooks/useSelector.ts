import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '@common/configStore';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
