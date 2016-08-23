import React from 'react';
import store from '../../store';
import $ from 'jquery';
// <UserLibrary key={i} title={title} bookImg={bookImg} authors={authors}/>

const UserLibrary = React.createClass({
  deleteBook: function () {
    store.libraryBooks.deleteBook(this.props)
  },

  favHandler: function (e) {
    store.favorites.addFav(this.props, store.session.get('_id'));
  },

  render: function () {
    // console.log(this.props.favorited);
    let optionBtns;
    if ((store.session.get('_id') === this.props.userId) && (this.props.favorited.length)) {
      optionBtns = (
            <div>
              <i onClick={this.favHandler} className="fa fa-heart favorited"></i>
              <i onClick={this.deleteBook} className="fa fa-trash"></i>
            </div>)
    } else if (store.session.get('_id') === this.props.userId) {
      optionBtns = (
            <div>
              <i onClick={this.favHandler} className="fa fa-heart"></i>
              <i onClick={this.deleteBook} className="fa fa-trash"></i>
            </div>)
    } else {
      optionBtns = ''
    }

    return (
      <li className="library-book-holder">
      <img className="library-book-img" src={`${this.props.bookImg}`}/>
      <p className="library-book-title">{this.props.title}</p>
      <p className="library-book-author">{this.props.authors}</p>
      {optionBtns}
      </li>
    )
  }
})

export default UserLibrary;
