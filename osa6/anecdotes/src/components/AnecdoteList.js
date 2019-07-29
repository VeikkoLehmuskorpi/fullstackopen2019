import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notificationSet, notificationRemove } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import Anecdote from './Anecdote';

const AnecdoteList = ({ visibleAnecdotes, voteAnecdote, notificationSet, notificationRemove }) => {
  const vote = ({ content, id }) => {
    console.log('vote', id);

    // Send vote action
    voteAnecdote(id);
    // Send notification action
    notificationSet({ message: `You voted "${content}"`, type: 'success' });

    // Remove notification after 5 seconds
    setTimeout(() => {
      notificationRemove();
    }, 5000);
  };

  return visibleAnecdotes.map(anecdote => (
    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
  ));
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter === '') return sortedAnecdotes(anecdotes);

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  );
  return sortedAnecdotes(filteredAnecdotes);
};

const sortedAnecdotes = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes);

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  notificationSet,
  notificationRemove,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList);

export default ConnectedAnecdoteList;
