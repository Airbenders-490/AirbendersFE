import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import SimpleLabel from '../components/SimpleLabels';
import CustomLabel from '../components/Labels';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed!</Text>
            <CustomLabel isReadOnly = {true}>SOEN 490</CustomLabel>
            <SimpleLabel>SOEN 321</SimpleLabel>
        </View>
    );
  }
}

export default Feed;