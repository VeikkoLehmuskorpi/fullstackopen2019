import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import anecdoteService from './services/anecdoteService';
import Notification from './components/Notification';
import Filter from './components/Filter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = ({ initializeAnecdotes }) => {
  const fetchAnecdotes = useCallback(async () => {
    const anecdotes = await anecdoteService.getAll();
    initializeAnecdotes(anecdotes);
  }, [initializeAnecdotes]);

  useEffect(() => {
    fetchAnecdotes();
  }, [fetchAnecdotes]);

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
