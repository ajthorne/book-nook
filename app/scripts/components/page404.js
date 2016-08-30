import React from 'react';
import {Link} from 'react-router';

const Page404 = React.createClass({
  render: function () {
    return (
      <div className="container404">
        <h1><i className="fa fa-frown-o"></i></h1>
        <h2 className="title404">Oops!</h2>
        <h3>You ended up somewhere that doesn't really exist.</h3>
        <p>Find your way home <Link to="/">here</Link>.</p>
      </div>
    )
  }
})

export default Page404;
