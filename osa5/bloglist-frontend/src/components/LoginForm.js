import React from 'react';

const LoginForm = ({
  user,
  handleLogin,
  handleLogout,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
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
