import React from 'react';

const PersonNumbers = ({ filter, filteredPersons, persons, personRows }) => {
  return (
    <ul>
      {filter.length > 0 ? personRows(filteredPersons) : personRows(persons)}
    </ul>
  );
};

export default PersonNumbers;
