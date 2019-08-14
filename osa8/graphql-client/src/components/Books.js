import React, { useEffect, useState } from 'react';
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';

const Books = ({ show, loading, error, data, booksQuery }) => {
  const client = useApolloClient();

  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(null);

  useEffect(() => {
    console.log('setAllGenres ran');

    (async () => {
      const { data: clientData } = await client.query({
        query: booksQuery,
      });
      const clientGenres = Array.from(clientData.allBooks)
        .map(book => book.genres)
        .flat();
      const clientGenresUnique = Array.from(new Set(clientGenres));
      setAllGenres(clientGenresUnique);
    })();
  }, [booksQuery, client]);

  const [getFilteredBooks, { data: filteredData }] = useLazyQuery(booksQuery, {
    variables: { genresArray: [selectedGenre] },
  });

  useEffect(() => {
    console.log('getFilteredData ran');
    getFilteredBooks();
  }, [getFilteredBooks, selectedGenre]);

  useEffect(() => {
    console.log('filteredData ran');
    if (filteredData && filteredData.allBooks) {
      console.log('allBooks:', filteredData.allBooks);
      setFilteredBooks(filteredData.allBooks);
    }
  }, [filteredData]);

  const booksToShow = () => {
    let source;

    if (selectedGenre && filteredBooks) {
      source = filteredBooks;
    } else {
      source = data.allBooks;
    }

    return source.map(book => (
      <tr key={book.title}>
        <td>{book.title}</td>
        <td>{book.author.name}</td>
        <td>{book.genres.join(', ')}</td>
        <td>{book.published}</td>
      </tr>
    ));
  };

  if (!show) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && <p>In genre "{selectedGenre}"</p>}

      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>category</th>
            <th>published</th>
          </tr>
          {booksToShow()}
        </tbody>
      </table>

      {allGenres.map(genre => (
        <button key={genre} value={genre} onClick={({ target }) => setSelectedGenre(target.value)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setSelectedGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
