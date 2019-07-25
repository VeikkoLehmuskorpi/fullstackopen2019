import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable showLabel='show...' hideLabel='hide...'>
        <div className='testDiv' />
      </Togglable>
    );
  });

  test('renders its children', () => {
    component.container.querySelector('.testDiv');
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent');

    expect(div).toBe(null);
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toBeDefined();
  });

  test('toggled content can be closed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const closeButton = component.getByText('hide...');
    fireEvent.click(closeButton);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toBe(null);
  });
});
