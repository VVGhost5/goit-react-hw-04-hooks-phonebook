import React from "react";
import styles from "./Contacts.module.css";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Contacts = ({ contacts, onDelete, children }) => {
  return (
    <div>
      <ul className={styles.list}>
        {contacts.map((el) => (
          <li className={styles.item} key={uuidv4()}>
            {`${el.contactName}: ${el.number}`}
            <button
              className={styles.button}
              onClick={() => {
                onDelete(el.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default Contacts;

Contacts.propTypes = {
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      contactName: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
