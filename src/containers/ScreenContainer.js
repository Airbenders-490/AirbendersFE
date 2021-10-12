import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";
import styled from 'styled-components';

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
const Container = styled.View `
  /* padding separated as the following to allow unitless values */
  padding-horizontal: 20;
  padding-top: 50;
  padding-bottom: 20;
  background: red;
`

const Header = styled.View `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
`

const Title = styled.Text `
    font-size: 24;
    color: black;
    text-transform: uppercase;
    letter-spacing: 0.2;
    font-weight: 500;
`

const Content = styled.View `
`

ScreenContainer.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

export default ScreenContainer;