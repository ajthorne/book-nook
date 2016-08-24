import React from 'react';
import UserSingleFollowers from './UserSingleFollowers';
import store from '../../store';

const UserFollowers = React.createClass({
  getInitialState: function () {
  return {
    users: store.users.toJSON()}
  },

  updateState: function() {
      this.setState({users: store.users.toJSON()});
  },

  componentDidMount: function () {
    let userId = this.props.params.id;
    store.users.fetch();
    //make ajax request to followers endpoint to get followers' ids that match my username
    store.users.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.users.off('update change', this.updateState)
  },
  render: function () {
    console.log(store.users);
    return (
      <div>
      <h2>My Followers</h2>
      </div>
    )
  }
})

export default UserFollowers
