import Backbone from 'backbone';
import settings from '../settings';


const LibraryBook = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appId}/librarybooks`,
  idAttribute: '_id',
  defaults: {
    userId: '',
    bookId: '',
  }
})

export default LibraryBook;
