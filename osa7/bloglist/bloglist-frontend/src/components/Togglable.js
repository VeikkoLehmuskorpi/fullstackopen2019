import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef(
  ({ children, showLabel, hideLabel }, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible(!visible);

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <>
        {visible && <div className='togglableContent'>{children}</div>}
        <button onClick={toggleVisibility}>
          {visible ? hideLabel : showLabel}
        </button>
      </>
    );
  }
);

export default Togglable;

Togglable.defaultProps = {
  showLabel: 'Show',
  hideLabel: 'Cancel',
};
