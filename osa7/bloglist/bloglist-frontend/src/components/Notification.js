import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

const Notification = ({ notification }) => {
  if (!notification) return null;

  return (
    <Message color={notification.color}>
      <p>{notification.message}</p>
    </Message>
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
