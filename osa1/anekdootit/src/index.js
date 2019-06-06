import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});

  const handleVote = () => {
    if (points[selected] === undefined) setPoints({ ...points, [selected]: 1 });
    else setPoints({ ...points, [selected]: points[selected] + 1 });
  };

  const handleRandomAnecdote = () =>
    setSelected(Math.floor(Math.random() * (anecdotes.length - 1)));

  const mostVotedAnectode = () => {
    const mostVotesAmount = Math.max(...Object.values(points));

    const mostVotedArr = Object.entries(points).filter(
      item => item[1] === mostVotesAmount
    );

    if (mostVotedArr.length > 0) {
      return mostVotedArr[0][0];
    } else {
      return false;
    }
  };

  mostVotedAnectode();

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected] || 0} votes</p>
      </div>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleRandomAnecdote}>next anecdote</button>
      <div>
        <h2>Anecdote with the most votes</h2>
        {mostVotedAnectode() && <p>{anecdotes[mostVotedAnectode()]}</p>}
      </div>
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
