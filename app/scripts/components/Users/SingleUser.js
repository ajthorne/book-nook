import React from 'react';

const SingleUser = React.createClass({
  render: function () {
    return (
      <li>
        <img src={`${this.props.userImg}`}/>
        <span>{this.props.name}</span>
      </li>
    )
  }
})

export default SingleUser;
