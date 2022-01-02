import { RootState } from 'rootReducer';
function selectSessions(state: RootState) {
  return state.home.sessions || [];
}

export default selectSessions;
