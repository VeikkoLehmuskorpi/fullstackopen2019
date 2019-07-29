import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux';

const AnecdoteForm = ({ createAnecdote }) => {
  const addAnecdote = event => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    createAnecdote(content);
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

const mapDispatchToProps = {
  createAnecdote,
};

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps,
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
