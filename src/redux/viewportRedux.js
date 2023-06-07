//selectors
export const getViewport = state => state.viewport;

/* actions */
const createActionName = name => `app/viewport/${name}`;
const SET_VIEWPORT = createActionName('SET_VIEWPORT');

export const setViewport = payload => ({ type: SET_VIEWPORT, payload });

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case SET_VIEWPORT:
      return action.payload;
    default:
      return statePart;
  }
}
