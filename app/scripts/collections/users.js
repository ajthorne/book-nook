import Backbone from 'backbone';
import User from '../models/user';

const Users = Backbone.Collection.extend({
  model: User,
  // url: https://baas.kinvey.com/appdata/kid_S1vGuojt/users
})

export default Users;
