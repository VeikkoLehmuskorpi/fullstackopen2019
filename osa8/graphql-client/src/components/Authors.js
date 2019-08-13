import React from 'react';
import AuthorUpdateForm from './AuthorUpdateForm';

const Authors = ({ show, loading, error, data }) => {
  if (!show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th />
              <th>born</th>
              <th>books</th>
            </tr>
            {data.allAuthors.map(author => (
              <tr key={author.name}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AuthorUpdateForm />
    </>
  );
};

export default Authors;
