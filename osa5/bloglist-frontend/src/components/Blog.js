import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => setDetailsVisible(!detailsVisible);

  const blogStyle = {
    background: '#f4f4f4',
    padding: '1rem',
    margin: '0 0 1rem 0',
  };

  if (detailsVisible) {
    return (
      <div style={blogStyle}>
        <div onClick={toggleDetailsVisibility}>
          {blog.title} {blog.author}
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes <button>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleDetailsVisibility}>
        {blog.title} {blog.author}
      </div>
    </div>
  );
};

export default Blog;
