import { useState, useEffect } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import shortid from 'shortid';
import Form from './Form/Form';
import Contacts from './Contacts';
import Filter from './Filter';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const formSubmit = ({ name, number }) => {
    setContacts(contacts => {
      if (contacts.find(contact => contact.name === name)) {
        alert(`${name} is already in contacts!`);
        name = '';
        number = '';
        return contacts;
      } else {
        return [...contacts, { id: shortid.generate(), name, number }];
      }
    });
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const findContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onClick = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <Contacts contacts={findContacts()} onClick={onClick} />
    </>
  );
}
