import React from 'react';
import store from '../../store';
import UserLibrary from './UserLibrary';
import UserAside from './UserAside';

const UserProfile = React.createClass({
  getInitialState: function () {
  return {
    libraryBooks: store.libraryBooks.toJSON(),
    users: store.users.toJSON()}
  },

  updateState: function() {
      this.setState({libraryBooks: store.libraryBooks.toJSON(),
      users: store.users.toJSON()});
  },

  componentDidMount: function () {
    let userId = this.props.params.id;
    store.users.fetch({
      data: {query: JSON.stringify({
        _id: userId
      })}
    });
    store.libraryBooks.fetch({
    data: {query: JSON.stringify({
      userId: userId,
    })}
  })
    store.libraryBooks.on('update change', this.updateState)
    store.users.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.libraryBooks.off('update change', this.updateState)
    store.users.off('update change', this.updateState)
  },
  render: function () {
    let userProfile = store.users.map(function(user, i, arr) {
      let name = user.get('name');
      let userImg = user.get('imgUrl');
      return <UserAside key={i} name={name} userImg={userImg}/>
    });

    let library = store.libraryBooks.map(function(book, i, arr) {
      let title = book.get('bookTitle');
      let bookImg = book.get('bookImg');
      let authors = book.get('bookAuthors');
      return <UserLibrary key={i} title={title} bookImg={bookImg} authors={authors}/>
    });

    return (
      <div className="user-profile-container">
        {userProfile}
      <ul>
        {library}
      </ul>
      </div>
    )
  }
})

export default UserProfile;
