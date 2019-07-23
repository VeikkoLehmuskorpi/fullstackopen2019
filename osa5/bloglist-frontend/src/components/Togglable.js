import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  if (visible) {
    return (
      <>
        <div>{props.children}</div>
        <button onClick={toggleVisibility}>{props.hideLabel}</button>
      </>
    );
  }

  return <button onClick={toggleVisibility}>{props.showLabel}</button>;
});

export default Togglable;

Togglable.defaultProps = {
  showLabel: 'Show',
  hideLabel: 'Cancel',
};
