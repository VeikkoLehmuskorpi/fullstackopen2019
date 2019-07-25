import React from 'react';
import { render } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog/>', () => {
  let component;

  let blog = {
    title: 'Testing React components',
    author: 'Veikko Lehmuskorpi',
    likes: 3,
  };

  beforeEach(() => {
    component = render(
      <SimpleBlog
        blog={blog}
        onClick={() => (blog.likes = blog.likes + 1)}
      ></SimpleBlog>
    );
  });

  test('renders title, author and likes', () => {
    component.debug();

    const titleAndAuthor = component.container.querySelector('.titleAndAuthor');
    expect(titleAndAuthor).toHaveTextContent('Testing React components');
    expect(titleAndAuthor).toHaveTextContent('Veikko Lehmuskorpi');

    const likes = component.container.querySelector('.likes');
    expect(likes).toHaveTextContent('blog has 3 likes');
  });
});
