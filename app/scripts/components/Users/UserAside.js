import React from 'react';
import store from '../../store';
import {Link } from 'react-router';

const UserAside = React.createClass({
  followHandler: function () {
    // console.log(this.props);
    store.session.followUser(this.props, store.session.get('username'));
  },
  render: function () {
    // console.log(this.props);
    let followBtn;
    if (store.session.get('_id') === this.props.id) {
      followBtn = ''
    } else {
      followBtn = <button onClick={this.followHandler}><i className="fa fa-user-plus"></i> Follow</button>
    }

    return (
      <aside>
        <h2>{this.props.name}'s Profile</h2>
        <img className="user-profile-img" src={`${this.props.userImg}`}/>
        {followBtn}
        <ul>
          <li><Link to={`/users/${this.props.id}`}>My Library</Link></li>
          <li><Link to={`/users/${this.props.id}/favorites`}>My Favorites</Link></li>
          <li><Link to={`/users/${this.props.id}/posts`}>My Posts</Link></li>
          <li><Link to={`/users/${this.props.id}/followers`}>My Followers</Link></li>
        </ul>
      </aside>
    )
  }
})

export default UserAside;
