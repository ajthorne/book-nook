import React from 'react';
//shown consistently throughout app via Nav component

const Search = React.createClass({
  submitHandler: function (e) {
    e.preventDefault();
    console.log('Your search:', this.refs.book.value);
  },
  render: function () {
    return (
      <form className="book-search" onSubmit={this.submitHandler}>
        <input type="text" placeholder="Search for a book" ref="book"/>
        <input type="submit" value="Search"/>
      </form>
    )
  }
});

export default Search;
