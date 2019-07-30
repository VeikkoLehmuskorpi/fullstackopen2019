const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.data.message,
        type: action.data.type.toLowerCase(),
      };
    case 'REMOVE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export default reducer;

export const notificationSet = (data, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data,
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, timeout * 1000);
  };
};

export const notificationRemove = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  };
};
