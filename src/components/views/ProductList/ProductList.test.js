import React from 'react';
import { shallow } from 'enzyme';
import store from '../../../redux/store';
import ProductList from './ProductList';
import { Provider } from 'react-redux';

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

describe('ProductList', () => {
  it('renders without crashing', () => {
    const component = shallow(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    expect(component).toBeTruthy();
  });
});
