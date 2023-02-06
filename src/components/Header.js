import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';
import icon from '../assets/person-circle-outline.svg';

class Header extends Component {
  state = {
    user: '',
  }

  componentDidMount() {
    this.fetchUser();
  }

   fetchUser = async () => {
     const users = await getUser();
     this.setState({ user: users.name });
   }

   render() {
     const { user } = this.state;
     return (
       <div data-testid="header-component" className="header-component">
         <div className="header-home">
           <h1>DevTunes</h1>
           <div className="usuario">
             <div className="box-usuario">
               <img alt="icon" src={ icon } />
               <p data-testid="header-user-name">{ user }</p>
             </div>
           </div>
         </div>
         <nav className="nav-header">
           <Link to="/search" data-testid="link-to-search">Search</Link>
           <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
           <Link to="/profile" data-testid="link-to-profile">Profile</Link>
         </nav>
       </div>
     );
   }
}

export default Header;
