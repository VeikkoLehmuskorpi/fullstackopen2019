import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu as MenuSUI } from 'semantic-ui-react';

const Menu = ({ user }) => {
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
          <Link to='/login'>{user ? 'User' : 'Login'}</Link>
        </MenuSUI.Item>
      </MenuSUI>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(Menu);
