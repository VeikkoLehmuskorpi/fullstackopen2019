import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

const Recommend = ({ show, loading, error, data, booksQuery }) => {
  const [favoriteGenre, setFavoriteGenre] = useState([]);

  const [filterByGenres, { data: genresData }] = useLazyQuery(booksQuery, {
    variables: { genresArray: favoriteGenre },
  });

  useEffect(() => {
    if (data.me) {
      setFavoriteGenre([data.me.favoriteGenre]);
      filterByGenres();
    }
  }, [data, filterByGenres]);

  if (!show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const booksToShow = () => {
    let source;

    if (genresData.allBooks) {
      source = genresData;
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

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre "{data.me.favoriteGenre}"</p>

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
    </div>
  );
};

export default Recommend;
