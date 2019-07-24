import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, ...props }) => {
  return blogs
    .sort((a, b) => b.likes - a.likes)
    .map(blog => <Blog key={blog.id} blog={blog} {...props} />);
};

export default BlogList;
