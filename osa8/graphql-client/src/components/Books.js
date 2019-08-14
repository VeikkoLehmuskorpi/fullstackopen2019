import React, { useEffect, useState } from 'react';
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';

const Books = ({ show, loading, error, data, booksQuery }) => {
  const client = useApolloClient();

  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(null);

  useEffect(() => {
    console.log(`Client changed, refetching all genres and filtered data...`);

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

  const [getFilteredData, { data: filteredData, refetch }] = useLazyQuery(booksQuery);

  useEffect(() => {
    if (selectedGenre) {
      console.log(`Selected genre ${selectedGenre} - Refetching filtered data...`);
      getFilteredData({
        variables: { genresArray: [selectedGenre] },
      });
    } else {
      setFilteredBooks(null);
      getFilteredData();
    }
  }, [getFilteredData, selectedGenre]);

  useEffect(() => {
    console.log(`Filtered data changed, changing filtered books in state...`);
    if (filteredData && filteredData.allBooks) {
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

  const handleFilterChange = ({ target }) => {
    setSelectedGenre(target.value);
    refetch({
      variables: { genresArray: [selectedGenre] },
    });
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
        <button key={genre} value={genre} onClick={handleFilterChange}>
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          setSelectedGenre(null);
        }}>
        all genres
      </button>
    </div>
  );
};

export default Books;
