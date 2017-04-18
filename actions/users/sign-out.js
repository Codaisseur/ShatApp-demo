import API from '../../lib/api';

export const USER_SIGNED_OUT = 'USER_SIGNED_OUT';

const api = new API();
const users = api.service('users');

export default (user) => {
  return (dispatch) =>{
    api.signOut();
    dispatch(signedOutUser());
  }
}

const signedOutUser = () => {
  return {
    type: USER_SIGNED_OUT,
  };
}
