import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
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
            <Container implementPadding={!this.props.ignorePadding}>
                <Header screenTitle={this.props.screenTitle} implementPadding={!this.props.ignorePadding}>
                    <BackButton isVisible={this.props.isSecondaryScreen} onPress={ () => navigation.goBack() } >
                        <StyledBackIcon source={ BackIcon } />
                    </BackButton>
                    <Title titleColor={theme.COLOR_BLACK}>{this.props.screenTitle}</Title>
                </Header>
                <ScrollView nestedScrollEnabled={true} contentContainerStyle={ this.props.ignorePadding ? {} : { padding: theme.SPACING_MEDIUM }}>
                    {this.props.children}
                </ScrollView>
            </Container>
        );
    }
}

//STYLED-COMPONENTS
const Container = styled.ScrollView`
  /* padding separated as the following to allow unitless values */
  padding-top: ${theme.SPACING_LARGE};
`;

const Header = styled.View`
  margin-horizontal: ${theme.SPACING_MEDIUM};
  display: ${props => props.screenTitle ? 'flex' : 'none'};
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