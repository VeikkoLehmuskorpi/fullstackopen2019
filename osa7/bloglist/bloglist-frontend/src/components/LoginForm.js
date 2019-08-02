/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { useField } from '../hooks/index';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';
import { setUser, removeUser } from '../reducers/userReducer';

const LoginForm = ({
  user,
  setUser,
  removeUser,
  setNotification,
  removeNotification,
}) => {
  const [loading, setLoading] = useState(false);

  const usernameField = useField('text');
  const passwordField = useField('text');

  const handleLogin = async event => {
    event.preventDefault();
    setLoading(true);

    const username = usernameField.value;
    const password = passwordField.value;

    try {
      await setUser({
        username,
        password,
      });
      removeNotification();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNotification(
        {
          message: 'Invalid username or password.',
          color: 'red',
        },
        5
      );

      console.error(error);
    }
  };

  const handleLogout = () => {
    removeUser();

    usernameField.reset();
    passwordField.reset();
  };

  if (user !== null)
    return (
      <>
        <h2>Logged in as {user.username}</h2>
        <Button onClick={handleLogout}>Logout</Button>
      </>
    );

  return (
    <>
      <h2>Log in to application</h2>

      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>
            Username:{' '}
            <input
              type='text'
              name='username'
              value={usernameField.value}
              onChange={usernameField.onChange}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Password:{' '}
            <input
              type='text'
              name='password'
              value={passwordField.value}
              onChange={passwordField.onChange}
            />
          </label>
        </Form.Field>
        <Button loading={loading && true} type='submit'>
          Login
        </Button>
      </Form>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  setUser,
  removeUser,
  setNotification,
  removeNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
