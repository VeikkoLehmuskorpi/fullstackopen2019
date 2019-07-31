import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initBlogs } from './reducers/blogReducer';
import { initUser } from './reducers/userReducer';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = ({ user, initUser, initBlogs }) => {
  useEffect(() => {
    initUser();
  }, [initUser]);

  useEffect(() => {
    initBlogs();
  }, [initBlogs, user]);

  // loginForm ref
  const loginFormRef = React.createRef();

  // blogForm ref
  const blogFormRef = React.createRef();

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
  initUser,
  initBlogs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
