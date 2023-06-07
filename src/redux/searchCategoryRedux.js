const createActionName = actionName => `app/searchCategory/${actionName}`;
const UPDATE_CATEGORY = createActionName('UPDATE_CATEGORY');

export const filterCategory = payload => ({ type: UPDATE_CATEGORY, payload });

const searchCategoryReducer = (statePart = '', action) => {
  switch (action.type) {
    case UPDATE_CATEGORY:
      return action.payload;
    default:
      return statePart;
  }
};

export default searchCategoryReducer;
