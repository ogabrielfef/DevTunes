import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

const minimunCaracters = 3;

class Login extends Component {
  state = {
    name: '',
    loading: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value });
  }

  saved = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    const { history: { push } } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    push('/search');
  }

  render() {
    const { name, loading } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
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
              onClick={ this.saved }
              disabled={ name.length < minimunCaracters }
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
