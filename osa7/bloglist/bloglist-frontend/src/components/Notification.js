import React from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
  return {
    notification: state.notification,
  };
};

export default connect(
  mapStateToProps,
  null
)(Notification);
