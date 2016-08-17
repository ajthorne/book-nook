import Backbone from 'backbone';

const Book = Backbone.Model.extend({
  urlRoot: 'https://www.googleapis.com/books/v1/volumes',
// 
//   parse: function(response) {
//     //parses through response to store data as specified
//   if (response) {
//     return response.volumeInfo
//     //return an array
//   }
// }
})

export default Book;
