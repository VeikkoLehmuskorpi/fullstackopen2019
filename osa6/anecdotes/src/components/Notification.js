import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const notificationColor = () => {
    switch (notification.type) {
      case 'success':
        return 'green';
      case 'warning':
        return 'orange';
      case 'danger':
        return 'red';
      default:
        return 'black';
    }
  };

  const style = {
    color: notificationColor(),
    border: 'solid',
    borderColor: notificationColor(),
    padding: 10,
    borderWidth: 1,
  };

  return notification.message ? <div style={style}>{notification.message}</div> : null;
};

const mapStateToProps = state => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
