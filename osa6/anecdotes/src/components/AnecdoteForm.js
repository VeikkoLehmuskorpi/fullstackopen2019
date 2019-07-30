import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux';
import anecdoteService from '../services/anecdoteService';

const AnecdoteForm = ({ createAnecdote }) => {
  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.value = '';

    const newAnecdote = await anecdoteService.createNew(content);
    createAnecdote(newAnecdote);
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
