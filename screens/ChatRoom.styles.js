// screens/ChatRoom.styles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  error: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 30,
    color: '#FF0000'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  buttonPrimary: {
    height: 36,
    backgroundColor: '#FF4081',
    borderColor: '#FF4081',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonSecondary: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  message: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: 'black',
  },
  text: {
    fontSize: 20,
    alignSelf: 'flex-start',
    color: 'black',
  },
  avatar: {
    height: 50,
    width: 50,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
});
