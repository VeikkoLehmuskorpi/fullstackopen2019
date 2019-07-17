import React, { useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = event => {
    event.preventDefault();
    setUser({ username, password });
  };

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:{' '}
            <input
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:{' '}
            <input
              type="text"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );

  return (
    <>
      <h1>Bloglist</h1>

      {loginForm()}

      {user !== null ? <p>Logged in as {user.username}</p> : null}
    </>
  );
};

export default App;
