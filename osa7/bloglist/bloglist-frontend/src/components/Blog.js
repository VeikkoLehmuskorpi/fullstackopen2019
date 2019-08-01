import React from 'react';
import { connect } from 'react-redux';
import { updateBlog, removeBlog } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import CommentList from './CommentList';

const Blog = ({ blog, user, linked, updateBlog, removeBlog }) => {
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
    <div className='blog'>
      <div className='blog-title'>
        {blog.title} {blog.author}
      </div>
      {linked && (
        <div>
          <div>{blog.url}</div>

          <div>
            {blog.likes} likes{' '}
            {user && <button onClick={() => handleblogLike(blog)}>like</button>}
          </div>

          <div>added by {blog.user.name}</div>

          {user && blog.user.username === user.username ? (
            <button onClick={() => handleBlogRemove(blog)}>Remove</button>
          ) : null}

          <CommentList blog={blog} user={user}></CommentList>
        </div>
      )}
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
