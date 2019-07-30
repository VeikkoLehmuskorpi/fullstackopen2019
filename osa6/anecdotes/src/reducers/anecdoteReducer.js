import anecdoteService from '../services/anecdoteService';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const anecdoteToVote = state.find(anecdote => anecdote.id === action.data.id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      const newState = state.map(anecdote =>
        anecdote.id === action.data.id ? votedAnecdote : anecdote,
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
  return {
    type: 'VOTE_ANECDOTE',
    data: {
      id,
    },
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote,
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
