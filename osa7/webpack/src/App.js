import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(BACKEND_URL).then(response => setNotes(response.data));
  }, []);

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={handleClick}>+</button>
      <p>{notes.length} notes on the server</p>
    </div>
  );
};

export default App;
