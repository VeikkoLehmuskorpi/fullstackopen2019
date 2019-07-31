import React from 'react';
import { connect } from 'react-redux';
import Blog from './Blog';

const BlogList = ({ blogs, user }) => {
  if (user === null) return null;

  return blogs
    .sort((a, b) => b.likes - a.likes)
    .map(blog => <Blog key={blog.id} blog={blog} user={user} />);
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(BlogList);
