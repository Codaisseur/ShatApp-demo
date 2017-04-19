// models/ChatMessage.js

// See: https://github.com/gcanti/tcomb-form-native
import t from 'tcomb-form-native';

const ChatMessage = t.struct({
  text: t.String,
});

export const formOptions = {
  auto: 'placeholders',
  fields: {
    text: {
      multiline: true,
      placeholder: 'Message your friends',
    },
  }
}

export default ChatMessage;
