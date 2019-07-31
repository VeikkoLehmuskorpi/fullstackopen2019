import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateBlog, removeBlog } from '../reducers/blogReducer';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => setDetailsVisible(!detailsVisible);

  const blogStyle = {
    background: '#f4f4f4',
    padding: '1rem',
    margin: '0 0 1rem 0',
  };

  const handleblogLike = async blog => {
    const updatedFields = {
      likes: blog.likes + 1,
    };

    updateBlog(blog, updatedFields, user.token);
  };

  const handleBlogRemove = async blog => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      removeBlog(blog, user.token);
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      <div className='blog-title' onClick={toggleDetailsVisibility}>
        {blog.title} {blog.author}
      </div>
      {detailsVisible ? (
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes{' '}
            {user && <button onClick={() => handleblogLike(blog)}>like</button>}
          </div>
          <div>added by {blog.user.name}</div>
          {user && blog.user.username === user.username ? (
            <button onClick={() => handleBlogRemove(blog)}>Remove</button>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapDispatchToProps = {
  updateBlog,
  removeBlog,
};

export default connect(
  null,
  mapDispatchToProps
)(Blog);
