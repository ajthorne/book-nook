import React from 'react';
import store from '../../store';
import UserSinglePost from './UserSinglePost';
import moment from 'moment';

const UserPosts = React.createClass({
  getInitialState: function () {
  return {
    favorites: store.wallPosts.toJSON()}
  },

  updateState: function() {
      this.setState({favorites: store.wallPosts.toJSON()});
  },

  componentDidMount: function () {
    let userId = this.props.params.id;
    store.wallPosts.fetch({
    data: {query: JSON.stringify({
      userId: userId,
    })}
  })
    store.wallPosts.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.wallPosts.off('update change', this.updateState)
  },

  submitPost: function (e) {
    e.preventDefault();
    let data = {
      title: this.refs.title.value,
      body: this.refs.bodyText.value,
      userId: store.session.get('_id')
    }
    // console.log(data);
    store.wallPosts.createPost(data);
  },

  render: function () {
    let posts = store.wallPosts.map(function(post, i, arr) {
      let id = post.get('_id')
      let userId = post.get('userId');
      let body = post.get('body');
      let title = post.get('title');
      let timestamp = moment(post.get('_kmd').lmt).format('MMMM Do YYYY, h:mm:ss a')
      return <UserSinglePost key={i} title={title} userId={userId} id={id} body={body} timestamp={timestamp}/>
    });
    return (
      <div className="posts-container">
        <h2>My Posts</h2>
        <ul className="posts-holder">
          {posts}
        </ul>
        <form onSubmit={this.submitPost}>
          <input type="text" placeholder="Enter a title" ref="title"/>
          <input type="text" placeholder="Enter text" ref="bodyText"/>
          <input type="submit" value="Create Post"/>
        </form>
      </div>
    )
  }
})

export default UserPosts;

//to do
//make new post into modal
//add icon for new post to top right side
