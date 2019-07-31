import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initBlogs } from './reducers/blogReducer';
import { setUserFromStorage } from './reducers/userReducer';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = ({ user, setUserFromStorage, initBlogs }) => {
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedInBloglistUser');
    if (userJSON !== null) {
      const parsedUser = JSON.parse(userJSON);
      setUserFromStorage(parsedUser);
    }
  }, []);

  // loginForm ref
  const loginFormRef = React.createRef();

  // blogForm ref
  const blogFormRef = React.createRef();

  useEffect(() => {
    initBlogs();
  }, [user]);

  return (
    <>
      <h2>Blogs</h2>

      <Notification />

      <Togglable showLabel='Login' ref={loginFormRef}>
        <LoginForm />
      </Togglable>

      {user && (
        <Togglable showLabel='New note' ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      )}

      {user && <BlogList user={user && user} />}
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  setUserFromStorage,
  initBlogs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
