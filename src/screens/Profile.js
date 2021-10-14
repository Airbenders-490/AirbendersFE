import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../styles/theme.style.js';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
        </View>
    );
  }
}

export default Profile;