import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/HomePage/App';
import Features from './components/HomePage/Features';
import Login from './components/Login/Login';
import $ from 'jquery';
import store from './store';
import settings from './settings';

$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax) {
  if (store.session.get('authtoken')) {
    //if authtoken exists
    xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + store.session.get('authtoken'));
    //Authorization pulls authtoken for that user from response
  } else {
    xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.baseAuth);
    //authorization needs user to login or sign up to get authtoken
  }
});

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Features}/>
      <Route path="/login" component={Login}/>
    </Route>
  </Router>
)

ReactDOM.render(router, document.querySelector('.container'));
