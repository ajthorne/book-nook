import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const App = React.createClass({
  render: function () {
    return (
      <div className="main-content">
        <Nav />
        {this.props.children}
        <Footer />
      </div>
    )
  }
});

export default App;
