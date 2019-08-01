import React from 'react';
import { connect } from 'react-redux';
import { commentOnBlog } from '../reducers/blogReducer';
import { Form } from 'semantic-ui-react';

const CommentForm = ({ blog, user, commentOnBlog }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const comment = e.target.comment.value;
    e.target.comment.value = '';
    commentOnBlog(blog, comment, user.token);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Input placeholder='Comment' name='comment' type='text' />
        <Form.Button type='submit'>send</Form.Button>
      </Form.Group>
    </Form>
  );
};

const mapDispatchToProps = {
  commentOnBlog,
};

export default connect(
  null,
  mapDispatchToProps
)(CommentForm);
