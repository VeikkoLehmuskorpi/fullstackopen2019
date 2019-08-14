import React, { useState, useEffect } from 'react';

const LoginForm = ({ show, login, token, setToken }) => {
  useEffect(() => {
    if (!token) {
      console.log('Checking local storage for user token...');
      const lsToken = localStorage.getItem('books-and-authors-user-token');
      if (lsToken) {
        setToken(lsToken);
      }
    }
  }, [setToken, token]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async event => {
    event.preventDefault();

    const result = await login({ variables: { username, password } });

    if (result) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('books-and-authors-user-token', token);
      setUsername('');
      setPassword('');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
