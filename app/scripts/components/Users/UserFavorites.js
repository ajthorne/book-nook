import React from 'react';
import store from '../../store';
import UserSingleFavorites from './UserSingleFavorites';

const UserFavorites = React.createClass({
  getInitialState: function () {
  return {
    favorites: store.favorites.toJSON()}
  },

  updateState: function() {
      this.setState({favorites: store.favorites.toJSON()});
  },

  componentDidMount: function () {
    let userId = this.props.params.id;
    store.favorites.fetch({
    data: {query: JSON.stringify({
      userId: userId,
    })}
  })
    store.favorites.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.favorites.off('update change', this.updateState)
  },
  render: function () {
    let favorites = store.favorites.map(function(book, i, arr) {
      let id = book.get('_id')
      let userId = book.get('userId');
      let bookId = book.get('bookId');
      let title = book.get('bookTitle');
      let bookImg = book.get('bookImg');
      let authors = book.get('bookAuthors');
      return <UserSingleFavorites key={i} title={title} bookImg={bookImg} authors={authors} userId={userId} id={id} bookId={bookId}/>
    });

    return (
      <div className="profile-content">
        <h2>My Favorites</h2>
        <ul className="favorites-holder">
          {favorites}
        </ul>
      </div>
    )
  }
})

export default UserFavorites;
