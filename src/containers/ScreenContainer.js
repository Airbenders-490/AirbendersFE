import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import { Title } from '../containers/TextContainer.js';
import BackIcon from '../assets/images/icons/left-arrow.png';

class ScreenContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;

        return (
            <Container>
                <Header>
                    <BackButton isVisible={this.props.isSecondaryScreen} onPress={ () => navigation.goBack() } >
                        <StyledBackIcon source={ BackIcon } />
                    </BackButton>
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
`;

const Header = styled.View`
  margin-bottom: ${theme.SPACING_MEDIUM};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity `
    margin-right: 15;
    display: ${props => props.isVisible ? 'flex' : 'none'}
`;

const StyledBackIcon = styled.Image `
    tint-color: ${theme.COLOR_BLACK};
    height: 30;
    width: 30;
`;

ScreenContainer.propTypes = {
    screenTitle: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

// Wrap and export
export default function(props) {
    const navigation = useNavigation();
  
    return <ScreenContainer {...props} navigation={navigation} />;
}