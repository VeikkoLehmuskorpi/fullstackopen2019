import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  if (props.condition !== null) {
    return (
      <>
        <div>{props.children}</div>
      </>
    );
  }

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
  condition: null,
  showLabel: 'Show',
  hideLabel: 'Cancel',
};
