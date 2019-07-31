import React from 'react';

const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Added blogs</p>
    </div>
  );
};

export default User;
