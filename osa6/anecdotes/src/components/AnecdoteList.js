import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notificationSet, notificationRemove } from '../reducers/notificationReducer';
import Anecdote from './Anecdote';

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState();

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const anecdotesToShow = () => {
    if (filter === '') return sortedAnecdotes;

    return sortedAnecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    );
  };

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

  return anecdotesToShow().map(anecdote => (
    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
  ));
};

export default AnecdoteList;
