import Backbone from 'backbone';

const Book = Backbone.Model.extend({
  urlRoot: 'https://www.googleapis.com/books/v1/volumes'
})

export default Book;
