import React, { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import PersonNumbers from './PersonNumbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleSetFilter = e => {
    setFilter(e.target.value);
    filterPhonebook(e.target.value);
  };

  const filterPhonebook = filter => {
    if (filter !== '') {
      const filteredPeopleArr = persons.filter(
        person =>
          person.name.includes(filter) ||
          person.name
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase().trim())
      );
      setFilteredPersons(filteredPeopleArr);
    } else {
      setFilteredPersons(persons);
    }
  };

  const addPerson = e => {
    e.preventDefault();
    const personObj = { name: newName, number: newPhone };

    const personsNamesArr = persons.map(person =>
      person.name.toLocaleLowerCase()
    );
    if (
      personsNamesArr.includes(newName) ||
      personsNamesArr.includes(newName.toLocaleLowerCase().trim())
    ) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, personObj]);
    resetForm();
  };

  const resetForm = () => {
    setNewName('');
    setNewPhone('');
  };

  const handleSetName = e => setNewName(e.target.value);

  const handleSetPhone = e => setNewPhone(e.target.value);

  const personRows = personsArr =>
    personsArr.map(person => (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    ));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleSetFilter={handleSetFilter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleSetName={handleSetName}
        newPhone={newPhone}
        handleSetPhone={handleSetPhone}
      />
      <h2>Numbers</h2>
      <PersonNumbers
        filter={filter}
        persons={persons}
        filteredPersons={filteredPersons}
        personRows={personRows}
      />
    </div>
  );
};

export default App;
