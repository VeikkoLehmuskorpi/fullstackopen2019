/* eslint-disable react/require-default-props */
/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Segment, Button, Label, Icon } from 'semantic-ui-react';
import { updateBlog, removeBlog } from '../reducers/blogReducer';
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
  const handleblogLike = async currentBlog => {
    const updatedFields = {
      likes: currentBlog.likes + 1,
    };

    updateBlog(currentBlog, updatedFields, user.token);
  };

  const handleBlogRemove = async currentBlog => {
    if (window.confirm(`Remove blog "${currentBlog.title}"?`)) {
      removeBlog(currentBlog, user.token);
      setNotification(
        { message: `${currentBlog.title} removed`, color: 'green' },
        5
      );
    }
  };

  if (!blog) return <Redirect to='/' />;

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
                    <Icon name='heart' /> Like
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
                    <Icon name='trash' />
                  </Button.Content>
                </Button>
              </Segment>
            ) : null}

            <Segment>
              <CommentList blog={blog} user={user} />
            </Segment>
          </>
        </Segment.Group>
      )}
    </>
  );
};

Blog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blog: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
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
