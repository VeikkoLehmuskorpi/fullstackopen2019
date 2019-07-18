import React from 'react';

const BlogForm = ({
  handleCreateBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label>
            Title: <input type="text" name="title" value={title} onChange={handleTitleChange} />
          </label>
        </div>
        <div>
          <label>
            Author: <input type="text" name="author" value={author} onChange={handleAuthorChange} />
          </label>
        </div>
        <div>
          <label>
            URL: <input type="text" name="url" value={url} onChange={handleUrlChange} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
