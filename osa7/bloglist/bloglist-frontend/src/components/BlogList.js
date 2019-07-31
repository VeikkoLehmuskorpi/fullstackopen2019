import React from 'react';
import { connect } from 'react-redux';
import Blog from './Blog';

const BlogList = ({ blogs, ...props }) => {
  return blogs
    .sort((a, b) => b.likes - a.likes)
    .map(blog => <Blog key={blog.id} blog={blog} {...props} />);
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
  };
};

export default connect(
  mapStateToProps,
  null
)(BlogList);
