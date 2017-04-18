// lib/api.js
import 'babel-polyfill'
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import hooks from 'feathers-hooks'
import authentication from 'feathers-authentication/client'
import io from 'socket.io-client'
import localstorage from 'feathers-localstorage'
import { AsyncStorage } from 'react-native'

const API_HOST = 'https://shutup-api.codaisseur.cloud/'

class API {
  constructor() {
    const socket = io(API_HOST, { transports: ['websocket'], forceNew: true })
    this.app = feathers()
      .configure(socketio(socket))
      .configure(hooks())
      .configure(authentication({
        type: 'local',
        storage: AsyncStorage,
      }));
  }

  service(serviceName) {
    return this.app.service(serviceName)
  }

  authenticate(user) {
    if (!user) return this.app.authenticate()

    const { email, password } = user
    console.log(email, password);
    return this.app.authenticate({
      type: 'local',
      storage: AsyncStorage,
      email,
      password,
    });
  }

  signOut() {
    return this.app.logout()
  }
}

export default API
