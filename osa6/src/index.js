import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    });
  };

  const neutral = () => {
    store.dispatch({
      type: 'OK',
    });
  };

  const bad = () => {
    store.dispatch({
      type: 'BAD',
    });
  };

  const zero = () => {
    store.dispatch({
      type: 'ZERO',
    });
  };

  const goodValue = store.getState().good;
  const neutralValue = store.getState().ok;
  const badValue = store.getState().bad;

  return (
    <div>
      <h2>give feedback</h2>

      <button onClick={good}>hyvä</button>
      <button onClick={neutral}>neutraali</button>
      <button onClick={bad}>huono</button>
      <button onClick={zero}>nollaa tilastot</button>

      <h2>statistics</h2>

      {goodValue + neutralValue + badValue !== 0 ? (
        <>
          <div>good {goodValue}</div>
          <div>neutral {neutralValue}</div>
          <div>bad {badValue}</div>
          <div>all {goodValue + neutralValue + badValue}</div>
          <div>average {(goodValue - badValue) / (goodValue + neutralValue + badValue)}</div>
          <div>positive {(goodValue / (goodValue + neutralValue + badValue)) * 100} %</div>
        </>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
