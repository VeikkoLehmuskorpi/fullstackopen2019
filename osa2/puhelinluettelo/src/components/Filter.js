import React from 'react';

const Filter = ({ filter, handleSetFilter }) => {
  return (
    <div>
      <label htmlFor="filter-input">
        filter shown with{' '}
        <input id="filter-input" value={filter} onChange={handleSetFilter} />
      </label>
    </div>
  );
};

export default Filter;
