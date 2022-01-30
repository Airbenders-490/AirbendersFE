import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import theme from '../styles/theme.style.js';

import ScreenContainer from '../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../containers/TextContainer.js';
import MainContainer from '../containers/MainContainer.js';
import MessageInput from '../components/MessageInput.js';

class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wso: null
    }
    this.onSendMessage = this.onSendMessage.bind(this);
    this.connectOnLoad = this.connectOnLoad.bind(this);
  }

  // static ws = new WebSocket('ws://real.encs.concordia.ca/chat/chat/1');
  
  componentDidMount() {
    this.connectOnLoad();
  }

  connectOnLoad() {
    var ws = new WebSocket('ws://real.encs.concordia.ca/chat/chat/1');
    this.setState({wso: ws})
    ws.onmessage = (e) => {
      // a message was received
      console.log(e.data);
    };
    ws.onclose = () => {
      console.log('disconnected');
      this.connectOnLoad();
  };
  }

  onSendMessage(m) {
    this.state.wso.send(m)
    // ws.send(m)
  }


  render() {
    return (
      <ScreenContainer screenTitle='Classes'>
        <TextBody bodyColor={theme.COLOR_BLACK}>Classes!</TextBody>
        <MessageInput onPress={this.onSendMessage}></MessageInput>
      </ScreenContainer>
    );
  }
}

export default Classes;
