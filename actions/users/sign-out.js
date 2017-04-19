import API from '../../lib/api';
import { Actions } from 'react-native-router-flux';

export const USER_SIGNED_OUT = 'USER_SIGNED_OUT';

const api = new API();
const users = api.service('users');

export default (user) => {
  return (dispatch) =>{
    api.signOut();
    Actions.signIn();
    dispatch(signedOutUser());
  }
}

const signedOutUser = () => {
  return {
    type: USER_SIGNED_OUT,
  };
}
