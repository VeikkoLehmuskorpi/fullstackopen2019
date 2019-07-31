import React from 'react';
import { connect } from 'react-redux';
import Blog from './Blog';

const BlogList = ({ blogs, user }) => {
  if (user === null) return null;

  return blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} />);
};

const sortedBlogs = blogs => blogs.sort((a, b) => b.likes - a.likes);

const mapStateToProps = state => {
  return {
    blogs: sortedBlogs(state.blogs),
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(BlogList);
