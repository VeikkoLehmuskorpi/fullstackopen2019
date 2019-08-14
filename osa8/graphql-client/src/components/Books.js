import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

const Books = ({ show, loading, error, data, booksQuery }) => {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    try {
      const allGenres = Array.from(data.allBooks).map(book => book.genres);
      setAllGenres([...new Set(allGenres.flat())]);
    } catch (error) {}
  }, [data]);

  const [filterByGenres, { data: genresData }] = useLazyQuery(booksQuery, {
    variables: { genresArray: selectedGenre },
  });

  const handleGenreFilter = event => {
    setSelectedGenre([event.target.value]);
    filterByGenres();
    try {
      if (genresData.allBooks.length > 0) {
        setFilteredData(genresData);
      }
    } catch (error) {}
  };

  if (!show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const booksToShow = () => {
    let source;

    if (filteredData.allBooks) {
      source = filteredData;
    } else {
      source = data;
    }

    return source.allBooks.map(book => (
      <tr key={book.title}>
        <td>{book.title}</td>
        <td>{book.author.name}</td>
        <td>{book.genres.join(', ')}</td>
        <td>{book.published}</td>
      </tr>
    ));
  };

  const resetFilter = () => {
    setSelectedGenre(null);
    setFilteredData([]);
  };

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

      {allGenres &&
        allGenres.map(genre => (
          <button onClick={handleGenreFilter} key={genre} value={genre}>
            {genre}
          </button>
        ))}
      <button onClick={resetFilter}>all genres</button>
    </div>
  );
};

export default Books;
