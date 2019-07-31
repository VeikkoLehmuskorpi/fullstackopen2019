import React, { useState, useEffect } from 'react';
import { useField, useResource } from './hooks';
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

  const usernameField = useField('text');
  const passwordField = useField('text');

  const handleLogin = async event => {
    event.preventDefault();

    const username = usernameField.value;
    const password = passwordField.value;

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
    usernameField.reset();
    passwordField.reset();
    window.localStorage.removeItem('loggedInBloglistUser');
  };

  //
  // blogs
  //
  const [blogs, blogService] = useResource('http://localhost:3002/api/blogs');
  const titleField = useField('text');
  const authorField = useField('text');
  const urlField = useField('text');

  // blogForm ref
  const blogFormRef = React.createRef();

  const fetchBlogs = async () => {
    await blogService.getAll();
  };

  useEffect(() => {
    console.log('blog effect ran');

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

    const title = titleField.value;
    const author = authorField.value;
    const url = urlField.value;

    try {
      await blogService.create({ title, author, url }, user.token);

      titleField.reset();
      authorField.reset();
      urlField.reset();

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

    await blogService.update(blog, updatedFields, user.token);
  };

  const handleBlogRemove = async blog => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      await blogService.remove(blog, user.token);
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
          usernameField={usernameField}
          passwordField={passwordField}
        />
      </Togglable>

      {user && (
        <Togglable showLabel='New note' ref={blogFormRef}>
          <BlogForm
            handleCreateBlog={handleCreateBlog}
            titleField={titleField}
            authorField={authorField}
            urlField={urlField}
          />
        </Togglable>
      )}

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
