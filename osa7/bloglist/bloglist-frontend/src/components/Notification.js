import React from 'react';

const Notification = ({ notification }) => {
  if (!notification) return null;

  const divStyle = {
    color: notification.color || 'black',
    border: '.1rem solid #000',
    borderColor: notification.color || 'black',
    marginBottom: '1rem',
    padding: '.4rem 1rem',
  };

  return (
    <div style={divStyle}>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
