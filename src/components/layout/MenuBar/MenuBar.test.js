import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MenuBar from './MenuBar';

const mockStore = configureStore([]);

describe('Component MenuBar', () => {
  it('should render without crashing', () => {
    const store = mockStore({});

    const component = shallow(
      <Provider store={store}>
        <MenuBar />
      </Provider>
    );

    expect(component).toBeTruthy();
  });
});
