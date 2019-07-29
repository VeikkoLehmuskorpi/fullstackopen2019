import React from 'react';
import { filterSet, filterRemove } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = ({ filterRemove, filterSet }) => {
  const handleChange = event => {
    const content = event.target.value;

    if (content === '') {
      filterRemove();
      return;
    }

    filterSet(content);
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

const mapDispatchToProps = {
  filterRemove,
  filterSet,
};

const ConnectedFilter = connect(
  null,
  mapDispatchToProps,
)(Filter);

export default ConnectedFilter;
