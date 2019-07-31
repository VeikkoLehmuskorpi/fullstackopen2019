import React from 'react';
import { useField } from '../hooks/index';
import { connect } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { setUser, removeUser } from '../reducers/userReducer';

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
        <button onClick={handleLogout}>Logout</button>
      </>
    );

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:{' '}
            <input
              type='text'
              name='username'
              value={usernameField.value}
              onChange={usernameField.onChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:{' '}
            <input
              type='text'
              name='password'
              value={passwordField.value}
              onChange={passwordField.onChange}
            />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
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
