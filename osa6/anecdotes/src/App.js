import React from 'react';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = ({ store }) => {
  return (
    <div>
      <Notification store={store} />
      <h2>Anecdotes</h2>
      <AnecdoteList store={store} />
      <h2>create new</h2>
      <AnecdoteForm store={store} />
    </div>
  );
};

export default App;
