import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

const minimunCaracters = 3;

class Login extends Component {
  state = {
    name: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value });
  }

  render() {
    const { name } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            value={ name }
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ name.length <= minimunCaracters }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </div>
    );
  }
}

export default Login;
