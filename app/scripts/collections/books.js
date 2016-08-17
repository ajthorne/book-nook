import Backbone from 'backbone';
import Book from '../models/book';

const Books = Backbone.Collection.extend({
  url: 'https://www.googleapis.com/books/v1/volumes',
  model: Book,

  parse: function(response) {
    //parses through response to store data as specified
  if (response) {
    return response.items
    //return an array
  }
}
})



export default Books;
