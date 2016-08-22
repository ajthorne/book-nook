import Backbone from 'backbone';
import $ from 'jquery';
import settings from '../settings';
import { hashHistory } from 'react-router';
import store from '../store';

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
  //data = this.props from user profile
  // console.log(data);
  let id = data.id
  // console.log(data.username);
  let user = store.users.get(id);
  // console.log('user', user.toJSON());
  let followers = user.get('followers')
  // console.log(followers);
    if (followers.length === 0) {
      console.log('Thanks for following me!');
      $.ajax({
        type: 'POST',
        url: `https://baas.kinvey.com/appdata/${settings.appId}/followers`,
        data: JSON.stringify({username: data.username}),
        contentType: 'application/json',
        success: (response) => {
          console.log('followers', followers.concat(username));
          user.save({
            followers: followers.concat(username)
          }, {
            success: function (response) {
              console.log(response);
            }
          });
        }
    })
  }
  else if (followers.indexOf(this.get('username')) === -1) {
    console.log('You haven\'t followed this person yet...');
    $.ajax({
      type: 'POST',
      url: `https://baas.kinvey.com/appdata/${settings.appId}/followers`,
      data: JSON.stringify({username: data.username}),
      contentType: 'application/json',
      success: (response) => {
        user.save({
          followers: followers.concat(username)
        })
        // console.log(user.toJSON())
      },
      error: (err) => {
        console.log(err);
      }
  })
  }
},

unfollowUser: function (data, username) {
  // console.log(data.id);
  // console.log(username);
    let id = data.id
    let model = store.users.get(id).toJSON();
    let followers = model.followers
    let follower = followers.indexOf(username)
    console.log(follower);
    console.log(followers.splice(follower, 1));
    console.log(followers);

    //need to get id of follower to delete


    $.ajax({
      type: 'DELETE',
      url: `https://baas.kinvey.com/appdata/${settings.appId}/followers`,
      // data: JSON.stringify({username: username}),
      dataType: 'application/json',
      success: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
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
  // console.log('parsed data:', response)
  //anything that you want returned from the user, you need to set here!
    if (response) {
      return {
        username: response.username, _id: response._id, name: response.name, authtoken: response._kmd.authtoken,
        followers: response.followers, imgUrl: response.imgUrl
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
