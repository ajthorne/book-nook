import Backbone from 'backbone';
import settings from '../settings';

const Followers = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appId}/followers`
})

export default Followers;
