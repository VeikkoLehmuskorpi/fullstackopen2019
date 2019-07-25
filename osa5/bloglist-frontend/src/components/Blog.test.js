import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import Blog from './Blog';
import { handleBlogLike, handleBlogRemove } from '../app';

afterEach(cleanup);

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
  };

  const component = render(
    <Blog
      blog={blog}
      handleblogLike={() => handleBlogLike(blog)}
      handleBlogRemove={() => handleBlogRemove(blog)}
    ></Blog>
  );

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});
