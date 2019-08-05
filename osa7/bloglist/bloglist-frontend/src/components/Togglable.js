import React, { useState, useImperativeHandle } from 'react';
import { Segment, Button } from 'semantic-ui-react';

// eslint-disable-next-line
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
      <Segment style={{ marginBottom: '1rem' }}>
        {visible && <div className='togglableContent'>{children}</div>}
        <Button onClick={toggleVisibility}>
          {visible ? hideLabel : showLabel}
        </Button>
      </Segment>
    );
  }
);

export default Togglable;

Togglable.defaultProps = {
  showLabel: 'Show',
  hideLabel: 'Cancel',
};
