import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import Select from 'react-select';

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
  const client = useApolloClient();
  const { allAuthors } = client.readQuery({
    query: gql`
      query allAuthors {
        allAuthors {
          name
        }
      }
    `,
  });

  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor, { loading }] = useMutation(EDIT_AUTHOR, {
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
          <Select
            isSearchable
            loading={loading}
            onChange={({ value }) => setName(value)}
            options={allAuthors.map(author => {
              return {
                value: author.name,
                label: author.name,
              };
            })}
          />
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
