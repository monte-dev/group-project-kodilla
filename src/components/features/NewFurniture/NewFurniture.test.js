import React from 'react';
import { shallow } from 'enzyme';
import NewFurniture from './NewFurniture';
import store from '../../../redux/store';
import { Provider } from 'react-redux';
describe('Component NewFurniture', () => {
  it('should render without crashing', () => {
    const component = shallow(
      <Provider store={store}>
        <NewFurniture />
      </Provider>
    );
    expect(component).toBeTruthy();
  });
});
