import { USER_LOADED_FROM_STORAGE } from '../actions/users/load';
import { USER_SIGNUP_ERROR } from '../actions/users/sign-up';
import { USER_SIGNED_IN, USER_AUTH_ERROR } from '../actions/users/sign-in';
import { USER_SIGNED_OUT } from '../actions/users/sign-out';
import { AsyncStorage } from 'react-native';

export default (state = null, { type, payload }) => {
  switch (type) {
    case USER_LOADED_FROM_STORAGE :
      return payload;

    case USER_SIGNED_IN :
      AsyncStorage.setItem('chatUser', JSON.stringify(payload));
      return { ...payload };

    case USER_SIGNED_OUT :
      AsyncStorage.removeItem('chatUser');
      return {};

    case USER_SIGNUP_ERROR :
    case USER_AUTH_ERROR :
      const { name, message, errors } = payload;
      return {
        error: { name, message, errors }
      };

    default :
      return state;
  }
}
