import Backbone from 'backbone';
import settings from '../settings';

const Favorite = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appId}/favorites`,
  idAttribute: '_id',
  defaults: {
    userId: '',
    bookId: '',
    bookTitle: '',
    bookAuthors: '',
    bookImg: '',
  }
})

export default Favorite;
