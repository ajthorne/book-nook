import Backbone from 'backbone';
import Favorite from '../models/favorite';
import settings from '../settings';

const Favorites = Backbone.Collection.extend({
    model: Favorite,
    url: `https://baas.kinvey.com/appdata/${settings.appId}/favorites`,

    addFav: function(props, id) {
        let bookTitle = props.title
        let bookImg = props.bookImg
        let bookAuthors = props.authors
        let bookId = props.bookId;
        let userId = id;
        console.log(props, id);
        // console.log(this);
        this.fetch({
            data: {
                query: JSON.stringify({  
                    userId: userId,
                    bookId: bookId,
                })
            },
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
                    }, {
                        success: (response) => {
                            console.log('You\'ve successfully added this book to your favorites!');
                            // console.log(response);
                        }
                    })
                } else {
                    let modelId = response[0]._id;
                    let model = this.get(modelId);
                    // console.log(model);
                    model.destroy({
                        success: function(response) {
                            console.log('I\'m no longer a favorite :(');
                        }
                    });
                }
            },
            error: (err) => {
                console.log('An error occurred adding this as a favorite');
            }
        })
    }
})

export default Favorites;
