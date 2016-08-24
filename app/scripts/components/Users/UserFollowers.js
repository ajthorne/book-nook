import React from 'react';
import UserSingleFollowers from './UserSingleFollowers';
import store from '../../store';
import $ from 'jquery';
import settings from '../../settings';

const UserFollowers = React.createClass({
  getInitialState: function () {
  return {
    users: store.users.toJSON(),
    followers: store.followers.toJSON()}
  },

  updateState: function() {
      this.setState({
        users: store.users.toJSON(),
        followers: store.followers.toJSON()});
  },

  componentDidMount: function () {
    let userId = this.props.params.id;
    store.users.fetch({
      data: {query: JSON.stringify({
        _id: userId
      })}
    });
    store.followers.fetch({
      data: {query: JSON.stringify({
        userId: userId
      })}
    });
    store.users.on('update change', this.updateState)
    store.followers.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.users.off('update change', this.updateState)
    store.followers.off('update change', this.updateState)
  },
  render: function () {
    // console.log(store.session.get('followers'));
    console.log(store.followers);
    // console.log(store.session);

    let followersArr = store.followers.map((follower, i, arr) => {
      // console.log(follower.get('_acl').creator);
          let followerName = follower.get('followerName')
          let followerId = follower.get('_acl').creator;
        return <UserSingleFollowers key={i} followerId={followerId} followerName={followerName}/>
      })
      // console.log(followersArr);
    return (
      <div>
      <h2>My Followers</h2>
      {followersArr}
      </div>
    )
  }
})

export default UserFollowers
