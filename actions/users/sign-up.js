// actions/users/sign-up.js
import API from '../../lib/api';
import signIn from './sign-in';
import {
  API_LOADING,
  API_READY,
  API_ERROR,
} from '../../middleware/api'

const api = new API();
const users = api.service('users');

export const USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR';

export default (user) => {
  return (dispatch) => {
    dispatch({ type: API_LOADING });
    users.create(user)
      .then((result) => {
        dispatch(signIn(user));
      })
      .catch((error) => {
        dispatch({ type: API_ERROR, payload: error });
        dispatch({
          type: USER_SIGNUP_ERROR,
          payload: error
        })
      });
  }

}
