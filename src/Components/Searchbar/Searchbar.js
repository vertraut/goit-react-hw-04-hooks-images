import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  errToast = msg => toast.error(msg);

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  clearStateValue = () => this.setState({ value: '' });

  handleSubmit = e => {
    e.preventDefault();
    const value = this.state.value.trim();
    if (value === '') {
      this.errToast('Введите запрос');
      return;
    }
    this.props.onSubmit(value);
    this.clearStateValue();
  };

  render() {
    const { value } = this.state;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
