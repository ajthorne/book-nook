import React from 'react';
import store from '../../store';
import UserComments from './UserComments';
import moment from 'moment';
// <UserSinglePost key={i} title={title} userId={userId} id={id} body={body}/>


const UserSinglePost = React.createClass({
  getInitialState: function () {
    return {showComments: false}
  },

  commentHandler: function (e) {
    e.preventDefault();
    // console.log(this.props);
    let data = {
      userId: this.props.userId,
      body: this.refs.commentBody.value,
      creatorName: store.session.get('username'),
      creatorId: store.session.get('_id'),
      wallPostId: this.props.id
    }
    store.comments.addComment(data);
  },

  toggleComments: function () {
    // console.log('hi');
    this.setState({showComments: !this.state.showComments})
  },

  render: function () {
    // console.log(this.state.showComments, this.props.comments);
    let optionBtns;
    if (store.session.get('_id') === this.props.userId) {
      optionBtns = <div>
                      <i className="fa fa-pencil"></i>
                      <i className="fa fa-trash"></i>
                    </div>
    } else {
      optionBtns = <i className="fa fa-comment-o" onClick={this.toggleComments}></i>
    }

    let commentArea = []

    if (this.state.showComments && this.props.comments.length) {
      commentArea = [<form className="comment-box" key='form'>
              <input type="text" placeholder="What's on your mind?" key='comment' ref="commentBody"/>
              <input type="submit" key='submit' value="Add" onClick={this.commentHandler}/>
              </form>]
      // console.log(this.props.comments.map(function(comment, i, arr) {
      this.props.comments.forEach((comment, i, arr) => {
        let id = comment.creatorId;
        let name = comment.creatorName;
        let commentBody = comment.body;
        let timestamp = moment(comment._kmd.lmt).format('MMMM Do YYYY, h:mm a')
        commentArea.push(<UserComments key={i} name={name} commentBody={commentBody} timestamp={timestamp} id={id}/>);
      })
    }
    return (
      <li className="single-post-holder">
        <p className="single-post-title">{this.props.title}</p>
        <p className="single-post-timestamp">{this.props.timestamp}</p>
        <p className="single-post-body">{this.props.body}</p>
        {optionBtns}
        <ul>
          {commentArea}
        </ul>
      </li>
    )
  }
})

export default UserSinglePost;
