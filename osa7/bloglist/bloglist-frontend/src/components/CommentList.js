import React from 'react';
import { List } from 'semantic-ui-react';
import CommentForm from './CommentForm';

const CommentList = ({ blog, user }) => {
  return (
    <>
      <h2>Comments</h2>

      <CommentForm blog={blog} user={user} />

      {blog.comments.length > 0 && (
        <List animated relaxed divided verticalAlign='middle'>
          {blog.comments.map(comment => (
            <List.Item key={comment.timestamp}>{comment.comment}</List.Item>
          ))}
        </List>
      )}
    </>
  );
};

export default CommentList;
