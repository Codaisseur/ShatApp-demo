import {
  API_LOADING,
  API_READY,
  API_ERROR,
} from '../middleware/api'

export default (state = false, { type, payload }) => {
  switch(type) {
    case API_LOADING :
      return true

    case API_READY :
    case API_ERROR :
      return false

    default :
      return state
  }
}
