import React, { Component } from 'react';
import { View, Image, Switch } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import { Caption, TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import UserIcon from '../assets/images/icons/user_fill.png'

class ClassListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            test: false
        };

        this.onToggle = this.onToggle.bind(this)
    }

    onToggle() {
        this.setState({test: !this.state.test});
    }

    render() {
        return (
            <MainContainer
                isTouchable
                isElevated
                backgroundColor={this.props.backgroundColor} >
                <Header>
                    <Subtitle>{this.props.classNumber}</Subtitle>
                    <Switch
                        trackColor={{ false: this.props.backgroundColor, true: theme.COLOR_WHITE }}
                        thumbColor={this.state.test ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor={this.props.backgroundColor}
                        onChange={this.onToggle}
                        value={this.state.test}
                    />
                </Header>
                <Title>{this.props.className}</Title>
                <Caption>Professor {this.props.professor}</Caption>
                <ParticipantsContainer>
                    <ParticipantIcon source={ UserIcon } />
                    <Caption>{this.props.numberParticipants} participants</Caption>
                </ParticipantsContainer>
            </MainContainer>
        );
    }
}

//STYLED-COMPONENTS
const Header = styled.View `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const ParticipantsContainer = styled.View `
    display: flex;
    flex-direction: row;
    align-items: baseline;
`;

const ParticipantIcon = styled.Image `
    height: 20;
    width: 20;
`;

ClassListItem.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ClassListItem;