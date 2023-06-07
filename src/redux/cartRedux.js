import initialState from './initialState';

/* selectors */
export const getAll = ({ cart }) => cart.products;
export const getCount = ({ cart }) => cart.products.length;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_PRODUCT = createActionName('ADD_PRODUCT');
const CLEAR_CART = createActionName('CLEAR_CART');
const LOAD_CART = createActionName('LOAD_CART');

/* action creators */
export const addProduct = payload => ({ payload, type: ADD_PRODUCT });
export const clearCart = payload => ({ payload, type: CLEAR_CART });
export const loadCart = payload => ({ payload, type: LOAD_CART });

/* reducer */
export default function reducer(statePart = initialState.cart, action = {}) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const existingProductIndex = statePart.products.findIndex(
        product => product.name === action.payload.name
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...statePart.products];
        updatedProducts[existingProductIndex].quantity += 1;
        localStorage.setItem('pageCart', JSON.stringify(updatedProducts));
        return {
          ...statePart,
          products: updatedProducts,
        };
      } else {
        localStorage.setItem(
          'pageCart',
          JSON.stringify([...statePart.products, { ...action.payload, quantity: 1 }])
        );
        return {
          ...statePart,
          products: [...statePart.products, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case CLEAR_CART:
      localStorage.setItem('pageCart', JSON.stringify([]));
      return {
        products: [],
      };
    case LOAD_CART:
      if (statePart.products.length <= 0) {
        if (localStorage.getItem('pageCart')) {
          return {
            products: JSON.parse(localStorage.getItem('pageCart')),
          };
        }
      }
      return {
        products: statePart.products,
      };
    default:
      return statePart;
  }
}
