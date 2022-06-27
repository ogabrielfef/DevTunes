import React, { Component } from 'react';
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
         { loading ? <Loading /> : <p data-testid="header-user-name">{ user }</p>}
       </div>
     );
   }
}

export default Header;
