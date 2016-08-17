import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import store from '../../store';

const App = React.createClass({
  getInitialState: function () {
    return {
      session: store.session.toJSON()
    }
  },
  updateState: function() {
      this.setState({session: store.session.toJSON()});
  },
  componentDidMount: function () {
    store.session.get('username');
    store.session.on('update change', this.updateState)
  },
  componentWillUnmount: function () {
    store.session.off('update change', this.updateState)
  },
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
