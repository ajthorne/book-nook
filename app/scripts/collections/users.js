import Backbone from 'backbone';
import User from '../models/user';
import {hashHistory} from 'react-router';

const Users = Backbone.Collection.extend({
  model: User,
  url: 'https://baas.kinvey.com/user/kid_S1vGuojt',
  // getUsers: function () {
  //   this.fetch(
  //     {
  //       success: function (response) {
  //         // console.log(response);
  //         hashHistory.push('/users')
  //       }
  //     }
  //   )
  // }
})

export default Users;
