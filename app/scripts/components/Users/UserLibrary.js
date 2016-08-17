import React from 'react';
// <UserLibrary key={i} title={title} bookImg={bookImg} authors={authors}/>


const UserLibrary = React.createClass({
  render: function () {
    return (
      <li className="library-book-holder">
      <img className="library-book-img" src={`${this.props.bookImg}`}/>
      <p className="library-book-title">{this.props.title}</p>
      <p className="library-book-author">{this.props.authors}</p>
      </li>
    )
  }
})

export default UserLibrary;
