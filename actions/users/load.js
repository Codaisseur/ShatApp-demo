import { AsyncStorage } from 'react-native';
export const USER_LOADED_FROM_STORAGE = 'USER_LOADED_FROM_STORAGE';

export default () => {
  return (dispatch) => {
    AsyncStorage.getItem('chatUser')
      .then((result) => {
        console.log(result);
        dispatch({
          type: USER_LOADED_FROM_STORAGE,
          payload: JSON.parse(result)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
