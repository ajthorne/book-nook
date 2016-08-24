import Backbone from 'backbone';
import LibraryBook  from '../models/libraryBook';
import settings from '../settings';

const LibraryBooks = Backbone.Collection.extend({
  model: LibraryBook,
  url: `https://baas.kinvey.com/appdata/${settings.appId}/librarybooks`,

  addBook: function (props, id) {
    let bookTitle = props.title
    let bookImg = props.bookImg
    let bookAuthors = props.authors
    let bookId = props.id;
    let userId = id;
    // console.log(props, id);
    // console.log(this);
    this.fetch({
        data: {query: JSON.stringify({
          userId: userId,
          bookId: bookId,
     })},
     remove: false,
     success: (coll, response) => {
       console.log('success, here it is: ', response);
       if (response.length === 0) {
         //if the book does not exist in the collection... then create it.
         this.create({
            userId: userId,
            bookId: bookId,
            bookTitle: bookTitle,
            bookAuthors: bookAuthors,
            bookImg: bookImg,
            userRead: true
       },
       {
       success: (response) => {
         console.log('You\'ve successfully added this book to your library!');
         console.log(response);
       }})
       }
       else {
         console.log('Sorry, you have already added this book!');
       }
     },
     error: (err) => {
       console.log('An error occurred adding this book');
     }
   })
 },

 deleteBook: function (data) {
   let id = data.id
   let model = this.get(id);
  //  console.log(model);
   model.destroy({success: function (response) {
     console.log('Deleting from your collection...');
   }});
 }
})

export default LibraryBooks;
