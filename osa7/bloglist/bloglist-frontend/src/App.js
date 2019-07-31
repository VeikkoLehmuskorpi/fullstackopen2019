import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initBlogs } from './reducers/blogReducer';
import { initUser } from './reducers/userReducer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import UserList from './components/UserList';

const App = ({ user, initUser, initBlogs }) => {
  useEffect(() => {
    initUser();
  }, [initUser]);

  useEffect(() => {
    initBlogs();
  }, [initBlogs, user]);

  // blogForm ref
  const blogFormRef = React.createRef();

  return (
    <>
      <h2>Blogs</h2>

      <Notification />

      <LoginForm />

      <Router>
        <>
          <Route
            exact
            path='/'
            render={() => (
              <>
                {user && (
                  <Togglable showLabel='New note' ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                )}

                <BlogList />
              </>
            )}
          ></Route>
          <Route path='/users' render={() => <UserList></UserList>}></Route>
        </>
      </Router>
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
