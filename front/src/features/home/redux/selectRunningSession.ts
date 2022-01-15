import { RootState } from '@common/configStore';

const selectRunningSession = (state: RootState) => state.home.runningSession;

export default selectRunningSession;
