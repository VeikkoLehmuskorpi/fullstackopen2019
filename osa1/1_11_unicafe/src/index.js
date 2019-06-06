import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good + neutral + bad} />
        <Statistic
          text="average"
          value={(good - bad) / (good + neutral + bad)}
        />
        <Statistic
          text="positive"
          value={(good / (good + neutral + bad)) * 100}>
          %
        </Statistic>
      </tbody>
    </table>
  );
};

const Statistic = ({ value, text, children }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
    {children && <td>{children}</td>}
  </tr>
);

ReactDOM.render(<App />, document.getElementById('root'));
