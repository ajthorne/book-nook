import React from 'react';
import store from '../../store';
import SingleUser from './SingleUser';

const UserView = React.createClass({
  getInitialState: function () {
  return {
    users: store.users.toJSON()}
  },
  updateState: function() {
      this.setState({users: store.users.toJSON()});
  },

  componentDidMount: function () {
    store.users.fetch({
      success: function (response) {
        console.log('success with fetching:', response);
      }
    });
    store.users.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.users.off('update change', this.updateState)
  },
  render: function () {
    let userCollection = store.users.models
    console.log('userCollection:', userCollection);
    let users = userCollection.map(function (user, i, arr) {
      let userImg = user.attributes.imgUrl;
      let name = user.attributes.name;
      let id = user.attributes._id;

      return <SingleUser key={i} userImg={userImg} name={name} id={id}/>
    })
    return (
      <div>
      <h2>User List</h2>
      {users}
      </div>
    )
  }
})

export default UserView;
