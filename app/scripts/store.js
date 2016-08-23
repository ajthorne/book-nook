import User from './models/user';
import Users from './collections/users';
import Books from './collections/books';
import LibraryBooks from './collections/libraryBooks';
import LibraryBook from './models/libraryBook';
import Favorites from './collections/favorites';
import WallPosts from './collections/wallposts';
import Comments from './collections/comments';

//stores all instances of necessary models and collections
let store = {
  session: new User(),
  //access using store.user

  users: new Users(),
  //access using store.users

  books: new Books(),
  //access using store.books

  libraryBook: new LibraryBook(),
  //access using store.libraryBook

  libraryBooks: new LibraryBooks(),
  //access using store.libraryBooks

  favorites: new Favorites(),
  //access using store.favorites

  wallPosts: new WallPosts(),
  //access using store.wallposts

  comments: new Comments()
  ///access using store.comments
}

export default store;
