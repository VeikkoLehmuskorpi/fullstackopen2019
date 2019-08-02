import React, { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={handleClick}>+</button>
    </div>
  );
};

export default App;
