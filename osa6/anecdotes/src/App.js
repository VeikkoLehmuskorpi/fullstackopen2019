import React from 'react';
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer';

const App = ({ store }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={store} />
      <h2>create new</h2>
      <AnecdoteForm store={store} />
    </div>
  );
};

const AnecdoteForm = ({ store }) => {
  const addAnecdote = event => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    store.dispatch(createAnecdote(content));
  };

  return (
    <form onSubmit={event => addAnecdote(event)}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState();

  const vote = id => {
    console.log('vote', id);

    store.dispatch(voteAnecdote(id));
  };

  return anecdotes.map(anecdote => (
    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote.id)} />
  ));
};

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

export default App;
