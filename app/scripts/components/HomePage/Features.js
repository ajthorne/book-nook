import React from 'react';
import {hashHistory} from 'react-router';
import store from '../../store';
//shown on home page

const Features = React.createClass({
  clickHandler: function () {
    hashHistory.push('/users');
    },

  render: function () {
    return (
      <div className="features-container">
        <div className="header">
          <h1>Book Nook</h1>
          <h2>Find your next best read or friend!</h2>
          <input className="users-btn" type="button" value="Find Users" onClick={this.clickHandler}/>
        </div>
        <div className="features-flex">
          <div className="solo-feature">
            <i className="fa fa-user"></i>
            <p className="solo-feature-copy">
            <span>User Profiles</span>
            Keep a digital library of books you've read.
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
            Connect with other teens who love the same books you do.  View our extensive user list and user profiles!
            </p>
          </div>
        </div>
      </div>
    )
  }
})

export default Features;
