import { strContains } from '../utils/strContains';

/* selectors */
export const getAll = ({ products }) => products;
export const getCount = ({ products }) => products.length;

export const getNew = ({ products }) =>
  products.filter(item => item.newFurniture === true);

export const getAllProducts = () => {
  return state => state.products;
};
export const getProductById = ({ products }, activeId) =>
  products.find(item => item.id === activeId);

export const getComparedProducts = ({ products }) =>
  products.filter(item => item.comparison === true);
export const getProductsByCategory = ({ products }, categoryId) =>
  products.filter(item => item.category === categoryId);


export const gerFilteredProducts = ({ products, searchString, searchCategory }) =>
  products.filter(item =>
    searchCategory !== undefined && searchCategory !== ''
      ? item.category === searchCategory && strContains(item.name, searchString)
      : strContains(item.name, searchString)
  );

export const getProductBySpecialAction = ({ products }, specialAction) =>
  products.filter(item => item.specialAction === specialAction);


/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const TOGGLE_PRODUCT_FAVORITE = createActionName('TOGGLE_PRODUCT_FAVORITE');
const TOGGLE_PRODUCT_COMPARED = createActionName('TOGGLE_PRODUCT_COMPARED');
const ADD_MY_RATING = createActionName('ADD_MY_RATING');

/* action creators */
export const toggleFavorite = payload => ({ type: TOGGLE_PRODUCT_FAVORITE, payload });
export const toggleCompared = payload => ({ type: TOGGLE_PRODUCT_COMPARED, payload });
export const addMyRating = payload => ({ type: ADD_MY_RATING, payload });

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case TOGGLE_PRODUCT_FAVORITE:
      return statePart.map(product =>
        product.id === action.payload
          ? { ...product, favorite: !product.favorite }
          : product
      );
    case TOGGLE_PRODUCT_COMPARED:
      return statePart.map(product =>
        product.id === action.payload
          ? { ...product, comparison: !product.comparison }
          : product
      );
    case ADD_MY_RATING:
      return statePart.map(product =>
        product.id === action.payload.id ? { ...product, ...action.payload } : product
      );
    default:
      return statePart;
  }
}
