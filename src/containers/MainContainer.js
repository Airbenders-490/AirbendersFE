import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container
                isElevated={this.props.isElevated}
                backgroundColor={this.props.backgroundColor}
                marginTop={this.props.marginTop}
                marginBottom={this.props.marginBottom}>
                {this.props.children}
            </Container>
        );
    }
}

//STYLED-COMPONENTS
const Container = styled.View`
    /* padding separated as the following to allow unitless values */
    padding-horizontal: ${theme.SPACING_SLIGHT_MEDIUM};
    padding-vertical: ${theme.SPACING_SLIGHT_MEDIUM};
    margin-top: ${props => props.marginTop ? props.marginTop : 0}
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}
    border-radius: ${theme.SPACING_SMALL};
    background: ${props => props.backgroundColor ? props.backgroundColor : '#fff'};
    elevation: ${props => props.isElevated ? theme.CARD_ELEVATION : 0};

    /* iOS Shadows */
    shadowColor: ${props => props.backgroundColor ? props.backgroundColor : '#555'};
    shadowOpacity: ${props => props.backgroundColor ? '0.4' : '0.1'};
    shadowRadius: 10;
`;

MainContainer.propTypes = {
    children: PropTypes.element.isRequired,
};

export default MainContainer;