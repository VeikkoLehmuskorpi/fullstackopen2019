import React from 'react';

const PersonForm = ({
  addPerson,
  newName,
  handleSetName,
  newPhone,
  handleSetPhone
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor="name-input">
          name{' '}
          <input id="name-input" value={newName} onChange={handleSetName} />
        </label>
      </div>
      <div>
        <label htmlFor="phone-input">
          number{' '}
          <input id="phone-input" value={newPhone} onChange={handleSetPhone} />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
