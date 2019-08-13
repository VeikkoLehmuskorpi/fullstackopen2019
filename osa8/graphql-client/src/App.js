import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      id
      genres
      author {
        name
        born
        id
        bookCount
      }
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($title: String, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      id
      genres
      author {
        name
        born
        id
        bookCount
      }
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const App = () => {
  const client = useApolloClient();

  const [token, setToken] = useState(null);

  const [page, setPage] = useState('authors');

  const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(ALL_AUTHORS);

  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const [login] = useMutation(LOGIN);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.clearStore();
    setPage('authors');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
        loading={authorsLoading}
        error={authorsError}
        data={authorsData}
      />

      <Books show={page === 'books'} loading={booksLoading} error={booksError} data={booksData} />

      <NewBook show={page === 'add'} addBook={addBook} />

      <LoginForm show={page === 'login'} login={login} setToken={token => setToken(token)} />
    </div>
  );
};

export default App;
