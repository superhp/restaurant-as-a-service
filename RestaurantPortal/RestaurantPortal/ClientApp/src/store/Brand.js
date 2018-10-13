const initialState = { restaurant: {} };

export const reducer = (state = initialState, action) => {

  let newState = JSON.parse(JSON.stringify(state));
  if (action.type === "BRAND_CHANGE") {
    newState.restaurant = action.newRestaurant;
    return newState;
  }

  return state;
};
