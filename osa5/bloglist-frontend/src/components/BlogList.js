import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, token }) => {
  return blogs.map(blog => <Blog key={blog.id} blog={blog} token={token} />);
};

export default BlogList;
