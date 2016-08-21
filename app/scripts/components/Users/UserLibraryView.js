import React from 'react';
import store from '../../store';
import UserLibrary from './UserLibrary';
//my profile link bug --not moving to my profile if im on another users profile page

const UserLibraryView = React.createClass({
  getInitialState: function () {
  return {
    libraryBooks: store.libraryBooks.toJSON()}
  },

  updateState: function() {
      this.setState({libraryBooks: store.libraryBooks.toJSON()});
  },

  componentDidMount: function () {
    let userId = this.props.params.id;
    store.libraryBooks.fetch({
    data: {query: JSON.stringify({
      userId: userId,
    })}
  })
    store.libraryBooks.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.libraryBooks.off('update change', this.updateState)
  },
  render: function () {
    let library = store.libraryBooks.map(function(book, i, arr) {
      let id = book.get('_id')
      let userId = book.get('userId');
      let bookId = book.get('bookId');
      let title = book.get('bookTitle');
      let bookImg = book.get('bookImg');
      let authors = book.get('bookAuthors');
      return <UserLibrary key={i} title={title} bookImg={bookImg} authors={authors} userId={userId} id={id} bookId={bookId}/>
    });

    return (
      <div>
        <h2>My Library</h2>
        <ul className="library-book-ul">
          {library}
        </ul>
      </div>
    )
  }
})

export default UserLibraryView;
