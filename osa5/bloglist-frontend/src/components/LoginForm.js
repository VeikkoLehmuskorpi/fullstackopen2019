import React from 'react';

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  handleLoginButtons,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>

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
        <button type="button" onClick={handleLoginButtons}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
