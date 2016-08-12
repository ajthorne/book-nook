import User from './models/user';
import Users from './collections/users';

let store = {
  session: new User(),
  //access using store.user

  users: new Users()
  //access using store.users
}

export default store;
