// src/actions/users/subscribe.js
import API from '../../lib/api'
import { history } from '../../store'
import { CALL_API, FIND } from '../../middleware/api'

export const SUBSCRIBED_TO_USERS_SERVICE = 'SUBSCRIBED_TO_USERS_SERVICE'
export const USER_CREATED = 'USER_CREATED'
export const USER_UPDATED = 'USER_UPDATED'
export const USER_REMOVED = 'USER_REMOVED'

const api = new API()
const users = api.service('users')

export default () => {
  return (dispatch) => {
    api.authenticate()
      .then(() => {
        users.on('created', (user) => { dispatch(createdMessage(user)) })
        users.on('updated', (user) => { dispatch(updatedMessage(user)) })
        users.on('patched', (user) => { dispatch(updatedMessage(user)) })
        users.on('removed', (user) => { dispatch(removedMessage(user)) })
      });

    dispatch({
      [CALL_API]: {
        service: 'users',
        method: FIND,
        type: SUBSCRIBED_TO_USERS_SERVICE,
        authenticate: true,
        params: {
          query: {
            $sort: { createdAt: -1},
            $limit: 25,
          },
        },
      }
    })
  }
}

const createdMessage = (user) => {
  return {
    type: USER_CREATED,
    payload: user
  }
}

const updatedMessage = (user) => {
  return {
    type: USER_UPDATED,
    payload: user
  }
}

const removedMessage = (user) => {
  return {
    type: USER_REMOVED,
    payload: user
  }
}
