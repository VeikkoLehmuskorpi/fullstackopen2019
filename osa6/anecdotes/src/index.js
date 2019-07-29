import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import App from './App';
import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
});

const store = createStore(reducer);

store.dispatch({
  type: 'SET_NOTIFICATION',
  data: {
    message: 'Lorem ipsum dolor sit amet',
    type: 'success',
  },
});

console.log(store.getState());

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
};

render();
store.subscribe(() => {
  console.log(store.getState());
  render();
});
