import Backbone from 'backbone';
import $ from 'jquery';
import settings from '../settings';
import { hashHistory } from 'react-router';

const User = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
  name: '',
  username: '',
  imgUrl: '',
  authtoken: ''
},
login: function (data) {
  $.ajax({
  type: 'POST',
  url: `https://baas.kinvey.com/user/${settings.appId}/login`,
  data: JSON.stringify(data),
  contentType: 'application/json'
})
  .then((response) => {
  this.set({
    username: response.username, authtoken: response._kmd.authtoken, _id: response._id
  });
  hashHistory.push('/')

  localStorage.setItem("authtoken", response._kmd.authtoken);
  })
  .fail((error) => {
    console.error('You had an error logging in')
  })
},

signup: function (data) {
  $.ajax({
    type: 'POST',
    url: `https://baas.kinvey.com/user/${settings.appId}`,
    data: JSON.stringify(data),
    contentType: 'application/json'
  })
  .then((response) => {
    this.set({
      username: response.username, authtoken: response._kmd.authtoken, _id: response._id, name: response.name, imgUrl: response.imgUrl
    });
    hashHistory.push('/')
  })
  .fail((error) => {
    console.log('You had an error signing up!');
  })
},
retrieve: function () {
  this.fetch({
  url: `https://baas.kinvey.com/user/${settings.appId}/_me`,
  success: () => {
    console.log('you got your authtoken:', localStorage.getItem('authtoken'));
    localStorage.getItem("authtoken")
    },
  error: function(e) {
    console.log(e);
  }
});
},

logout: function () {
  $.ajax(null, {
      url: `https://baas.kinvey.com/user/${settings.appId}/_logout`,
    })
    .then((response) => {
      this.clear();
      hashHistory.push('/')
      localStorage.clear();
      console.log('You are logged out. Goodbye!');
    })
    .fail((error) => {
      console.error('Failed to log out!')
      console.log(error);
    })
  }
});

export default User;
