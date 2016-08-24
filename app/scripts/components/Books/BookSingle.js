import React from 'react';
import store from '../../store';
import {Link} from 'react-router';
//props passed down from parent
// <SingleBook key={i} state={state} title={title} description={description} authors={authors} bookImg={bookImg} id={id} published={published} pageCount={pageCount} categories={categories} infoLink={infoLink} publisher={publisher}/>

const SingleBook = React.createClass({
  getInitialState: function () {
    return {showModal: false}
  },

  toggleModal: function () {
    this.setState({showModal: !this.state.showModal})
    },

  clickHandler: function () {
    console.log(this.props);
    store.libraryBooks.addBook(this.props, store.session.get('_id'));
  },

  render: function () {
    let modal;
    if (this.state.showModal) {
      modal = (
        <div className="book-modal-container">
          <div className="book-modal">
            <button><i className="fa fa-remove" onClick={this.toggleModal}></i></button>
            <p className="modal-title">{this.props.title} by {this.props.authors}</p>
            <p className="modal-date"><span>Published by </span>{this.props.publisher}, {this.props.published}</p>
            <p className="modal-count"><span>Page Count</span>: {this.props.pageCount}</p>
            <p className="modal-book-description"><span>Full Description</span>: {this.props.description}</p>
            <a href={this.props.infoLink} className="modal-book-link">More Info</a>
          </div>
      </div>)

      // published={published} pageCount={pageCount} categories={categories} infoLink={infoLink} publisher={publisher}
     }
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
      addBtn = <button className="single-book-added"><i className="fa fa-check"></i> Added to Library</button>
    } else {
      addBtn = ''
    }

    return (
      <li className="single-book-holder">
      <div className="single-book-img">
        <i className="fa fa-search-plus"></i>
        <img src={`${this.props.bookImg}`} onClick={this.toggleModal}/>
      </div>
      <div className="single-book-copy">
        <p className="single-book-title">{this.props.title}</p>
        <p className="single-book-author">{this.props.authors}</p>
        <p className="single-book-description"><span>About: </span>{this.props.description}</p>
        {addBtn}
      </div>
      {modal}
      </li>
    )
  }
})

export default SingleBook;
