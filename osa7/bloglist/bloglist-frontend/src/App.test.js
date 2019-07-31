import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('./hooks/index.js');
import App from './App';

describe('<App />', () => {
  test('renders all blogs it gets from backend', async () => {
    // login
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester',
    };

    localStorage.setItem('loggedInBloglistUser', JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() => component.container.querySelector('.blog'));

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(3);

    expect(component.container).toHaveTextContent('HTML is easy');
    expect(component.container).toHaveTextContent(
      'Browser can execute only javascript'
    );
    expect(component.container).toHaveTextContent(
      'The most important methods of HTTP are GET and POST'
    );
  });

  test('doesnt render blogs without a logged in user', async () => {
    // clear localstorage user
    localStorage.setItem('loggedInBloglistUser', null);

    const component = render(<App />);

    await waitForElement(() => component.getByText('Login'));

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(0);
  });

  test('renders blogs a logged in user', async () => {
    // login
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester',
    };

    localStorage.setItem('loggedInBloglistUser', JSON.stringify(user));

    const component = render(<App />);

    await waitForElement(() => component.getByText('Login'));

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(3);
  });
});
