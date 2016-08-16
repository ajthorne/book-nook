import React from 'react';
import store from '../../store';

const UserProfile = React.createClass({
  getInitialState: function () {
  return {
    libraryBooks: store.libraryBooks.toJSON()}
  },
  updateState: function() {
      this.setState({libraryBooks: store.libraryBooks.toJSON()});
  },

  componentDidMount: function () {
    let userId = this.props.params.id;
    // let userId = store.session.get('_id');
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
    let id = this.props.params.id;
    let userProfile = store.users.get(id);
    console.log(userProfile);
    let name = userProfile.attributes.name;
    let userImg = userProfile.attributes.imgUrl;
    console.log(this.state);

    return (
      <div>
      <h2>{name}'s Profile</h2>
      <img src={`${userImg}`}/>
      </div>
    )
  }
})

export default UserProfile;
