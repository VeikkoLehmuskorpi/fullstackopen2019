import React from 'react';
import { connect } from 'react-redux';

const User = ({ blogs, user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Added blogs</p>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

const blogsToShow = (blogs, id) => {
  return blogs.filter(blog => blog.user.id === id);
};

const mapStateToProps = (state, user) => {
  return {
    blogs: blogsToShow(state.blogs, user.user.id),
  };
};

export default connect(
  mapStateToProps,
  null
)(User);
