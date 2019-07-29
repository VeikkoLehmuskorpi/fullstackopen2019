import React from 'react';
import uuid from 'uuid/v4';

const App = ({ store }) => {
  const anecdotes = store.getState();

  const vote = id => {
    console.log('vote', id);

    store.dispatch({
      type: 'VOTE_ANECDOTE',
      data: {
        id,
      },
    });
  };

  const addAnecdote = event => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    store.dispatch({
      type: 'ADD_ANECDOTE',
      data: {
        content,
        id: uuid(),
        votes: 0,
      },
    });
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
