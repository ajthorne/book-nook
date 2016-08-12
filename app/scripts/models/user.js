import Backbone from 'backbone';
import $ from 'jquery';
import settings from '../settings';
import { hashHistory } from 'react-router';

const User = Backbone.Model.extend({
  defaults: {
  id: '',
  name: '',
  username: '',
  imgUrl: '',
  authToken: ''
},
login: function (data) {
  $.ajax({
  type: 'POST',
  url: `https://baas.kinvey.com/user/${settings.appId}/login`,
  data: JSON.stringify(data),
  contentType: 'application/json'
})
  .then((response) => {
  // console.log(response);
  this.set({
    username: response.username, authtoken: response._kmd.authtoken, id: response._id
  });
  hashHistory.push('/')

  // localStorage.setItem("authtoken", response._kmd.authtoken);
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
      username: response.username, authtoken: response._kmd.authtoken, id: response._id, name: response.name, imgUrl: response.imgUrl
    });
    hashHistory.push('/')
  })
  .fail((error) => {
    console.log('You had an error signing up!');
  })
},

logout: function () {
  $.ajax(null, {
      url: `https://baas.kinvey.com/user/${settings.appId}/_logout`,
    })
    .then((response) => {
      this.clear();
      hashHistory.push('/')
      // localStorage.clear();
      console.log('You are logged out. Goodbye!');
    })
    .fail((error) => {
      console.error('Failed to log out!')
      console.log(error);
    })
  }
});

export default User;
