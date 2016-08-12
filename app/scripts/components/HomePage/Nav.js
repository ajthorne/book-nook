import React from 'react';
import Search from './Search';
import { Link } from 'react-router';
import store from '../../store';
//shown consistently throughout app

const Nav = React.createClass({
  getInitialState: function () {
  return {session: store.session.toJSON()}
  },

  updateState: function() {
  this.setState({session: store.session.toJSON()});
  },

  componentDidMount: function() {
  store.session.on('update change', this.updateState);
  },

  componentWillUnmount: function () {
  store.session.off('update change', this.updateState);
  },

  logOutHandler: function () {
    store.session.logout();
  },

  render: function () {
    let navView;

    if (store.session.get('username')) {
      navView = (
        <nav>
          <Link to="/" className="home-link">Book Nook</Link>
          <Search />
          <Link to="/" className="login-link" onClick={this.logOutHandler}>Log Out</Link>
          <Link to="/users" className="login-link">Users</Link>
        </nav>
      )
    } else {
      navView = (
        <nav>
          <Link to="/" className="home-link">Book Nook</Link>
          <Search />
          <Link to="/login" className="login-link">Sign Up</Link>
          <Link to="/login" className="login-link">Sign In</Link>
        </nav>
      )
    }
    return (
      <div>
        {navView}
      </div>
    )
  }
})

export default Nav;
