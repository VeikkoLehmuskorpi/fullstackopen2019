import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      id
      bookCount
    }
  }
`;

const AuthorUpdateForm = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    variables: {
      name,
      born,
    },
  });

  const submit = async event => {
    event.preventDefault();

    await editAuthor();

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name
          <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(Number(target.value))} />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default AuthorUpdateForm;
