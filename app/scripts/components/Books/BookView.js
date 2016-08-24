import React from 'react';
import store from '../../store';
import SingleBook from './BookSingle';

const BookView = React.createClass({
  getInitialState: function () {
  return {
    books: store.books.toJSON(),
    libraryBooks: store.libraryBooks.toJSON()}
  },
  updateState: function() {
      this.setState({books: store.books.toJSON(),
      libraryBooks: store.libraryBooks.toJSON()});
  },
  componentDidMount: function () {
    let searchValue = this.props.location.search;
    let book = decodeURI(searchValue.substring(6));
    store.books.fetch(
      {
        data: {
          q: book
        },
        success: function (response) {
          console.log('Here are your results for', `${book}`);
        }
      })

      let userId = store.session.get('_id');
      store.libraryBooks.fetch({
      data: {query: JSON.stringify({
        userId: userId,
      })}
    })
    store.books.on('update change', this.updateState)
    store.libraryBooks.on('update change', this.updateState)
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    let searchValue = nextProps.location.search;
    let book = decodeURI(searchValue.substring(6));
    if (this.props.location.search !== nextProps.location.search) {
      // console.log('fetching new collection', store.books);
      store.books.fetch(
        {
          data: {
            q: book
          },
          success: function (response) {
            // console.log(arguments);
          }
      })
    }
    return true;
},

  componentWillUnmount: function () {
    store.books.off('update change', this.updateState)
    store.libraryBooks.off('update change', this.updateState)

  },
  render: function () {
    // console.log(store.libraryBooks);
      let bookCollection = store.books
      let books = bookCollection.map((book, i, arr) => {
          // let state = this.state.libraryBooks;
          // console.log('Book:', book);
          let state = this.state.libraryBooks;
          let id = book.get('id');
          let title = book.get('volumeInfo').title;
          let description = book.get('volumeInfo').description;
          let authors;
          let bookImg;

          if (book.get('volumeInfo').authors) {
            authors = book.get('volumeInfo').authors.toString();
          } else {
            authors = ''
          }

          if (book.get('volumeInfo').imageLinks) {
            bookImg = book.get('volumeInfo').imageLinks.smallThumbnail;
          } else  {
            bookImg = 'http://images.clipartpanda.com/book-20clip-20art-book_blue.png';
          }

          //info needed for book modal..
          let published = book.get('volumeInfo').publishedDate;
          let pageCount = book.get('volumeInfo').pageCount;
          let categories = book.get('volumeInfo').categories.toString();
          let infoLink = book.get('volumeInfo').infoLink;
          let publisher = book.get('volumeInfo').publisher;

      return <SingleBook key={i} state={state} title={title} description={description} authors={authors} bookImg={bookImg} id={id} published={published} pageCount={pageCount} categories={categories} infoLink={infoLink} publisher={publisher}/>
    })

    let searchValue = this.props.location.search;
    let book = decodeURI(searchValue.substring(6));

    return (
      <div className="books-container">
        <h2>Search Results for <span>{book}</span></h2>
        <ul className="book-results">
          {books}
        </ul>
      </div>
    )
  }
})

export default BookView;
