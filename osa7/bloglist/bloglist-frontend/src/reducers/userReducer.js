import loginService from '../services/login';

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data;
  case 'REMOVE_USER':
    return initialState;
  default:
    return state;
  }
};

export default userReducer;

export const setUser = data => {
  return async dispatch => {
    const user = await loginService.login(data);
    dispatch({
      type: 'SET_USER',
      data: user,
    });
    window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user));
  };
};

export const setUserFromStorage = user => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export const removeUser = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_USER',
    });
    window.localStorage.removeItem('loggedInBloglistUser');
  };
};
