// screens/ChatRoom.js

import React, { Component } from 'react';
import ReactNative, {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// See: https://github.com/gcanti/tcomb-form-native
import t from 'tcomb-form-native';
import ChatMessage, { formOptions } from '../models/ChatMessage';
import loadUser from '../actions/users/load';
import subscribeToMessages from '../actions/messages/subscribe';
import subscribeToUsers from '../actions/users/subscribe';
import postMessage from '../actions/messages/post';
import styles from './ChatRoom.styles';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderMessage = this.renderMessage.bind(this);

    this.state = { message: null, textFieldHeight: 36 };
  }

  componentWillMount() {
    this.props.loadUser();
    this.props.subscribeToMessages();
    this.props.subscribeToUsers();
  }

  clearForm() {
    this.setState({ message: null });
    this.refs.form.getComponent('text').refs.input.blur();
    this.setState({ textFieldHeight: 36 });
  }

  onChange(message) {
    this.setState({ message })
  }

  onContentSizeChange(event) {
    const textFieldHeight = Math.max(35, event.nativeEvent.contentSize.height);
    this.setState({ textFieldHeight })
  }

  onSubmit() {
    const { form } = this.refs;
    const newMessage = form.getValue();
    this.props.postMessage(newMessage.text);
    this.clearForm();
  }

  renderMessage(message, index) {
    const { users } = this.props
    const author = users.filter((u) => (u._id === message.authorId))[0];
    console.log(author)

    return (
      <View ref={`msg${index}`} key={index} style={styles.message}>
        <Image
          style={styles.avatar}
          source={{uri: (author && author.gravatar) || 'https://unsplash.it/50/50' }} />
        <View>
          <Text style={styles.author}>{message.author}</Text>
          <Text style={styles.text}>{message.text}</Text>
        </View>
      </View>
    );
  }

  render() {
    const Form = t.form.Form;
    let normal = { ...Form.stylesheet.textbox.normal };
    normal.height = this.state.textFieldHeight;
    const formStyles = Object.assign({},
      {...Form.stylesheet.textbox },
      { normal });
    console.log(formStyles)

    let messageFormOptions = { ...formOptions };
    messageFormOptions.fields.text.onContentSizeChange = this.onContentSizeChange.bind(this);
    messageFormOptions.fields.text.stylesheet = { ...Form.stylesheet, textbox: { ...formStyles } };

    console.log(messageFormOptions)

    const { user, loading, messages } = this.props;

    return (
      <View style={styles.outerContainer}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}>
          <Text style={styles.title}>Chat Room</Text>
          { user && user.error ? <Text style={styles.error}>{user.error.name} { user.error.message }</Text> : null }

          <ScrollView
            ref = { (ref) => { this.scrollView = ref } }
            onContentSizeChange = { (contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({
                animated: true
              })}} >
            { messages.map(this.renderMessage)}
          </ScrollView>

          <View>
            <Form
              ref="form"
              type={ChatMessage}
              options={messageFormOptions}
              value={this.state.message}
              onChange={this.onChange} />

            <TouchableHighlight
              disabled={loading}
              style={styles.buttonPrimary}
              onPress={this.onSubmit}
              underlayColor='#99d9f4'
            >
              <Text style={styles.buttonText}>Post</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = ({ user, loading, messages, users }) => ({ user, loading, messages, users });

export default connect(mapStateToProps, { loadUser, postMessage, subscribeToMessages, subscribeToUsers })(ChatRoom);
