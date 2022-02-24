import React, { Component } from 'react';
import { View, Image, Switch, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import { Caption, TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import UserIcon from '../assets/images/icons/user_fill.png'

class TeamListItem extends Component {
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
        let participants = [];
        for (let i = 0; i < this.props.numberTotalParticipants; i++) {
            participants.push(
                <ParticipantSpot
                    available={ i < (this.props.numberTotalParticipants - this.props.numberCurrentParticipants) ? true : false }
                    overlap={ i === 0 ? false : true} />
            );
        }

        return (
            <MainContainer
                isTouchable
                isElevated
                backgroundColor={this.props.backgroundColor} >
                <Header>
                    <Subtitle>{this.props.title}</Subtitle>
                    <TeamStatus full={this.props.numberTotalParticipants === this.props.numberCurrentParticipants} />
                </Header>
                <TextBody>{this.props.courseNumber}</TextBody>
                <ParticipantsContainer>
                    <Spots>
                        { participants }
                    </Spots>
                    <Subtitle>{this.props.numberCurrentParticipants}/{this.props.numberTotalParticipants}</Subtitle>
                    <TextBody> participants</TextBody>
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

const TeamStatus = styled.View `
    height: 10;
    width: 10;
    background: ${(props) => props.full ? theme.COLOR_RED : theme.COLOR_GREEN};
    border-radius: 100;
`;

const ParticipantsContainer = styled.View `
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10;
`;

const ParticipantSpot = styled.View `
    height: 25;
    width: 25;
    position: relative;
    margin-left: ${(props) => props.overlap ? '-10' : '0'};
    background: white;
    border-width: 1.5;
    border-radius: 100;
    border-style: ${(props) => props.available ? 'dotted' : 'solid'};
    border-color: ${(props) => props.available ? theme.COLOR_BLACK : theme.COLOR_BLUE};
`;

const Spots = styled.View `
    display: flex;
    flex-direction: row;
    margin-right: ${theme.SPACING_SMALL};
`;

TeamListItem.propTypes = {
    children: PropTypes.element.isRequired,
};

export default TeamListItem;