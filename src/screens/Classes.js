import React, { Component, } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import GeneralButton from "../components/button";

class Classes extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Classes!</Text>
            <GeneralButton type="submit" buttonValue="Login">   
                    </GeneralButton>
        </View>
    );
  }
}

export default Classes;