import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const Menu = () => {
  return (
    <div
      style={{ background: '#f4f4f4', padding: '.5rem', marginBottom: '1rem' }}
    >
      <Link style={{ marginRight: '1rem' }} to='/'>
        Blogs
      </Link>
      <Link style={{ marginRight: '1rem' }} to='/users'>
        Users
      </Link>
      <LoginForm style={{ marginRight: '1rem' }} />
    </div>
  );
};

export default Menu;
