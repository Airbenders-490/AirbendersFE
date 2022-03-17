import React, { Component } from 'react';
import { View, Image, Switch, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import { Caption, TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import UserIcon from '../assets/images/icons/user_fill.png'

class GroupListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggled: false
        };

        this.onToggle = this.onToggle.bind(this)
    }

    onToggle() {
        this.setState({isToggled: !this.state.isToggled});
    }

    render() {
        return (
            <MainContainer
                isTouchable
                isElevated
                backgroundColor={this.props.backgroundColor} >
                <Header>
                    <Subtitle>{this.props.classNumber}</Subtitle>
                    <NotificationSwitch
                        trackColor={{ false: '#ffffff50', true: '#00000010' }}
                        thumbColor={this.state.isToggled ? theme.COLOR_GREEN : theme.COLOR_WHITE}
                        ios_backgroundColor={this.props.backgroundColor}
                        onChange={this.onToggle}
                        value={this.state.isToggled}
                    />
                </Header>
                <Title>{this.props.className}</Title>
                {/* Caption can be the professor (if class item) or team name (if team chat item) */}
                <TextBody>{this.props.caption}</TextBody>
                <ParticipantsContainer>
                    <ParticipantIcon source={ UserIcon } />
                    <TextBody>{this.props.numberParticipants} participants</TextBody>
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
    align-items: center;
`

const NotificationSwitch = styled.Switch `
    /* In order to remove switch padding from Android only */ 
    margin-vertical: ${Platform.OS === 'ios' ? 0 : -13};
    margin-horizontal: ${Platform.OS === 'ios' ? 0 : -10};
    padding-top: 0;
    min-width: 0;
    min-height: 0;
`;

const ParticipantsContainer = styled.View `
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10;
`;

const ParticipantIcon = styled.Image `
    height: 20;
    width: 20;
    margin-right: 5;
`;

GroupListItem.propTypes = {
    // children: PropTypes.element.isRequired,
};

export default GroupListItem;