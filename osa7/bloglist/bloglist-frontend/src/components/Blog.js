import React from 'react';
import { connect } from 'react-redux';
import { updateBlog, removeBlog } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Segment, Button, Label, Icon } from 'semantic-ui-react';
import { setNotification } from '../reducers/notificationReducer';
import CommentList from './CommentList';

const Blog = ({
  blog,
  user,
  linked,
  updateBlog,
  removeBlog,
  setNotification,
}) => {
  const handleblogLike = async blog => {
    const updatedFields = {
      likes: blog.likes + 1,
    };

    updateBlog(blog, updatedFields, user.token);
  };

  const handleBlogRemove = async blog => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      removeBlog(blog, user.token);
      setNotification({ message: `${blog.title} removed`, color: 'green' }, 5);
    }
  };

  if (!blog) return <Redirect to='/'></Redirect>;

  return (
    <>
      <h2 className='blog-title'>
        {blog.title} by {blog.author}
      </h2>

      {linked && (
        <Segment.Group className='blog'>
          <>
            <Segment>{blog.url}</Segment>

            <Segment>
              {user && (
                <Button
                  as='div'
                  labelPosition='right'
                  onClick={() => handleblogLike(blog)}
                >
                  <Button icon>
                    <Icon name='heart'></Icon> Like
                  </Button>
                  <Label as='a' basic pointing='left'>
                    {blog.likes}
                  </Label>
                </Button>
              )}
            </Segment>

            <Segment>added by {blog.user.name}</Segment>

            {user && blog.user.username === user.username ? (
              <Segment>
                <Button
                  animated='vertical'
                  onClick={() => handleBlogRemove(blog)}
                >
                  <Button.Content hidden>Remove</Button.Content>
                  <Button.Content visible>
                    <Icon name='trash'></Icon>
                  </Button.Content>
                </Button>
              </Segment>
            ) : null}

            <Segment>
              <CommentList blog={blog} user={user}></CommentList>
            </Segment>
          </>
        </Segment.Group>
      )}
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object,
};

const mapDispatchToProps = {
  updateBlog,
  removeBlog,
  setNotification,
};

export default connect(
  null,
  mapDispatchToProps
)(Blog);
