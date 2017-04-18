import {
  SUBSCRIBED_TO_MESSAGES_SERVICE,
  MESSAGE_CREATED,
  MESSAGE_UPDATED,
  MESSAGE_REMOVED
} from '../actions/messages/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_MESSAGES_SERVICE :
      return ([].concat(payload)).reverse()

    case MESSAGE_CREATED :
      const newMessage = Object.assign({}, payload)
      return state.concat([newMessage])

    case MESSAGE_UPDATED :
      return state.map((message) => {
        if (message._id === payload._id) {
          return Object.assign({}, payload)
        }
        return message
      })

    case MESSAGE_REMOVED :
      return state.filter((message) => (message._id !== payload._id))

    default :
      return state
  }
}
