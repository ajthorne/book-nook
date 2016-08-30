import React from 'react';
import Search from './Search';
import { Link } from 'react-router';
import store from '../../store';
//shown consistently throughout app

const Nav = React.createClass({
  logOutHandler: function () {
    store.session.logout();
  },

  render: function () {
    let navView;

    if (store.session.get('username')) {
      let id = store.session.get('_id');
      navView = (
        <nav>
          <Link to="/" className="home-link"><i className="fa fa-book"></i><span>Book Nook</span></Link>
          <Search />
          <Link to="/" className="login-link" onClick={this.logOutHandler}><i className="fa fa-sign-out"></i><span>Log Out</span></Link>
          <Link to="/users" className="login-link"><i className="fa fa-users"></i><span>Users</span></Link>
          <Link to={`/users/${id}`} className="login-link"><i className="fa fa-user"></i><span>My Profile</span></Link>
        </nav>
      )
    } else {
      navView = (
        <nav>
          <Link to="/" className="home-link"><i className="fa fa-book"></i><span>Book Nook</span></Link>
          <Search />
          <Link to="/login" className="login-link"><i className="fa fa-sign-in"></i><span>Sign Up</span></Link>
          <Link to="/login" className="login-link"><span>Sign In</span></Link>
        </nav>
      )
    }
    return (
      <div className="nav-holder">
        {navView}
      </div>
    )
  }
})

export default Nav;
