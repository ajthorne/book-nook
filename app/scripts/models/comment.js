import Backbone from 'backbone';
import settings from '../settings';

const Comment = Backbone.Model.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appId}/comments`,
  idAttribute: '_id',
  defaults: {
    userId: '',
    creatorId: '',
    creatorName: '',
    wallPostId: '',
    body: ''
  }
})

export default Comment;
