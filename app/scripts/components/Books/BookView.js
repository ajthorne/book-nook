import React from 'react';
import store from '../../store';
import SingleBook from './BookSingle';
import {hashHistory} from 'react-router';

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
    let index = searchValue.lastIndexOf('&');
    // let book = decodeURI(searchValue.substring(6));
    let book = decodeURI(searchValue.substring(6, index));
    let pageNumber = searchValue.substring(index + 6);
    console.log(book);
    store.books.fetch(
      {
        data: {
          q: book,
          startIndex: pageNumber * 10
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
    // console.log(this.props.location.query.book);
    // console.log(nextProps.location.query.book);
    let searchValue = nextProps.location.search;
    let index = searchValue.lastIndexOf('&');
    let book = decodeURI(searchValue.substring(6, index));
    let pageNumber = Number(searchValue.substring(index + 6)) + 1;
    if (this.props.location.query.book !== nextProps.location.query.book) {
      // console.log('fetching new collection', store.books);
      // this.setState({pageNumber: 0})
      store.books.fetch(
        {
          data: {
            q: book,
            startIndex: pageNumber * 10
          },
          success: function (response) {
            // console.log(arguments);
          }
      })
    }
    //  else if (this.props.location.query.book === nextProps.location.query.book && this.props.location.query.page !== nextProps.location.query.page) {
    //   let searchValue = this.props.location.search;
    //   let index = searchValue.lastIndexOf('&');
    //   let book = decodeURI(searchValue.substring(6, index));
    //   let pageNumber = Number(searchValue.substring(index + 6));
    //   console.log(pageNumber);

      // store.books.fetch(
      //   {
      //     data: {
      //       q: book,
      //       startIndex: pageNumber * 10
      //     },
      //     success: function (response) {
      //       console.log('Here are the next results for', `${book}`);
      //     }
      //   })

    // }
    return true;
},

  componentWillUnmount: function () {
    store.books.off('update change', this.updateState)
    store.libraryBooks.off('update change', this.updateState)

  },
  nextPageHandler: function () {
    let pageNumber = Number(this.props.location.query.page) + 1
    console.log('NextPage pageNumber:', pageNumber);
    // console.log(this.props.location.search);
    let searchValue = this.props.location.search;
    let index = searchValue.lastIndexOf('&');
    let book = decodeURI(searchValue.substring(6, index));

    store.books.fetch(
      {
        data: {
          q: book,
          startIndex: pageNumber * 10
        },
        success: function (response) {
          console.log('Here are the next results for', `${book}`);
        }
      })
    // console.log(book);
    hashHistory.push(`/books?book=${encodeURI(book)}&page=${pageNumber}`);
  },

  prevPageHandler: function () {
    // let pageNumber = this.state.pageNumber - 1
    let pageNumber = Number(this.props.location.query.page) - 1
      console.log('PrevPage pageNumber:', pageNumber);
    // console.log(this.props.location.search);
    let searchValue = this.props.location.search;
    let index = searchValue.lastIndexOf('&');
    let book = decodeURI(searchValue.substring(6, index));
    hashHistory.push(`/books?book=${encodeURI(book)}&page=${pageNumber}`);

    store.books.fetch(
      {
        data: {
          q: book,
          startIndex: pageNumber * 10,
        },
        success: function (response) {
          console.log('Here are the previous results for', `${book}`);
        }
      })
  },

  render: function () {
    //function to get total amount of books from search results
    let totalItems = store.books.totalBooks;
    let getPageTotal = function () {
      return Math.ceil(totalItems / 10);
    };
    getPageTotal();

    let nextBtn;
    if (getPageTotal() > Number(this.props.location.query.page)) {
      nextBtn = <button className="nextBtn" onClick={this.nextPageHandler}>Next Page <i className="fa fa-arrow-circle-right"></i></button>
    } else {
      nextBtn = ''
    }

    let prevBtn;
    if(Number(this.props.location.query.page) > 0) {
      prevBtn = <button className="prevBtn" onClick={this.prevPageHandler}><i className="fa fa-arrow-circle-left"></i> Previous Page</button>
    } else {
      prevBtn = ''
    }
    // console.log(store.libraryBooks);
      let bookCollection = store.books
      let books = bookCollection.map((book, i, arr) => {
          // let state = this.state.libraryBooks;
          // console.log('Book:', book);
          let state = this.state.libraryBooks;
          let id = book.get('id');
          let title = book.get('volumeInfo').title;
          // let snippet = book.get('searchInfo').textSnippet;
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
          let published;
          if (book.get('volumeInfo').publishedDate) {
            published = book.get('volumeInfo').publishedDate.substring(0, 4);
          } else {
            published = ''
          }

          let pageCount = book.get('volumeInfo').pageCount;
          let categories;
          if (book.get('volumeInfo').categories) {
            categories = book.get('volumeInfo').categories.toString();
          } else {
            categories = 'None'
          }
          let infoLink = book.get('volumeInfo').infoLink;
          let publisher = book.get('volumeInfo').publisher;
          let description;

          if (!book.get('volumeInfo').description) {
            description = 'No description available'
          } else  {
            description = book.get('volumeInfo').description;
          }


      return <SingleBook key={i} state={state} title={title} description={description} authors={authors} bookImg={bookImg} id={id} published={published} pageCount={pageCount} categories={categories} infoLink={infoLink} publisher={publisher}/>
    })

    let searchValue = this.props.location.search;
    let index = searchValue.lastIndexOf('&');
    let book = decodeURI(searchValue.substring(6, index));

    return (
      <div className="books-container">
        <h2>Search Results for <span>{book}</span></h2>
        <ul className="book-results">
          {books}
        </ul>
        <div className="button-holder">
          {prevBtn}
          {nextBtn}
        </div>
      </div>
    )
  }
})

export default BookView;
