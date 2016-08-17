import React from 'react';
import store from '../../store';
import SingleBook from './BookSingle';

const BookView = React.createClass({
  getInitialState: function () {
  return {
    books: store.books.toJSON()}
  },
  updateState: function() {
      this.setState({books: store.books.toJSON()});
  },
  componentDidMount: function () {
    let searchValue = this.props.location.search;
    let book = searchValue.substring(6);
    store.books.fetch(
      {
        data: {
          q: book
        },
        success: function (response) {
          console.log(response);
        }
      })
    store.books.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.books.off('update change', this.updateState)
  },
  render: function () {
    // console.log(store.books.get('items'));
    let books;
    if (store.books.get('items')) {
      let bookCollection = store.books.get('items')
      books = (bookCollection.map(function(book, i, arr) {
          // console.log(book);
          let title = book.volumeInfo.title;
          let description = book.volumeInfo.description;
          let id = book.id;
          let authors;
          let bookImg;

          if (book.volumeInfo.authors) {
            authors = book.volumeInfo.authors.toString();
          } else {
            authors = ''
          }

          if (book.volumeInfo.imageLinks) {
            bookImg = book.volumeInfo.imageLinks.smallThumbnail;
          } else  {
            bookImg = 'http://images.clipartpanda.com/book-20clip-20art-book_blue.png';
          }
      return <SingleBook key={i} title={title} description={description} authors={authors} bookImg={bookImg} id={id}/>
    }))
  } else {
    books = ''
  }
    return (
      <div>
        <h2>Search Results</h2>
        <ul>
          {books}
        </ul>
      </div>
    )
  }
})

export default BookView;
