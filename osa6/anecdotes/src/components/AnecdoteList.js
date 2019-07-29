import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notificationSet, notificationRemove } from '../reducers/notificationReducer';
import Anecdote from './Anecdote';

const AnecdoteList = ({ store }) => {
  const { anecdotes } = store.getState();

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = ({ content, id }) => {
    console.log('vote', id);

    // Send vote action
    store.dispatch(voteAnecdote(id));
    // Send notification action
    store.dispatch(notificationSet({ message: `You voted "${content}"`, type: 'success' }));

    // Remove notification after 5 seconds
    setTimeout(() => {
      store.dispatch(notificationRemove());
    }, 5000);
  };

  return sortedAnecdotes.map(anecdote => (
    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
  ));
};

export default AnecdoteList;
