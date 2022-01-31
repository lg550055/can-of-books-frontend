import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton'
import LoginButton from './LoginButton'
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';


class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        {/* TODO: if the user is logged in, render a navigation link to profile page */}
        {this.props.auth0.isAuthenticated && <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>}
        {/* TODO: if the user is logged in, render the `LogoutButton` */}
        {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton /> }
      </Navbar>
    )
  }
}

export default withAuth0(Header);
