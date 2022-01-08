import { RootState } from '@common/configStore';

function selectSessions(state: RootState) {
  return state.home.sessions || [];
}

export default selectSessions;
