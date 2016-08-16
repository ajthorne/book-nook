import React from 'react';
// <UserLibrary key={i} title={title} bookImg={bookImg} authors={authors}/>


const UserLibrary = React.createClass({
  render: function () {
    return (
      <li>
      <img src={`${this.props.bookImg}`}/>
      <p>{this.props.title}</p>
      <p>{this.props.authors}</p>
      </li>
    )
  }
})

export default UserLibrary;
