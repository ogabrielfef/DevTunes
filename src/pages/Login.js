import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';
import './Login.css';
import capa from '../assets/girl-earphone.png';

const minimunCaracters = 3;

class Login extends Component {
  state = {
    name: '',
    loading: false,
  }

  onkey(e) {
    console.log(e.key);
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

  onKey = (event) => {
    if (event.key === 'Enter') {
      this.saved(event);
    }
  }

  render() {
    const { name, loading } = this.state;
    return (
      <div className="login-container">
        <div className="header">
          <p>DevTunes</p>
        </div>
        <div className="content-login">
          {loading ? <Loading /> : (
            <div data-testid="page-login" className="login">
              <h1>Login</h1>
              <div className="inputs-login">
                <label htmlFor="name">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={ name }
                    data-testid="login-name-input"
                    onChange={ this.handleChange }
                    onKeyPress={ this.onKey }
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
            </div>
          )}
          <div className="capa-login">
            <img className="capa-login" alt="girl-earphones" src={ capa } />
          </div>
        </div>
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
