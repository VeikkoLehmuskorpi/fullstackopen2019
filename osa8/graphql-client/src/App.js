import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

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

const App = () => {
  const [page, setPage] = useState('authors');

  const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(ALL_AUTHORS);

  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        loading={authorsLoading}
        error={authorsError}
        data={authorsData}
      />

      <Books show={page === 'books'} loading={booksLoading} error={booksError} data={booksData} />

      <NewBook show={page === 'add'} addBook={addBook} />
    </div>
  );
};

export default App;
