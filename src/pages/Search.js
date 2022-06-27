import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    busca: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value });
  }

  render() {
    const { busca } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <label htmlFor="busca">
          <input
            type="text"
            id="busca"
            name="busca"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ busca.length < 2 }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
