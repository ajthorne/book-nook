import Backbone from 'backbone';
import $ from 'jquery';
import settings from '../settings';
import { hashHistory } from 'react-router';

const User = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/${settings.appId}`,
  idAttribute: '_id',
  defaults: {
  name: '',
  username: '',
  imgUrl: 'http://www.bradleysbookoutlet.com/wp-content/uploads/2013/06/bradleys-book-outlet-books-only-logo.png',
  followers: []
},
followUser: function (data, username) {
  // console.log(data.username);
  console.log('Thanks for following me!');
  $.ajax({
    type: 'POST',
    url: `https://baas.kinvey.com/appdata/${settings.appId}/followers`,
    data: JSON.stringify({username: data.username}),
    contentType: 'application/json'
  })
  .then((response) => {
    console.log(response);
    this.set({
      followers: this.get('followers').concat(username)
    });
    console.log(this.get('followers'));

  })
},

login: function (data, url) {
  this.save(data,
    {url: `https://baas.kinvey.com/user/${settings.appId}/login`,
    success: (response)=> {
      hashHistory.push('/')
      localStorage.setItem("authtoken", response.attributes.authtoken);
    }})
},

signup: function (data) {
  this.save(data,
    {success: (response)=> {
      // console.log(response);
      // console.log(response.attributes.authtoken);
      hashHistory.push('/')
      localStorage.setItem("authtoken", response.attributes.authtoken);
    }})

},
parse: function(response) {
  console.log('parsed data:', response)
    if (response) {
      return {
        username: response.username, _id: response._id, name: response.name, authtoken: response._kmd.authtoken
      };
    }
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
