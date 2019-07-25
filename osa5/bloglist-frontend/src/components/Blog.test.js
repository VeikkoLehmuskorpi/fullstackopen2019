import React from 'react';
import { render } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';
import { handleBlogLike, handleBlogRemove } from '../app';

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

  component.debug();

  console.log(prettyDOM(component.container.querySelector('.blog > div')));

  // method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );

  // method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(element).toBeDefined();

  // method 3
  const div = component.container.querySelector('.blog');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});
