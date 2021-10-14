import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";
import styled from 'styled-components';
import theme from '../styles/theme.style.js'

class ScreenContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Title>{this.props.title}</Title>
                </Header>
                <Content>
                    {this.props.children}
                </Content>
            </Container>
        );
    }
}

//STYLED-COMPONENTS
const Container = styled.View`
  /* padding separated as the following to allow unitless values */
  padding-horizontal: ${theme.SPACING_MEDIUM};
  padding-top: 50;
  padding-bottom: ${theme.SPACING_MEDIUM};
`

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.Text`
    font-size: ${theme.FONT_SIZE_LARGE};
    color: black;
    text-transform: uppercase;
    letter-spacing: ${theme.LETTER_SPACING_LARGE};
    font-family: ${theme.FONT_BOLD};
`

const Content = styled.View`
    margin-top: ${theme.SPACING_MEDIUM};
`

ScreenContainer.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

export default ScreenContainer;