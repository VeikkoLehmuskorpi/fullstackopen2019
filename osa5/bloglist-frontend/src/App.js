import React, { useState } from 'react';
import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
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

  if (user === null) {
    return loginForm();
  }

  return (
    <>
      <h1>Blogs</h1>

      <p>{user.name} logged in</p>
    </>
  );
};

export default App;
