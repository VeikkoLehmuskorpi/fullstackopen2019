import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';

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
  query($genresArray: [String!]) {
    allBooks(genre: $genresArray) {
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

const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

const App = () => {
  const client = useApolloClient();

  const [token, setToken] = useState(null);

  const [page, setPage] = useState('authors');

  const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(ALL_AUTHORS);

  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS);

  const { loading: meLoading, error: meError, data: meData } = useQuery(ME);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const [login] = useMutation(LOGIN, {
    refetchQueries: [{ query: ME }],
  });

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
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
        loading={authorsLoading}
        error={authorsError}
        data={authorsData}
      />

      <Books
        show={page === 'books'}
        loading={booksLoading}
        error={booksError}
        data={booksData}
        booksQuery={ALL_BOOKS}
      />

      <NewBook show={page === 'add'} addBook={addBook} />

      <Recommend
        show={page === 'recommend'}
        loading={meLoading}
        error={meError}
        data={meData}
        booksQuery={ALL_BOOKS}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        token={token}
        setToken={token => setToken(token)}
      />
    </div>
  );
};

export default App;
