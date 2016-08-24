import React from 'react';
import {Link} from 'react-router';
// <UserSingleFollowers key={i} followerId={followerId} followerName={followerName}/>


const UserSingleFollowers = React.createClass({
  render: function () {
    return (
      <li className="single-follower">
        <i className="fa fa-user"></i>
        <Link to={`/users/${this.props.followerId}`}>{this.props.followerName}</Link>
      </li>
    )
  }
})

export default UserSingleFollowers;
