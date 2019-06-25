import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import PersonNumbers from './PersonNumbers';
import contactService from '../services/contactService';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    contactService
      .getAllContacts()
      .then(initialContacts => setPersons(initialContacts))
      .catch(error => alert(error));
  }, []);

  const [filteredPersons, setFilteredPersons] = useState(0);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationMessageType, setNotificationMessageType] = useState(null);

  const displayNotification = (msg, msgType) => {
    setNotificationMessage(msg);
    setNotificationMessageType(msgType);

    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationMessageType(null);
    }, 5000);
  };

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
    const personObj = {
      name: newName,
      number: newPhone
    };

    const personsNamesArr = persons.map(person =>
      person.name.toLocaleLowerCase()
    );
    if (
      personsNamesArr.includes(newName) ||
      personsNamesArr.includes(newName.toLocaleLowerCase().trim())
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(
          personsNamesArr.indexOf(newName.toLocaleLowerCase().trim()),
          personObj
        );
        return;
      } else {
        resetForm();
        return;
      }
    }

    contactService
      .addContact(personObj)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        resetForm();
        displayNotification(`Added ${personObj.name}`);
      })
      .catch(error => alert(error));
  };

  const updatePerson = (personId, newPersonObj) => {
    personId = personId + 1;
    contactService
      .updateContact(personId, newPersonObj)
      .then(returnedPerson => {
        setPersons(
          persons.map(person =>
            person.id !== personId ? person : returnedPerson
          )
        );
        displayNotification(`Updated ${newPersonObj.name}`);
      })
      .catch(error => {
        displayNotification(
          `Information of ${
            newPersonObj.name
          } has already been removed from server`,
          'error'
        );
      });
  };

  // Kun välistä poistetaan henkilö, JSON Server ei korjaa henkilöiden ID:tä,
  // tämä rikkoo sovelluksen
  const deletePerson = passedPerson => {
    if (window.confirm(`Delete ${passedPerson.name}?`)) {
      contactService
        .deleteContact(passedPerson.id)
        .then(
          setPersons([
            ...persons.filter(person => person.id !== passedPerson.id)
          ])
        )
        .then(displayNotification(`Deleted ${passedPerson.name}`, 'error'))
        .catch(error => alert(error));
    }
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
        {person.name} {person.number}{' '}
        <button onClick={() => deletePerson(person)}>delete</button>
      </li>
    ));

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        messageType={notificationMessageType}
        message={notificationMessage}
      />

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
