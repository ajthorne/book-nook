import Backbone from 'backbone';

const Books = Backbone.Model.extend({
  url: 'https://www.googleapis.com/books/v1/volumes'

//   parse: function(response) {
//     //parses through response to store data as specified
//   if (response) {
//     return response.attributes.items
//     //return an array
//   }
// }
})



export default Books;
