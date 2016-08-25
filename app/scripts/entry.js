import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/HomePage/App';
import Features from './components/HomePage/Features';
import Login from './components/Login/Login';
import $ from 'jquery';
import store from './store';
import settings from './settings';
import UserView from './components/Users/UsersView';
import BookView from './components/Books/BookView';
import UserProfile from './components/Users/UserProfile';
import UserFavorites from './components/Users/UserFavorites';
import UserLibraryView from './components/Users/UserLibraryView';
import UserPosts from './components/Users/UserPosts';
import UserFollowers from './components/Users/UserFollowers';

$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax) {
  // console.log('intercepted');
  if (jqueryAjax.url.indexOf('google') === -1) {
  if (localStorage.authtoken) {
    //if authtoken exists
    xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + localStorage.authtoken);
    //Authorization pulls authtoken for that user from response
  } else {
    xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.baseAuth);
    //authorization needs user to login or sign up to get authtoken
  }
}
});

if (localStorage.authtoken) {
  store.session.retrieve()
}

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Features}/>
      <Route path="/login" component={Login}/>
      <Route path="/users" component={UserView}/>
      <Route path="/books" component={BookView}/>
      <Route path="/users/:id" component={UserProfile}>
        <IndexRoute component={UserLibraryView}/>
        <Route path="/users/:id/favorites" component={UserFavorites}/>
        <Route path="/users/:id/posts" component={UserPosts}/>
        <Route path="/users/:id/followers" component={UserFollowers}/>
      </Route>
    </Route>
  </Router>
)

ReactDOM.render(router, document.querySelector('.container'));

//QUESTIONS

//TO DO --
//Since I added a followers collection, it would be helpful to clean up my code and replace manual ajax requests with fetching and get requests instead

//CLEAN UP CODE! lots of fetching of collections on components. Is there a way to reduce this?

//if I delete a book from librarybooks collection, it must also be removed in the favorites collection if it's in there
//edit and delete post from posts collection
