import React from 'react';
import {hashHistory} from 'react-router';
import store from '../../store';
import Slider from './HeaderSlider'
//shown on home page

const Features = React.createClass({
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
  signUpHandler: function () {
    hashHistory.push('/login');
  },
  clickHandler: function () {
    hashHistory.push('/users');
    },

  render: function () {
    // console.log(store.session.get('username'));
    let headerBtn;
    if (store.session.get('username')) {
      headerBtn = <button className="users-btn" onClick={this.clickHandler}>Find Users</button>
    } else {
      headerBtn = <button className="users-btn" onClick={this.signUpHandler}>Sign in to start finding users</button>
    }
    return (
      <div className="features-container">
        <Slider/>
        <div className="header">
          <h1>Book Nook</h1>
          <h2>Find your next best read or friend!</h2>
          {headerBtn}
        </div>
        <div className="features-flex">
          <div className="solo-feature">
            <i className="fa fa-user"></i>
            <p className="solo-feature-copy">
            <span>User Profiles</span>
            Keep a digital library of books you've read, pick your favorites, and even rant or rave about them!
            </p>
          </div>
          <div className="solo-feature">
            <i className="fa fa-book"></i>
            <p className="solo-feature-copy">
            <span>Book Searches</span>
            Explore the extensive library of books to find new exciting things to read and add books to your digital library to show other users what you've read.
            </p>
          </div>
          <div className="solo-feature">
            <i className="fa fa-users"></i>
            <p className="solo-feature-copy">
            <span>Building a Community</span>
            Connect with and follow other teens who love the same books you do.  View our extensive user list and user profiles!
            </p>
          </div>
        </div>
      </div>
    )
  }
})

export default Features;
