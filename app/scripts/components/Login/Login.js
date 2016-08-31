import React from 'react';
import store from '../../store';
import { hashHistory } from 'react-router';

const Login = React.createClass({
  loginHandler: function (e) {
    e.preventDefault();
    // console.log('You logged in!');
    let data = {
      username: this.refs.loginuser.value,
      password: this.refs.loginpw.value
    }
    // console.log(data);
    store.session.login(data)
  },

  signUpHandler: function (e) {
    e.preventDefault();
    // console.log('You signed up!');
    let data = {
      name: this.refs.name.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
      followers: [],
      imgUrl: 'http://www.bradleysbookoutlet.com/wp-content/uploads/2013/06/bradleys-book-outlet-books-only-logo.png'
    }
    // console.log(data);
    store.session.signup(data)
      },
  render: function () {
    return (
      <div className="login-holder">
        <form onSubmit={this.loginHandler}>
          <h2>Login</h2>
          <input type="text" className="login-name" placeholder="Enter your username" ref="loginuser" required/>
          <input type="password" className="login-password" placeholder="Enter your password" ref="loginpw" required/>
          <button className="login-btn">Submit</button>
        </form>
        <form onSubmit={this.signUpHandler}>
          <h2>Sign Up</h2>
          <input type="text" className="login-user-name" placeholder="Enter a name" ref="name" required/>
          <input type="text" className="login-name" placeholder="Enter a username" ref="username" required/>
          <input type="password" className="login-password" placeholder="Enter a password" ref="password" required/>
          <button className="login-btn">Submit</button>
        </form>
      </div>
    )
  }
});

export default Login;
