import Backbone from 'backbone';
import settings from '../settings';

const WallPost = Backbone.Model.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appId}/wallposts`,
  idAttribute: '_id',
  defaults: {
    userId: '',
    title: '',
    body: ''
  },

  // comparator: function (post) {
  //   return Date(post.get('timestamp')) * -1
  // }
  //comparator is not working!
  //using reverse instead for now...
})

export default WallPost;
