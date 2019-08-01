import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

const UserList = ({ user, users }) => {
  if (user === null) return <Redirect to='/login'></Redirect>;

  return (
    <>
      <h2>Users</h2>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Blogs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogs}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(UserList);
