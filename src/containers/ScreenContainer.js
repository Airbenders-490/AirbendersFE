import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import { Title } from '../containers/TextContainer.js';

class ScreenContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Title titleColor={theme.COLOR_BLACK}>{this.props.screenTitle}</Title>
                </Header>
                <View>
                    {this.props.children}
                </View>
            </Container>
        );
    }
}

//STYLED-COMPONENTS
const Container = styled.View`
  /* padding separated as the following to allow unitless values */
  padding-horizontal: ${theme.SPACING_MEDIUM};
  padding-top: ${theme.SPACING_LARGE};
  padding-bottom: ${theme.SPACING_MEDIUM};
`

const Header = styled.View`
  margin-bottom: ${theme.SPACING_MEDIUM};
`

ScreenContainer.propTypes = {
    screenTitle: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

export default ScreenContainer;