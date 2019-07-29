import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState();

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = id => {
    console.log('vote', id);

    store.dispatch(voteAnecdote(id));
  };

  return sortedAnecdotes.map(anecdote => (
    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote.id)} />
  ));
};

export default AnecdoteList;
