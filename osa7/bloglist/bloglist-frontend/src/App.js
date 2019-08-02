import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { initBlogs } from './reducers/blogReducer';
import { initUser } from './reducers/userReducer';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import UserList from './components/UserList';
import User from './components/User';
import Blog from './components/Blog';
import Menu from './components/Menu';
import LoginForm from './components/LoginForm';

const App = ({ blogs, user, initUser, initBlogs }) => {
  useEffect(() => {
    initUser();
  }, [initUser]);

  useEffect(() => {
    initBlogs();
  }, [initBlogs, user]);

  // blogForm ref
  const blogFormRef = React.createRef();

  const users = blogs.map(blog => blog.user);

  const uniqueUserIds = [...new Set(users.map(u => u.id))];

  const uniqueUsers = uniqueUserIds
    .map(id => {
      return users.find(u => u.id === id);
    })
    .map(uniqueUser => ({
      ...uniqueUser,
      blogs: users.filter(u => u.id === user.id).length,
    }));

  // Find singular item
  const resourceById = (arr, id) => arr.find(a => a.id === id);

  return (
    <Router>
      <>
        <Container>
          <Menu />

          <Notification />
          <Route
            exact
            path='/'
            render={() => (
              <>
                {user && <h2>Blogs</h2>}

                {user && (
                  <Togglable showLabel='New blog' ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                )}

                <BlogList />
              </>
            )}
          />
          <Route
            exact
            path='/blogs/:id'
            render={({ match }) => (
              <Blog
                blog={resourceById(blogs, match.params.id)}
                user={user}
                linked
              />
            )}
          />
          <Route
            exact
            path='/users'
            render={() => <UserList users={uniqueUsers} />}
          />
          <Route
            path='/users/:id'
            render={({ match }) => (
              <User user={resourceById(uniqueUsers, match.params.id)} />
            )}
          />
          <Route path='/login' render={() => <LoginForm />} />
        </Container>
      </>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
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
