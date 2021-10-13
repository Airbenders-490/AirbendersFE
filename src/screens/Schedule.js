import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from "../components/button";

class Schedule extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Schedule!</Text>
            <CustomButton type="submit" buttonColorBackground="#FF7A67">Login</CustomButton>
        </View>
    );
  }
}

export default Schedule;