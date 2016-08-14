import React from 'react';
// <SingleBook key={i} title={title} description-{description} authors={authors} bookImg={bookImg} id={id}/>


const SingleBook = React.createClass({
  render: function () {
    return (
      <li>
      <img src={`${bookImg}`}/>
      <p>{this.props.title}</p>
      <p>{this.props.authors}</p>
      <p>{this.props.description}</p>
      </li>
    )
  }
})

export default SingleBook;
