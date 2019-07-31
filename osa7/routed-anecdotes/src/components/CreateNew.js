import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const CreateNew = props => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    });
    setSubmitted(true);
  };

  return !submitted ? (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" value={content} onChange={e => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name="author" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name="info" value={info} onChange={e => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default CreateNew;
