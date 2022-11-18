import PropTypes from 'prop-types';
import css from './Filter.module.css';

function Filter({ filter, value }) {
  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        name="filter"
        value={value}
        onChange={filter}
      ></input>
    </label>
  );
}
export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
};
