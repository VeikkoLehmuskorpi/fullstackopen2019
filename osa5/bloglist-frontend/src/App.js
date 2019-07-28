import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  //
  // notification
  //
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log('notification effect ran');

    if (notification === null) {
      return;
    }

    const interval = setTimeout(() => {
      console.log('5 seconds passed, removing message');
      setNotification(null);
    }, 5000);

    return () => {
      console.log('cleaning notification effect');
      clearTimeout(interval);
    };
  }, [notification]);

  //
  // user
  //
  const [user, setUser] = useState(null);

  // loginForm ref
  const loginFormRef = React.createRef();

  useEffect(() => {
    console.log('user effect ran');

    const userJSON = window.localStorage.getItem('loggedInBloglistUser');
    if (userJSON !== null) {
      setUser(JSON.parse(userJSON));
    }

    return () => {
      console.log('cleaning user effect');
    };
  }, []);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user));
    } catch (error) {
      setNotification({
        message: 'Invalid username or password.',
        color: 'red',
      });
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBloglistUser');
  };

  //
  // blogs
  //
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  // blogForm ref
  const blogFormRef = React.createRef();

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value);
  };

  const handleUrlChange = ({ target }) => {
    setUrl(target.value);
  };

  useEffect(() => {
    console.log('blog effect ran');

    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      console.log(blogs);
    };

    try {
      fetchBlogs();
    } catch (error) {
      setNotification({ message: error.message, color: 'red' });
      console.error(error);
    }

    return () => console.log('cleaning blog effect');
  }, [user]);

  const handleCreateBlog = async event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    try {
      const newBlog = await blogService.createNew(
        { title, author, url },
        user.token
      );
      setBlogs([...blogs, newBlog]);
      setTitle('');
      setAuthor('');
      setUrl('');
      setNotification({
        message: `A new blog "${title}" added`,
        color: 'green',
      });
    } catch (error) {
      setNotification({
        message: 'Missing blog details.',
        color: 'red',
      });
      console.error(error);
    }
  };

  const handleblogLike = async blog => {
    const updatedFields = {
      likes: blog.likes + 1,
    };

    let modifiedBlog = await blogService.update(blog, updatedFields);

    modifiedBlog.user = {
      id: blog.user.id,
      name: blog.user.name,
      username: blog.user.username,
    };

    setBlogs([...blogs.filter(b => b.id !== blog.id), modifiedBlog]);
  };

  const handleBlogRemove = async blog => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      await blogService.remove(blog, user.token);
      setBlogs([...blogs.filter(b => b.id !== blog.id)]);
    }
  };

  //
  // render
  //
  return (
    <>
      <h2>Blogs</h2>

      <Notification notification={notification} />

      <Togglable showLabel='Login' ref={loginFormRef}>
        <LoginForm
          user={user}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      </Togglable>

      <Togglable showLabel='New note' ref={blogFormRef}>
        <BlogForm
          handleCreateBlog={handleCreateBlog}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>

      {user && (
        <BlogList
          blogs={blogs}
          user={user && user}
          handleblogLike={handleblogLike}
          handleBlogRemove={handleBlogRemove}
        />
      )}
    </>
  );
};

export default App;
