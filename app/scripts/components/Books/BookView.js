import React from 'react';
import store from '../../store';
import SingleBook from './BookSingle';

const BookView = React.createClass({
  getInitialState: function () {
  return {
    books: store.books.toJSON()
  }
  },
  updateState: function() {
      this.setState({books: store.books.toJSON()});
  },
  componentWillMount: function () {
    store.books.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.books.off('update change', this.updateState)
  },
  render: function () {
    let bookCollection = store.books.attributes.items
    // console.log(store.books.attributes.items);
    console.log(bookCollection);
    let books  = bookCollection.map(function(book, i, arr) {
      // console.log(book.volumeInfo);
      let title = book.volumeInfo.title;
      let description = book.volumeInfo.description;
      let authors = book.volumeInfo.authors.toString();
      let bookImg = book.volumeInfo.imageLinks.smallThumbnail;
      let id = book.id;

      return <SingleBook key={i} title={title} description={description} authors={authors} bookImg={bookImg} id={id}/>
    })

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
