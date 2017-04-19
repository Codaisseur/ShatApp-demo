import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
export const USER_LOADED_FROM_STORAGE = 'USER_LOADED_FROM_STORAGE';

export default () => {
  return (dispatch) => {
    AsyncStorage.getItem('chatUser')
      .then((result) => {
        const user = JSON.parse(result);
        if (!!user) Actions.chatRoom();
        dispatch({
          type: USER_LOADED_FROM_STORAGE,
          payload: user
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
