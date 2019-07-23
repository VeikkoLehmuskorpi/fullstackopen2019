import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, token }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => setDetailsVisible(!detailsVisible);

  const blogStyle = {
    background: '#f4f4f4',
    padding: '1rem',
    margin: '0 0 1rem 0',
  };

  const handleblogLike = async () => {
    const updatedFields = {
      likes: blog.likes + 1,
    };

    const modifiedBlog = await blogService.update(blog, updatedFields, token);
    console.log(modifiedBlog);
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
            {blog.likes} likes <button onClick={handleblogLike}>like</button>
          </div>
          <div>added by {blog.user.name}</div>
        </>
      ) : null}
    </div>
  );
};

export default Blog;
