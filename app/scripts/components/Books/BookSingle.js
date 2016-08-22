import React from 'react';
import store from '../../store';
// <SingleBook key={i} title={title} description-{description} authors={authors} bookImg={bookImg} id={id}/>
//to do - fix "Added" button...


const SingleBook = React.createClass({
  clickHandler: function () {
    console.log(this.props);
    store.libraryBooks.addBook(this.props, store.session.get('_id'));
  },

  render: function () {
    // console.log(this.props);
    // console.log(this.props.state);
    let userBooks = this.props.state.filter((book, i, arr) => {
      // console.log('comparing current user to book user');
      return book.bookId === this.props.id
    }).filter((thisBook) => {
      return thisBook.userId === store.session.get('_id');
    })
    // console.log(userBooks);

    let addBtn;
    if (store.session.get('username') && !userBooks.length) {
      addBtn = <button className="single-book-add" onClick={this.clickHandler}>Add to Library</button>
    }
    else if (store.session.get('username') && (userBooks.length)) {
      addBtn = <button className="single-book-add"><i className="fa fa-check"></i> Added to Library</button>
    } else {
      addBtn = ''
    }

    return (
      <li className="single-book-holder">
      <div className="single-book-img">
        <img src={`${this.props.bookImg}`}/>
      </div>
      <div className="single-book-copy">
        <p className="single-book-title">{this.props.title}</p>
        <p className="single-book-author">{this.props.authors}</p>
        <p className="single-book-description"><span>About: </span>{this.props.description}</p>
        {addBtn}
      </div>
      </li>
    )
  }
})

export default SingleBook;
