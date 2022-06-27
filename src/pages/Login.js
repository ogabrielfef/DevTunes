import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

const minimunCaracters = 3;

class Login extends Component {
  state = {
    name: '',
    loading: false,
    fetchState: false,
  }

  fetchApi = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, fetchState: true });
    console.log(name);
    console.log(createUser);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value });
  }

  render() {
    const { name, loading, fetchState } = this.state;
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
          onClick={ this.fetchApi }
          disabled={ name.length < minimunCaracters }
        >
          Entrar
        </button>
        {loading && <Loading />}
        {fetchState && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
