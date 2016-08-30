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
    this.refs.commentBody.value = '';
  },

  toggleComments: function () {
    // console.log('hi');
    this.setState({showComments: !this.state.showComments})
  },

  deletePostHandler: function () {
    store.wallPosts.deletePost(this.props);
  },

  render: function () {
    // console.log(this.state.showComments, this.props.comments);
    let optionBtns;
    let commentBtn;
    let commentNumber = Number(this.props.comments.length);
    if (commentNumber > 1){
      commentBtn = <p className="option-btn"><i className="fa fa-comment-o" onClick={this.toggleComments}></i> {commentNumber} Comments</p>
    } else if (commentNumber === 1) {
      commentBtn = <p className="option-btn"><i className="fa fa-comment-o" onClick={this.toggleComments}></i> {commentNumber} Comment</p>
    }
    else {
      commentBtn = <p className="option-btn"><i className="fa fa-comment-o" onClick={this.toggleComments}></i> Add a Comment</p>
    }

    if (store.session.get('_id') === this.props.userId) {
      optionBtns = <div className="buttons-holder">
                      <i className="fa fa-pencil" onClick={this.editPostHandler}></i>
                      <i className="fa fa-trash" onClick={this.deletePostHandler}></i>
                      {commentBtn}
                    </div>
    } else {
      optionBtns = <div className="buttons-holder">
                    {commentBtn}
                  </div>
    }

    let commentArea = []

    if (this.state.showComments && this.props.comments.length) {
      commentArea = [<form className="comment-box" key='form'>
              <input className="comment-body" type="text" placeholder="What's on your mind?" key='comment' ref="commentBody"/>
              <button className="comment-btn" key='submit' onClick={this.commentHandler}>+</button>
              </form>]
      // console.log(this.props.comments.map(function(comment, i, arr) {
      this.props.comments.forEach((comment, i, arr) => {
        let id = comment.creatorId;
        let name = comment.creatorName;
        let commentBody = comment.body;
        // let timestamp = moment(comment._kmd.lmt).format('MMMM Do YYYY, h:mm a')
        let timestamp = moment(comment._kmd.lmt).calendar()
        // let timestamp = moment(comment._kmd.lmt).fromNow()
        commentArea.push(<UserComments key={i} name={name} commentBody={commentBody} timestamp={timestamp} id={id}/>);
      })
    } else if (this.state.showComments) {
      commentArea = [<form className="comment-box" key='form'>
              <input className="comment-body" type="text" placeholder="Add your thoughts..." key='comment' ref="commentBody"/>
              <button className="comment-btn" key='submit' onClick={this.commentHandler}>+</button>
              </form>]
    }
    return (
      <li className="single-post-holder">
        <p className="single-post-title">{this.props.title}</p>
        <p className="single-post-timestamp">{this.props.timestamp}</p>
        <p className="single-post-body">{this.props.body}</p>
        {optionBtns}
        <ul className="comment-area">
          {commentArea}
        </ul>
      </li>
    )
  }
})

export default UserSinglePost;
