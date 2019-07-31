import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UserList = ({ blogs }) => {
  const users = blogs.map(blog => blog.user);

  const uniqueUserIds = [...new Set(users.map(user => user.id))];

  const uniqueUsers = uniqueUserIds
    .map(id => {
      return users.find(user => user.id === id);
    })
    .map(user => ({
      ...user,
      blogs: users.filter(u => u.id === user.id).length,
    }));

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>Blogs</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {uniqueUsers.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
  };
};

export default connect(
  mapStateToProps,
  null
)(UserList);
