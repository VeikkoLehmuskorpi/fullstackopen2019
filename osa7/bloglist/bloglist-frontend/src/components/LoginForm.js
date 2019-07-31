import React from 'react';

const LoginForm = ({
  user,
  handleLogin,
  handleLogout,
  usernameField,
  passwordField,
}) => {
  if (user !== null)
    return (
      <div>
        <p>Logged in as {user.username}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
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

export default LoginForm;
