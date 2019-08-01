import React from 'react';
import CommentForm from './CommentForm';

const CommentList = ({ blog, user }) => {
  if (blog.comments.length === 0) return null;

  return (
    <div>
      <h2>Comments</h2>

      <CommentForm blog={blog} user={user}></CommentForm>

      <ul>
        {blog.comments.map(comment => (
          <li key={comment.timestamp}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
