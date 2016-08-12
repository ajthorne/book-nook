import Backbone from 'backbone';
import $ from 'jquery';
import settings from '../settings';

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
  })
  .fail((error) => {
    console.log('You had an error signing up!');
  })
}
})

export default User;
