import React from 'react';
import { useField } from '../hooks/index';
import { connect } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { setUser, removeUser } from '../reducers/userReducer';
import { Form, Button } from 'semantic-ui-react';

const LoginForm = ({ user, setUser, removeUser, setNotification }) => {
  const usernameField = useField('text');
  const passwordField = useField('text');

  const handleLogin = async event => {
    event.preventDefault();

    const username = usernameField.value;
    const password = passwordField.value;

    try {
      await setUser({
        username,
        password,
      });
    } catch (error) {
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
        <div style={{ display: 'inline-block', marginRight: '.5rem' }}>
          Logged in as {user.username}
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </>
    );

  return (
    <div>
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
        <Button type='submit'>Login</Button>
      </Form>
    </div>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
