import React from 'react';
import store from '../../store';
// <SingleBook key={i} title={title} description-{description} authors={authors} bookImg={bookImg} id={id}/>


const SingleBook = React.createClass({
  clickHandler: function () {
    store.libraryBooks.addBook(this.props, store.session.get('_id'));
  },

  render: function () {
    let addBtn;

    if (store.session.get('username')) {
      addBtn = <button className="single-book-add" onClick={this.clickHandler}>Add to My Library</button>
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
