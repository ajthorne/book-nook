import React from 'react';
import Search from './Search';
import { Link } from 'react-router';
//shown consistently throughout app

const Nav = React.createClass({
  render: function () {
    return (
    <nav>
      <Link to="/" className="home-link">Book Nook</Link>
      <Search />
      <Link to="/login" className="login-link">Sign Up</Link>
      <Link to="/login" className="login-link">Sign In</Link>
    </nav>
    )
  }
})

export default Nav;
