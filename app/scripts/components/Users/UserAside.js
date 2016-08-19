import React from 'react';
import store from '../../store';

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
      </aside>
    )
  }
})

export default UserAside;

// <button onClick={this.followHandler}><i className="fa fa-user-plus"></i> Follow</button>
