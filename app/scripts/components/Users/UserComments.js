import React from 'react';
import {Link} from 'react-router'
// <UserComments key={i} name={name} commentBody={commentBody} timestamp={timestamp}/>

const UserComments = React.createClass({
  render: function () {
    return (
      <li className="single-comment-holder">
        <p className="commenter-name"><Link to={`/users/${this.props.id}`}>{this.props.name}</Link></p>
        <p className="commenter-time">{this.props.timestamp}</p>
        <p className="commenter-body">{this.props.commentBody}</p>
      </li>
    )
  }
})

export default UserComments;
