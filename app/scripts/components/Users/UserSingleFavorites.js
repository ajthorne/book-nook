import React from 'react';
import store from '../../store';

const UserSingleFavorites = React.createClass({
  render: function () {
    return (
      <li className="favorite-book-holder">
      <img className="favorite-book-img" src={`${this.props.bookImg}`}/>
      <p className="favorite-book-title">{this.props.title}</p>
      <p className="favorite-book-author">{this.props.authors}</p>
      </li>
    )
  }
})

export default UserSingleFavorites;
