import React from 'react';
import { useField } from '../hooks/index';
import { connect } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Form, Button, Input } from 'semantic-ui-react';

const BlogForm = ({ blogFormRef, user, createBlog, setNotification }) => {
  const titleField = useField('text');
  const authorField = useField('text');
  const urlField = useField('text');

  const handleCreateBlog = async event => {
    event.preventDefault();

    blogFormRef.current.toggleVisibility();

    const title = titleField.value;
    const author = authorField.value;
    const url = urlField.value;

    try {
      createBlog({ title, author, url }, user, user.token);

      titleField.reset();
      authorField.reset();
      urlField.reset();

      setNotification(
        {
          message: `A new blog "${title}" added`,
          color: 'green',
        },
        5
      );
    } catch (error) {
      setNotification(
        {
          message: 'Missing blog details.',
          color: 'red',
        },
        5
      );

      console.error(error);
    }
  };

  return (
    <>
      <h2>Create new</h2>
      <Form onSubmit={handleCreateBlog}>
        <Form.Field>
          <label>
            Title:{' '}
            <Input
              type='text'
              name='title'
              value={titleField.value}
              onChange={titleField.onChange}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Author:{' '}
            <Input
              type='text'
              name='author'
              value={authorField.value}
              onChange={authorField.onChange}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            URL:{' '}
            <Input
              type='text'
              name='url'
              value={urlField.value}
              onChange={urlField.onChange}
            />
          </label>
        </Form.Field>
        <Button type='submit'>Create</Button>
      </Form>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  createBlog,
  setNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm);
