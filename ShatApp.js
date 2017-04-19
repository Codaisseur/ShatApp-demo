import React, { Component } from 'react';
import { AppState, View } from 'react-native';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import store from './store';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ChatRoom from './screens/ChatRoom';
import styles from './ShatApp.styles';
import { loadMessages } from './actions/messages/subscribe';

export default class ShatApp extends Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState, this.state)
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      store.dispatch(loadMessages());
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="signIn" component={SignIn} title="Sign In" initial={true} />
            <Scene key="signUp" component={SignUp} title="Sign Up" />
            <Scene key="chatRoom" component={ChatRoom} title="Shat App!" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
