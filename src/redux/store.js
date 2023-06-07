import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import initialState from './initialState';
import thunkMiddleware from 'redux-thunk';
import cartReducer from './cartRedux';
import categoriesReducer from './categoriesRedux';
import productsReducer from './productsRedux';
import viewportReducer from './viewportRedux';
import searchStringReducer from './searchStringRedux';
import lastSearchReducer from './lastSearchRedux';
import searchCategoryReducer from './searchCategoryRedux';
import specialActionReducer from './specialActionsRedux';

// define reducers
const reducers = {
  cart: cartReducer,
  categories: categoriesReducer,
  products: productsReducer,
  viewport: viewportReducer,
  searchString: searchStringReducer,
  searchCategory: searchCategoryReducer,
  lastSearch: lastSearchReducer,
  specialActions: specialActionReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
const store = createStore(
  combinedReducers,
  initialState,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;
