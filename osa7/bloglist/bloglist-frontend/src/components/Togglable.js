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
      <div style={{ marginBottom: '1rem' }}>
        {visible && <div className='togglableContent'>{children}</div>}
        <button onClick={toggleVisibility}>
          {visible ? hideLabel : showLabel}
        </button>
      </div>
    );
  }
);

export default Togglable;

Togglable.defaultProps = {
  showLabel: 'Show',
  hideLabel: 'Cancel',
};
