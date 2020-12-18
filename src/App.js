import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Form from "./components/Form/Form";
import Contacts from "./components/Contacts/Contacts";
import Filter from "./components/Filter/Filter";
import Notification from "./components/Notification/Notification";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  function checkContact(name, number) {
    const checkedContacts = contacts.some((el) => el.contactName === name);
    if (checkedContacts) {
      return alert("This contact is already in your contacts");
    }
    addContact(name, number);
  }

  function addContact(name, number) {
    const newContactData = {
      id: uuidv4(),
      contactName: name,
      number: number,
    };
    setContacts((prevState) => [newContactData, ...prevState]);
    console.log(contacts);
  }

  function deleteContact(id) {
    setContacts((state) => state.filter((el) => el.id !== id));
  }

  function filterContacts(e) {
    setFilter(e.target.value);
  }

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((el) =>
      el.contactName.toLowerCase().includes(normalizedFilter)
    );
  }

  return (
    <div className="container">
      <Form contacts={contacts} onSubmit={checkContact}></Form>
      {contacts.length ? (
        <Contacts contacts={getVisibleContacts()} onDelete={deleteContact}>
          <Filter value={filter} onChange={filterContacts}></Filter>
        </Contacts>
      ) : (
        <Notification></Notification>
      )}
    </div>
  );
}
