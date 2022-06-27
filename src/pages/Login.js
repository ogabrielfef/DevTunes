import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

const minimunCaracters = 3;

class Login extends Component {
  state = {
    name: '',
    user: { name: '' },
    loading: false,
    fetchState: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value });
  }

  fetchApi = async () => {
    const { user } = this.state;
    this.setState({ loading: true });
    await createUser(user);
    this.setState({ fetchState: true });
  };

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
          disabled={ name.length < minimunCaracters }
          onClick={ this.fetchApi }
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
