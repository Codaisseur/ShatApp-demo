import { CALL_API, CREATE } from '../../middleware/api'

export default (messageText) => {
  return {
    [CALL_API]: {
      service: 'messages',
      method: CREATE,
      type: 'MESSAGE_POSTED',
      authenticate: true,
      params: { text: messageText }
    }
  }
}
