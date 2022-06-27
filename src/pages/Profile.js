import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    user: {},
    loading: false,
  }

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = async () => {
    this.setState({ loading: true });
    const fetchUser = await getUser();
    this.setState({ user: fetchUser, loading: false });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        {loading && <Loading />}
        {user && (
          <div>
            <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            <p>{user.name}</p>
            <p>{user.description}</p>
            <p>{user.email}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
