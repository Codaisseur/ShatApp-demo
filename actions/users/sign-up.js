// actions/users/sign-up.js

import API from '../../lib/api';

const api = new API();
const users = api.service('users');

export default (user) => {
  console.log('creating user...');
  users.create(user)
    .then((result) => {
      console.log('user successfully created', result);
    })
    .catch((error) => {
      console.error('oops there has been an error', error);
    });
}
