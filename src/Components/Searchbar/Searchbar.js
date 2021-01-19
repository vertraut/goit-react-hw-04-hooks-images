import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const errToast = msg => toast.error(msg);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const clearStateValue = () => setValue('');

  const handleSubmit = e => {
    e.preventDefault();
    const normalizedValue = value.trim().toLocaleLowerCase();
    if (normalizedValue === '') {
      errToast('Введите запрос');
      return;
    }
    onSubmit(normalizedValue);
    clearStateValue();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
