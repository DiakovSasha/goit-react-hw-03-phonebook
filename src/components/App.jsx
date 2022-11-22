import React, { Component } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';

import ContactsForm from './ConactsForm/ContactsForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import css from './App.module.css';
// import ContactsForm from './ConactsForm/ContactsForm';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: 'dd' },
    ],
    filter: '',
  };

  addContact = data => {
    if (
      this.state.contacts.find(
        ({ name }) => data.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return Report.failure(`${data.name} is already in contacts`);
    }
    this.setState(prevState => ({ contacts: [...prevState.contacts, data] }));
  };

  onFilter = event => {
    this.setState({ filter: event.currentTarget.value });
    // this.state.contacts.name.filter(contact);
  };
  addFilterContacts() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
  }
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  componentDidMount() {
    const lSContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(lSContacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    const { filter } = this.state;

    const filteredContacts = this.addFilterContacts();
    return (
      <div className={css.wrapper}>
        <h1 className={css.mainTitle}>Phonebook</h1>
        <ContactsForm addContact={this.addContact} />
        <h2 className={css.secondTitle}>Contacts</h2>
        <Filter value={filter} filter={this.onFilter} />
        <ContactsList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
