import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import StarIcon from '../assets/images/icons/star-icon.png';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../styles/theme.style.js';
import CustomLabel from '../components/Label';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Messages!</Text>
            <CustomLabel isReadOnly={false} labelColor={theme.COLOR_ORANGE} labelIcon={StarIcon}>SOEN 490</CustomLabel>
        </View>
    );
  }
}

export default Messages;