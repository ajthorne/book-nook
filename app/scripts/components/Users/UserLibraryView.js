import React from 'react';
import store from '../../store';
import UserLibrary from './UserLibrary';

const UserLibraryView = React.createClass({
  getInitialState: function () {
  return {
    libraryBooks: store.libraryBooks.toJSON(),
    favorites: store.favorites.toJSON()}
  },

  updateState: function() {
      this.setState({libraryBooks: store.libraryBooks.toJSON(),
      favorites: store.favorites.toJSON()});
  },

  componentDidMount: function () {
    let userId = this.props.params.id;
    store.libraryBooks.fetch({
    data: {query: JSON.stringify({
      userId: userId,
    })}
  })
  store.favorites.fetch({
  data: {query: JSON.stringify({
    userId: userId,
   })}
})
    store.libraryBooks.on('update change', this.updateState)
    store.favorites.on('update change', this.updateState)
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    //moving between various profiles is causing the favs collection to get lost, so need to update component to retrieve the correct favs
    let user = nextProps.params.id;
    // console.log('nextProps', user);
    if (this.props.params.id !== nextProps.params.id) {
          console.log('grabbing favs..', store.favorites);
          store.favorites.fetch({
          data: {query: JSON.stringify({
            userId: user,
           })}
        })
    }
    return true;
},

  componentWillUnmount: function () {
    store.libraryBooks.off('update change', this.updateState)
    store.favorites.off('update change', this.updateState)
  },
  render: function () {
    let id = this.props.params.id;
    // console.log(this.state);
    // console.log(this.state.favorites);
    let library = store.libraryBooks.map((book, i, arr) => {
      // console.log(this.state);
      let id = book.get('_id')
      let userId = book.get('userId');
      let bookId = book.get('bookId');
      let title = book.get('bookTitle');
      let bookImg = book.get('bookImg');
      let authors = book.get('bookAuthors');

      let favorited = this.state.favorites.filter((fav, i, arr) => {
          return fav.bookId === bookId;
        })

      return <UserLibrary key={i} favorited={favorited} title={title} bookImg={bookImg} authors={authors} userId={userId} id={id} bookId={bookId}/>
    });

    return (
      <div className="profile-content">
        <h2 className="profile-title">My Library</h2>
        <ul className="library-book-ul">
          {library}
        </ul>
      </div>
    )
  }
})

export default UserLibraryView;
