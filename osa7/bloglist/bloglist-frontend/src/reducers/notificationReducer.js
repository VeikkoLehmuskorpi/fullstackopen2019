const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'REMOVE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;

export const setNotification = (data, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data,
    });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' });
    }, timeout * 1000);
  };
};

export const removeNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
    });
  };
};
