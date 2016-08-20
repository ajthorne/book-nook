import React from 'react';
import store from '../../store';
// <SingleBook key={i} title={title} description-{description} authors={authors} bookImg={bookImg} id={id}/>
//to do - fix "Added" button...


const SingleBook = React.createClass({
  getInitialState: function () {
    return {notAdded: 'Add to My Library',
  libraryBooks: store.libraryBooks.toJSON()}
  },

  clickHandler: function () {
    console.log(this.props);
    store.libraryBooks.addBook(this.props, store.session.get('_id'));
    this.setState({notAdded: 'Added to Library'});
  },

  updateState: function() {
      this.setState({libraryBooks: store.libraryBooks.toJSON()});
  },

  componentDidMount: function () {
    let userId = store.session.get('_id');
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
    // console.log(this.state.libraryBooks);
    // let added;
    // let libraryBtn = this.state.libraryBooks.map(function(book, i, arr) {
    //   added = book.userRead;
    //   return added
    // });

    let addBtn;

    if (store.session.get('username')) {
      addBtn = <button className="single-book-add" onClick={this.clickHandler}>{this.state.notAdded}</button>
    } else if (store.session.get('username') && ({added} === true)) {
      addBtn = <button className="single-book-add" onClick={this.clickHandler}>Added to Library</button>
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
