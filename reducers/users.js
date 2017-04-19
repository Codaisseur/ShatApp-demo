import {
  SUBSCRIBED_TO_USERS_SERVICE,
  USER_CREATED,
  USER_UPDATED,
  USER_REMOVED
} from '../actions/users/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_USERS_SERVICE :
      return ([].concat(payload)).reverse()

    case USER_CREATED :
      const newUser = Object.assign({}, payload)
      return state.concat([newUser])

    case USER_UPDATED :
      return state.map((user) => {
        if (user._id === payload._id) {
          return Object.assign({}, payload)
        }
        return user
      })

    case USER_REMOVED :
      return state.filter((user) => (user._id !== payload._id))

    default :
      return state
  }
}
