import React from 'react';
import store from '../../store';
// <UserSinglePost key={i} title={title} userId={userId} id={id} body={body}/>


const UserSinglePost = React.createClass({
  render: function () {
    return (
      <li className="single-post-holder">
      <p className="single-post-title">{this.props.title}</p>
      <p className="single-post-timestamp">{this.props.timestamp}</p>
      <p className="single-post-body">{this.props.body}</p>
      </li>
    )
  }
})

export default UserSinglePost;
