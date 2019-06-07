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
  // const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(0);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleSetFilter = e => {
    setFilter(e.target.value);
    filterPhonebook(e.target.value);
  };

  const filterPhonebook = filter => {
    if (filter !== '') {
      const lowercasePeopleArr = persons.map(person =>
        String(person.name).toLowerCase()
      );
      console.log(lowercasePeopleArr);
      const filteredPeopleArr = lowercasePeopleArr.filter(person =>
        person.includes(filter.toLowerCase())
      );
      setFilteredPersons(filteredPeopleArr);
    } else {
      setFilteredPersons([]);
    }
  };

  const addPerson = e => {
    e.preventDefault();
    const personObj = { name: newName, number: newPhone };

    const personsNamesArr = persons.map(person => person.name);
    if (personsNamesArr.indexOf(newName) === 1) {
      alert(`${newName} is already added to the phonebook`);
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
