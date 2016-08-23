import React from 'react';
import store from '../../store';
import UserLibrary from './UserLibrary';
import UserAside from './UserAside';

const UserProfile = React.createClass({
  getInitialState: function () {
  return {
    libraryBooks: store.libraryBooks.toJSON(),
    users: store.users.toJSON()}
  },

  updateState: function() {
      this.setState({libraryBooks: store.libraryBooks.toJSON(),
      users: store.users.toJSON()});
  },

  componentDidMount: function () {
    let userId = this.props.params.id;
    store.users.fetch({
      data: {query: JSON.stringify({
        _id: userId
      })}
    });
    store.libraryBooks.fetch({
    data: {query: JSON.stringify({
      userId: userId,
    })}
  })
    store.libraryBooks.on('update change', this.updateState)
    store.users.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.libraryBooks.off('update change', this.updateState)
    store.users.off('update change', this.updateState)
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    // console.log(nextProps.params.id);
    // console.log('this props', this.props.params.id);
    let user = nextProps.params.id;
    // console.log('nextProps', user);
    if (this.props.params.id !== nextProps.params.id) {
          console.log('moving to new user', store.users);
        store.users.fetch({
            data: {
                query: JSON.stringify({
                    _id: user
                })
            }
        });
    }
    store.libraryBooks.fetch({
        data: {
            query: JSON.stringify({ 
                userId: user,
            })
        }
    })
    return true;
},
  render: function () {
    // console.log(this.state);
    let userProfile = store.users.map(function(user, i, arr) {
      let id = user.get('_id');
      let name = user.get('name');
      let userImg = user.get('imgUrl');
      let username = user.get('username');
      return <UserAside key={i} id={id} name={name} username={username} userImg={userImg}/>
    });

    return (
      <div className="user-profile-container">
        {userProfile}
        {this.props.children}
      </div>
    )
  }
})

export default UserProfile;
