import React, { useState } from 'react';

const Togglable = ({ children, showLabel, hideLabel }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

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
