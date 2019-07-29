import uuid from 'uuid/v4';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const asObject = anecdote => {
  return {
    content: anecdote,
    id: uuid(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

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
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content,
      id: uuid(),
      votes: 0,
    },
  };
};
