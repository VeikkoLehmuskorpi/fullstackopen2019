import React from 'react';
import { useField } from '../hooks/index';
import { connect } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

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
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label>
            Title:{' '}
            <input
              type='text'
              name='title'
              value={titleField.value}
              onChange={titleField.onChange}
            />
          </label>
        </div>
        <div>
          <label>
            Author:{' '}
            <input
              type='text'
              name='author'
              value={authorField.value}
              onChange={authorField.onChange}
            />
          </label>
        </div>
        <div>
          <label>
            URL:{' '}
            <input
              type='text'
              name='url'
              value={urlField.value}
              onChange={urlField.onChange}
            />
          </label>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
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
