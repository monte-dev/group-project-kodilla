/* selectors */
export const getAllSpecialActions = () => {
  return state => state.specialActions;
};
/* action name creator */
const reducerName = 'specialActions';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */

/* action creators */

/* reducer */
const specialActionReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  }
};

export default specialActionReducer;
