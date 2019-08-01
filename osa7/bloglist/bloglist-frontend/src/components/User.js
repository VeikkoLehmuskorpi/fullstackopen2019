import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const User = ({ blogs, user }) => {
  return (
    <>
      <h2>{user.name}</h2>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Added Blogs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {blogs.map(blog => (
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

const blogsToShow = (blogs, id) => {
  return blogs.filter(blog => blog.user.id === id);
};

const mapStateToProps = (state, user) => {
  return {
    blogs: blogsToShow(state.blogs, user.user.id),
  };
};

export default connect(
  mapStateToProps,
  null
)(User);
