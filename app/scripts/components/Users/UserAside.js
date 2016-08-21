import React from 'react';
import store from '../../store';
import {Link } from 'react-router';

const UserAside = React.createClass({
  followHandler: function () {
    // console.log(this.props);
    store.session.followUser(this.props, store.session.get('username'));
  },
  render: function () {
    return (
      <aside>
        <h2>{this.props.name}'s Profile</h2>
        <img className="user-profile-img" src={`${this.props.userImg}`}/>
        <button onClick={this.followHandler}><i className="fa fa-user-plus"></i> Follow</button>
        <Link to="/user/:id/favorites">My Library</Link>
        <Link to="/user/:id/favorites">My Favorites</Link>
        <Link to="/user/:id/favorites">My Posts</Link>
        <Link to="/user/:id/favorites">My Followers</Link>
      </aside>
    )
  }
})

export default UserAside;
