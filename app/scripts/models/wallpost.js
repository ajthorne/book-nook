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
})

export default WallPost;
