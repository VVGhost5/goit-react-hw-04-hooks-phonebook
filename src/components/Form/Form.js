import React, { useState } from "react";
import styles from "./Form.module.css";
import PropTypes from "prop-types";

export default function Form({ onSubmit, addContact }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  function handleChange({ target }) {
    const { name, value } = target;
    switch (name) {
      case "name": {
        setName(value);
        break;
      }

      case "number": {
        setNumber(value);
        break;
      }
      default: {
        break;
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(name, number);
    reset();
  }

  function reset() {
    setName("");
    setNumber("");
  }

  return (
    <div>
      <h2 className={styles.title}>Phonebook</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Enter the name"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Number
          <input
            className={styles.input}
            type="text"
            name="number"
            placeholder="Enter the phone number"
            value={number}
            onChange={handleChange}
          />
        </label>
        <button className={styles.button} onSubmit={addContact}>
          Add contact
        </button>
      </form>
    </div>
  );
}

Form.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      contactName: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};
