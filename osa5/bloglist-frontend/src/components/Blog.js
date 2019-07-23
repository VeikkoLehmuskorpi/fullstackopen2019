import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user, handleblogLike }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => setDetailsVisible(!detailsVisible);

  const blogStyle = {
    background: '#f4f4f4',
    padding: '1rem',
    margin: '0 0 1rem 0',
  };

  useEffect(() => {
    console.log(blog);
  }, [blog]);

  const handleBlogRemove = async () => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      await blogService.remove(blog, user.token);
    }
  };

  return (
    <div style={blogStyle}>
      <div onClick={toggleDetailsVisibility}>
        {blog.title} {blog.author}
      </div>
      {detailsVisible ? (
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes <button onClick={() => handleblogLike(blog)}>like</button>
          </div>
          <div>added by {blog.user.name}</div>
          {blog.user.username === user.username ? (
            <button onClick={handleBlogRemove}>Remove</button>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Blog;
