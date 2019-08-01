import React from 'react';
import { connect } from 'react-redux';
import { commentOnBlog } from '../reducers/blogReducer';

const CommentForm = ({ blog, user, commentOnBlog }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const comment = e.target.comment.value;
    commentOnBlog(blog, comment, user.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Comment on blog
        <input name='comment' type='text' />
      </label>
      <button type='submit'>send</button>
    </form>
  );
};

const mapDispatchToProps = {
  commentOnBlog,
};

export default connect(
  null,
  mapDispatchToProps
)(CommentForm);
