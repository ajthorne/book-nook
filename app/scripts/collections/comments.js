import Backbone from 'backbone';
import Comment from '../models/comment';
import settings from '../settings';

const Comments = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appId}/comments`,
  model: Comment,

  addComment: function (data) {
    // console.log('I\'d like to express my thoughts');
    console.log('comment sent to server:', data);
    this.create(data)
  },
})

export default Comments;
