import Backbone from 'backbone';
import WallPost from '../models/WallPost';
import settings from '../settings';

const WallPosts = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appId}/wallposts`,
  model: WallPost,

  createPost: function (data) {
    console.log('Submitting post....');
         this.create(data)
  },

  // comparator: this.get
})

export default WallPosts;
