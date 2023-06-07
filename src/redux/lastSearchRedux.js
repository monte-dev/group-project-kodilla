export const getLastSearch = state => state.lastSearch;

const createActionName = actionName => `app/lastSearch/${actionName}`;
const UPDATE_LASTSEARCH = createActionName('UPDATE_LASTSEARCH');

export const lastSearch = payload => ({ type: UPDATE_LASTSEARCH, payload });

const lastSearchReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_LASTSEARCH:
      return action.payload;

    default:
      return statePart;
  }
};

export default lastSearchReducer;
