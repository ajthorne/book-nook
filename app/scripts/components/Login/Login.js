import React from 'react';
import store from '../../store';
import { hashHistory } from 'react-router';

const Login = React.createClass({
  loginHandler: function (e) {
    e.preventDefault();
    console.log('You logged in!');
    let data = {
      username: this.refs.loginuser.value,
      password: this.refs.loginpw.value
    }
    // console.log(data);
    store.session.login(data)
  },

  signUpHandler: function (e) {
    e.preventDefault();
    console.log('You signed up!');
    let data = {
      name: this.refs.name.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
    }
    // console.log(data);
    store.session.signup(data)
      },
  render: function () {
    return (
      <div className="login-holder">
        <form onSubmit={this.loginHandler}>
          <h2>Login</h2>
          <input type="text" placeholder="Enter your username" ref="loginuser"/>
          <input type="password" placeholder="Enter your password" ref="loginpw"/>
          <input type="submit" value="Submit"/>
        </form>
        <form onSubmit={this.signUpHandler}>
          <h2>Sign Up</h2>
          <input type="text" placeholder="Enter a name" ref="name"/>
          <input type="text" placeholder="Enter a username" ref="username"/>
          <input type="password" placeholder="Enter a password" ref="password"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
});

export default Login;
