import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './SignUp.styles';

export default class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign up for ShatApp</Text>
      </View>
    );
  }
}
