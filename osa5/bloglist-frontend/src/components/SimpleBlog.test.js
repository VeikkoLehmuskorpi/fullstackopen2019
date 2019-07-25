import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog/>', () => {
  test('renders title, author and likes', () => {
    const blog = {
      title: 'Testing React components',
      author: 'Veikko Lehmuskorpi',
      likes: 3,
    };

    const onClick = jest.fn();

    const component = render(
      <SimpleBlog blog={blog} onClick={onClick}></SimpleBlog>
    );

    component.debug();

    const titleAndAuthor = component.container.querySelector('.title-author');
    expect(titleAndAuthor).toHaveTextContent('Testing React components');
    expect(titleAndAuthor).toHaveTextContent('Veikko Lehmuskorpi');

    const likes = component.container.querySelector('.likes');
    expect(likes).toHaveTextContent('blog has 3 likes');
  });

  test('like button event handler gets called every click', () => {
    const blog = {
      title: 'Testing React components',
      author: 'Veikko Lehmuskorpi',
      likes: 3,
    };

    const onClick = jest.fn();

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={onClick}></SimpleBlog>
    );

    const likeButton = getByText('like');
    fireEvent.click(likeButton);

    expect(onClick).toHaveBeenCalled();
  });
});
