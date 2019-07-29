import React from 'react';
import { filterSet, filterRemove } from '../reducers/filterReducer';

const Filter = ({ store }) => {
  const handleChange = event => {
    const content = event.target.value;

    if (content === '') {
      store.dispatch(filterRemove());
      return;
    }

    store.dispatch(filterSet(content));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
