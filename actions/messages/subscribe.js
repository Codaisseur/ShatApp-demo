// actions/messages/subscribe.js
import API from '../../lib/api'
import { history } from '../../store'
import { CALL_API, FIND } from '../../middleware/api'

export const SUBSCRIBED_TO_MESSAGES_SERVICE = 'SUBSCRIBED_TO_MESSAGES_SERVICE'
export const MESSAGE_CREATED = 'MESSAGE_CREATED'
export const MESSAGE_UPDATED = 'MESSAGE_UPDATED'
export const MESSAGE_REMOVED = 'MESSAGE_REMOVED'

const api = new API()
const messages = api.service('messages')

const createdMessage = (message) => {
  return {
    type: MESSAGE_CREATED,
    payload: message
  }
}

const updatedMessage = (message) => {
  return {
    type: MESSAGE_UPDATED,
    payload: message
  }
}

const removedMessage = (message) => {
  return {
    type: MESSAGE_REMOVED,
    payload: message
  }
}

export const loadMessages = () => {
  return {
    [CALL_API]: {
      service: 'messages',
      method: FIND,
      type: SUBSCRIBED_TO_MESSAGES_SERVICE,
      authenticate: true,
      params: {
        query: {
          '$sort': { createdAt: -1},
          '$limit': 25,
        },
      },
    }
  }
}

export default () => {
  return (dispatch) => {
    api.authenticate()
      .then(() => {
        messages.on('created', (message) => { dispatch(createdMessage(message)) })
        messages.on('updated', (message) => { dispatch(updatedMessage(message)) })
        messages.on('patched', (message) => { dispatch(updatedMessage(message)) })
        messages.on('removed', (message) => { dispatch(removedMessage(message)) })
      })

    dispatch(loadMessages())
  }
}
