import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import Notification from './components/Notification';
import Filter from './components/Filter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = ({ initializeAnecdotes }) => {
  useEffect(() => {
    initializeAnecdotes();
  }, [initializeAnecdotes]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default connect(
  null,
  { initializeAnecdotes },
)(App);
