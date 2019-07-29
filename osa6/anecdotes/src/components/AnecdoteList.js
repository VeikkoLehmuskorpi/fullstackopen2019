import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notificationSet, notificationRemove } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import Anecdote from './Anecdote';

const AnecdoteList = ({ anecdotes, filter, voteAnecdote, notificationSet, notificationRemove }) => {
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
    voteAnecdote(id);
    // Send notification action
    notificationSet({ message: `You voted "${content}"`, type: 'success' });

    // Remove notification after 5 seconds
    setTimeout(() => {
      notificationRemove();
    }, 5000);
  };

  return anecdotesToShow().map(anecdote => (
    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
  ));
};

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
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
