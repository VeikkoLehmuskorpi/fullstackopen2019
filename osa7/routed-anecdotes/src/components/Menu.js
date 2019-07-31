import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const padding = {
    paddingRight: '0.25rem',
  };

  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

export default Menu;
