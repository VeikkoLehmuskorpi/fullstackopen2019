import React from 'react';
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer';

const App = ({ store }) => {
  const anecdotes = store.getState();

  const vote = id => {
    console.log('vote', id);

    store.dispatch(voteAnecdote(id));
  };

  const addAnecdote = event => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    store.dispatch(createAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={event => addAnecdote(event)}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
