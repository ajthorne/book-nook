import Backbone from 'backbone';
import WallPost from '../models/WallPost';
import settings from '../settings';
import $ from 'jquery';

const WallPosts = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appId}/wallposts`,
  model: WallPost,

  createPost: function (data) {
    // console.log('Submitting post....');
         this.create(data)
  },

  //future feature...
  // deletePost: function (data) {
  //   // console.log(data);
  //   let id = data.id
  //   let model = this.get(id);
  //   // console.log(model);
  //   model.destroy({
  //     url:`https://baas.kinvey.com/appdata/${settings.appId}/wallposts/` + id
  //   })
  // }

})

export default WallPosts;
