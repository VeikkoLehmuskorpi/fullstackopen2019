import loginService from '../services/loginService';

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

export const initUser = () => {
  return async dispatch => {
    const userJSON = window.localStorage.getItem('loggedInBloglistUser');
    if (userJSON !== null) {
      const parsedUser = JSON.parse(userJSON);
      setUserFromStorage(parsedUser);

      dispatch({
        type: 'SET_USER',
        data: parsedUser,
      });
    }
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
