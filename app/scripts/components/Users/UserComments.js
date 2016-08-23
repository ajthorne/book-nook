import React from 'react';
import {Link} from 'react-router'
// <UserComments key={i} name={name} commentBody={commentBody} timestamp={timestamp}/>

const UserComments = React.createClass({
  render: function () {
    return (
      <li className="single-comment-holder">
        <p><Link to={`/users/${this.props.id}`}>{this.props.name}</Link></p>
        <p>{this.props.timestamp}</p>
        <p>{this.props.commentBody}</p>
      </li>
    )
  }
})

export default UserComments;
