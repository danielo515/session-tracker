
import { shallow } from 'enzyme';
import { SessionsList } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SessionsList />);
  expect(renderedComponent.find('.home-sessions-list').length).toBe(1);
});
