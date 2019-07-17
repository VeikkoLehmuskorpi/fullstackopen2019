import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('effect ran');

    const userJSON = window.localStorage.getItem('loggedInBloglistUser');
    if (userJSON !== null) {
      setUser(JSON.parse(userJSON));
    }

    return () => {
      console.log('cleaning effect');
    };
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    console.log('effect ran');

    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    fetchBlogs();

    return () => console.log('cleaning effect');
  }, [user]);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBloglistUser');
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

  const Blog = ({ blog }) => {
    return <p key={blog.id}>{blog.title}</p>;
  };

  return (
    <>
      <h1>Blogs</h1>

      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default App;
