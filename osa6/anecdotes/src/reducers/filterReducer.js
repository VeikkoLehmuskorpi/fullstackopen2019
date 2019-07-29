const initialState = '';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    case 'REMOVE_FILTER':
      return initialState;
    default:
      return state;
  }
};

export default reducer;

export const filterSet = filter => {
  return {
    type: 'SET_FILTER',
    filter,
  };
};

export const filterRemove = () => {
  return {
    type: 'REMOVE_FILTER',
  };
};
