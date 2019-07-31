import React from 'react';

const BlogForm = ({ handleCreateBlog, titleField, authorField, urlField }) => {
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

export default BlogForm;
