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

    return () => console.log('cleaning effect');
  }, []);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log('effect ran');

    if (notification === null) {
      return;
    }

    setNotification(notification);

    const interval = setTimeout(() => {
      console.log('5 seconds passed, removing message');
      setNotification(null);
    }, 5000);

    return () => {
      console.log('cleaning effect');
      clearTimeout(interval);
    };
  }, [notification]);

  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    console.log('effect ran');

    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    try {
      fetchBlogs();
    } catch (error) {
      setNotification(error.message);
      console.error(error);
    }

    return () => console.log('cleaning effect');
  }, [user]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user));
    } catch (error) {
      setNotification('Invalid username or password.');
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBloglistUser');
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>

      {notification && <Notification message={notification} />}

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

  const handleCreateBlog = async event => {
    event.preventDefault();
    try {
      const newBlog = await blogService.createNew({ title, author, url }, user.token);
      setBlogs([...blogs, newBlog]);
      setTitle('');
      setAuthor('');
      setUrl('');
      setNotification(`A new blog "${title}" added`);
    } catch (error) {
      setNotification('Missing blog details.');
      console.error(error);
    }
  };

  const blogForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label>
            Title:{' '}
            <input
              type="text"
              name="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:{' '}
            <input
              type="text"
              name="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            URL:{' '}
            <input
              type="text"
              name="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );

  return (
    <>
      <h2>Blogs</h2>

      {notification && <Notification message={notification} />}

      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>

      {blogForm()}

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

const Notification = ({ message }) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default App;
