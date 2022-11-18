import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactsList.module.css';

function ContactsList({ contacts, onDelete }) {
  return (
    <ul className={css.list}>
      {contacts.map(({ name, number, id }) => (
        <li className={css.item} key={nanoid()}>
          <p className={css.text}>
            {name}: {number}
          </p>
          <button
            className={css.btn}
            type="button"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
export default ContactsList;

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
