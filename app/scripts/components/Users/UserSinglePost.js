import React from 'react';
import store from '../../store';
// <UserSinglePost key={i} title={title} userId={userId} id={id} body={body}/>


const UserSinglePost = React.createClass({
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

  render: function () {
    // console.log(this.props);
    let optionBtns;
    if (store.session.get('_id') === this.props.userId) {
      optionBtns = <div>
                      <i className="fa fa-pencil"></i>
                      <i className="fa fa-trash"></i>
                    </div>
    } else {
      optionBtns = <i className="fa fa-comment-o"></i>
    }

    return (
      <li className="single-post-holder">
      <p className="single-post-title">{this.props.title}</p>
      <p className="single-post-timestamp">{this.props.timestamp}</p>
      <p className="single-post-body">{this.props.body}</p>
      {optionBtns}
      <form className="comment-box">
        <input type="text" placeholder="What's on your mind?" ref="commentBody"/>
        <input type="submit" value="Add" onClick={this.commentHandler}/>
      </form>
      </li>
    )
  }
})

export default UserSinglePost;
