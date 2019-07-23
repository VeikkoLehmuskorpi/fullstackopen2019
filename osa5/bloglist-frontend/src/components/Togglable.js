import React, { useState } from 'react';

const Togglable = ({ children, condition, showLabel, hideLabel }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  if (condition !== null) {
    return (
      <>
        <div>{children}</div>
      </>
    );
  }

  if (visible) {
    return (
      <>
        <div>{children}</div>
        <button onClick={toggleVisibility}>{hideLabel}</button>
      </>
    );
  }

  return <button onClick={toggleVisibility}>{showLabel}</button>;
};

export default Togglable;
