import React from 'react';
import store from '../../store';
import UserLibrary from './UserLibrary';

const UserProfile = React.createClass({
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
    let id = this.props.params.id;
    let userProfile = store.users.get(id);
    console.log(userProfile);
    let name = userProfile.attributes.name;
    let userImg = userProfile.attributes.imgUrl;
    let libraryCollection = this.state.libraryBooks;

    let library = libraryCollection.map(function(book, i, arr) {
      let title = book.bookTitle;
      let bookImg = book.bookImg;
      let authors = book.bookAuthors;

      return <UserLibrary key={i} title={title} bookImg={bookImg} authors={authors}/>
    })


    return (
      <div className="user-profile-container">
      <h2>{name}'s Profile</h2>
      <img className="user-profile-img" src={`${userImg}`}/>
      <ul>
        {library}
      </ul>
      </div>
    )
  }
})

export default UserProfile;
