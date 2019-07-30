import anecdoteService from '../services/anecdoteService';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const newState = state.map(anecdote =>
        anecdote.id === action.data.id ? action.data : anecdote,
      );
      return newState;
    case 'ADD_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export default reducer;

export const voteAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id);
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote,
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};
