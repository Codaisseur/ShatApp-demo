// models/User.js

// See: https://github.com/gcanti/tcomb-form-native
import t from 'tcomb-form-native';

const User = t.struct({
  email: t.String,
  password: t.String,
});

export const formOptions = {
  fields: {
    email: {
      keyboardType: 'email-address',
      autoCapitalize: 'none',
    },
    password: {
      secureTextEntry: true,
    }
  }
}

export default User;
