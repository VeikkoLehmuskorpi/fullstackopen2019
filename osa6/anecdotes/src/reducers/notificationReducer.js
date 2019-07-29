const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.data.message,
        type: action.data.type.toLowerCase(),
      };
    case 'REMOVE_NOTIFICATION':
      return state;
    default:
      return state;
  }
};

export default reducer;

export const notificationSet = data => {
  return {
    type: 'SET_NOTIFICATION',
    data,
  };
};

export const notificationRemove = data => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data,
  };
};
