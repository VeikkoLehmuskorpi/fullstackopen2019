import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const BlogList = ({ blogs, user }) => {
  if (user === null) return null;

  return (
    <Table>
      <Table.Body>
        {blogs.map(blog => (
          <Table.Row key={blog.id}>
            <Table.Cell>
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                <h3>{blog.title}</h3>
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const sortedBlogs = blogs => blogs.sort((a, b) => b.likes - a.likes);

const mapStateToProps = state => {
  return {
    blogs: sortedBlogs(state.blogs),
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(BlogList);
