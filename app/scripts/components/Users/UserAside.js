import React from 'react';
import store from '../../store';
import {Link } from 'react-router';

const UserAside = React.createClass({
  getFollowers: function () {
    store.session.getFollowers(this.props, store.session.get('username'))
  },
  followHandler: function () {
    store.session.toggleFollow(this.props, store.session.get('username'))
  },
  render: function () {
    // console.log(this.props);
    // console.log('logged in user:', store.session.get('username'));
    let id = this.props.id;
    let user = store.users.get(id);
    let followBtn;
    if (store.session.get('_id') === id) {
      followBtn = ''
    } else if (user.get('followers').indexOf(store.session.get('username')) === -1) {
      followBtn = <button onClick={this.followHandler}><i className="fa fa-user-plus"></i> Follow</button>
    } else {
      followBtn = <button onClick={this.followHandler}> Following</button>
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
