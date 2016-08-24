import React from 'react';
import store from '../../store';
import UserSinglePost from './UserSinglePost';
import moment from 'moment';

const UserPosts = React.createClass({
  getInitialState: function () {
  return {
    wallPosts: store.wallPosts.toJSON(),
    comments: store.comments.toJSON(),
    showModal: false}
  },

  updateState: function() {
      this.setState({wallPosts: store.wallPosts.toJSON(),
      comments: store.comments.toJSON()});
  },

  componentDidMount: function () {
    let userId = this.props.params.id;
    store.wallPosts.fetch({
    data: {query: JSON.stringify({
      userId: userId,
    })}
  })

  store.comments.fetch({
    data: {query: JSON.stringify({
      userId: userId,
    })}
  })

    store.wallPosts.on('update change', this.updateState)
    store.comments.on('update change', this.updateState)
  },

  componentWillUnmount: function () {
    store.wallPosts.off('update change', this.updateState)
    store.comments.off('update change', this.updateState)
  },

  toggleModal: function () {
  this.setState({showModal: !this.state.showModal})
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
    // console.log(this.state.comments);
    let modal;
    if (this.state.showModal) {
      modal = (
        <div className="modal-container">
        <form className="modal" onSubmit={this.submitPost}>
          <button className="cancel-btn" onClick={this.toggleModal}><i className="fa fa-remove"></i></button>
          <input className="post-title" type="text" placeholder="Enter a title" ref="title"/>
          <input className="post-body" type="text" placeholder="Enter text" ref="bodyText"/>
          <input className="post-btn" type="submit" value="Create Post"/>
       </form>
      </div>)
     }

    let posts = store.wallPosts.map((post, i, arr) =>  {
      let comments = this.state.comments.filter(function (comment, i, arr) {
        return comment.wallPostId === post.get('_id')
      });
      let id = post.get('_id');
      // console.log(id);
      let userId = post.get('userId');
      let body = post.get('body');
      let title = post.get('title');
      let timestamp = moment(post.get('_kmd').lmt).format('MMMM Do YYYY, h:mm a')
      return <UserSinglePost key={i} title={title} userId={userId} id={id} body={body} timestamp={timestamp} comments={comments}/>
    });
    let postList = posts.reverse();

    return (
      <div className="posts-container">
        <h2>My Posts</h2>
        <button onClick={this.toggleModal}><i className="fa fa-edit"></i> New Post</button>
        <ul className="posts-holder">
          {postList}
        </ul>
        {modal}
      </div>
    )
  }
})

export default UserPosts;
