import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../Loading';

class Header extends Component {
  state = {
    user: '',
    loading: false,
  }

  componentDidMount() {
    this.fetchUser();
  }

   fetchUser = async () => {
     this.setState({ loading: true });
     const users = await getUser();
     this.setState({ user: users.name, loading: false });
   }

   render() {
     const { user, loading } = this.state;
     return (
       <div data-testid="header-component">
         <h1>{ user }</h1>
         <Link to="/search" data-testid="link-to-search">Search</Link>
         <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
         <Link to="/profile" data-testid="link-to-profile">Profile</Link>
         { loading ? <Loading /> : <p data-testid="header-user-name">{ user }</p>}
       </div>
     );
   }
}

export default Header;
