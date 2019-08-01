import React from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuSUI } from 'semantic-ui-react';
import LoginForm from './LoginForm';

const Menu = () => {
  return (
    <div style={{ background: '#f4f4f4' }}>
      <MenuSUI>
        <MenuSUI.Item>
          <Link to='/'>Blogs</Link>
        </MenuSUI.Item>
        <MenuSUI.Item>
          <Link to='/users'>Users</Link>
        </MenuSUI.Item>
        <MenuSUI.Item>
          <LoginForm />
        </MenuSUI.Item>
      </MenuSUI>
    </div>
  );
};

export default Menu;
