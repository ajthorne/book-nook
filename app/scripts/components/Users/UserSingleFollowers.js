import React from 'react';
import {Link} from 'react-router';
import store from '../../store';
// <UserSingleFollowers key={i} followerId={followerId} followerName={followerName}/>


const UserSingleFollowers = React.createClass({
  render: function () {
    return (
      <li className="single-follower">
        <div className="user-icon">
          <i className="fa fa-user"></i>
        </div>
        <div className="user-name">
          <Link to={`/users/${this.props.followerId}`}>{this.props.followerName}</Link>
        </div>
      </li>
    )
  }
})

export default UserSingleFollowers;
