import React, { Component, } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';

class Classes extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Classes!</Text>
        </View>
    );
  }
}

export default Classes;