import React from 'react';
import store from '../../store';
// <SingleBook key={i} title={title} description-{description} authors={authors} bookImg={bookImg} id={id}/>


const SingleBook = React.createClass({
  clickHandler: function () {
    store.libraryBooks.addBook(this.props, store.session.get('_id'));
  },

  render: function () {
    return (
      <li>
      <img src={`${this.props.bookImg}`}/>
      <p>{this.props.title}</p>
      <p>{this.props.authors}</p>
      <p>{this.props.description}</p>
      <input type="button" value="Add" onClick={this.clickHandler}/>
      </li>
    )
  }
})

export default SingleBook;
