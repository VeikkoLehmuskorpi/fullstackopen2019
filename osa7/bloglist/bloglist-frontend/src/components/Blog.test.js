/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/jest-dom';
// eslint-disable-next-line import/named
import { handleBlogLike, handleBlogRemove } from './Blog';

describe('<Blog/>', () => {
  test('renders content', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
    };

    const component = render(
      <Blog
        blog={blog}
        handleblogLike={() => handleBlogLike(blog)}
        handleBlogRemove={() => handleBlogRemove(blog)}
      />
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

  test('renders only title and author by default', () => {
    const blog = {
      title: 'Doe Title',
      author: 'John Doe',
      url: 'www.github.com',
      likes: 3,
      user: {
        id: '123abc',
        name: 'John Doe',
        username: 'jdoe',
      },
    };

    const component = render(
      <Blog
        blog={blog}
        handleblogLike={() => handleBlogLike(blog)}
        handleBlogRemove={() => handleBlogRemove(blog)}
      />
    );

    expect(component.container).toHaveTextContent('Doe Title');
    expect(component.container).toHaveTextContent('John Doe');
    expect(component.container).not.toHaveTextContent('www.github.com');
    expect(component.container).not.toHaveTextContent('3 likes');
    expect(component.container).not.toHaveTextContent('added by John Doe');
  });

  test('renders details after title has been clicked', () => {
    const blog = {
      title: 'Doe Title',
      author: 'John Doe',
      url: 'www.github.com',
      likes: 3,
      user: {
        id: '123abc',
        name: 'John Doe',
        username: 'jdoe',
      },
    };

    const component = render(
      <Blog
        blog={blog}
        handleblogLike={() => handleBlogLike(blog)}
        handleBlogRemove={() => handleBlogRemove(blog)}
      />
    );

    const title = component.container.querySelector('.blog-title');

    fireEvent.click(title);

    expect(component.container).toHaveTextContent('Doe Title');
    expect(component.container).toHaveTextContent('John Doe');
    expect(component.container).toHaveTextContent('www.github.com');
    expect(component.container).toHaveTextContent('3 likes');
    expect(component.container).toHaveTextContent('added by John Doe');
  });
});
