import React from 'react';
import Notification from './Notification';

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  notification,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>

      {notification && <Notification notification={notification} />}

      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:{' '}
            <input type="text" name="username" value={username} onChange={handleUsernameChange} />
          </label>
        </div>
        <div>
          <label>
            Password:{' '}
            <input type="text" name="password" value={password} onChange={handlePasswordChange} />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
