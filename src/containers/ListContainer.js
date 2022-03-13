import React, { Component } from 'react';
import { View, Image, Switch, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import MainContainer from './MainContainer.js';
import { Caption, TextBody, Title, Subtitle } from './TextContainer.js';
import UserIcon from '../assets/images/icons/user_fill.png'
import { Pressable } from 'react-native';
import MagnifyingIcon from '../assets/images/icons/magnifying.png';
import Selection from '../assets/images/icons/selection.png';
import Sort from '../assets/images/icons/sort.png';

class ListContainer extends Component {
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
                backgroundColor='#E3E3E3' 
                >
               <HeaderIcon>
                <Header>
                <Icon source={MagnifyingIcon} />
                <IconFilter source={Sort} />
                </Header>
                <Header>
                <Icon source={Selection} />
                </Header>
                </HeaderIcon>
              
        <Pressable>
            <MainContainer>
              <Subtitle>John Smith</Subtitle>
            </MainContainer>
        </Pressable>
      
            </MainContainer>
        );
    }
}

//STYLED-COMPONENTS


const Icon = styled.Image`
  width: 15;
  height: 15;
  tint-color: ${theme.COLOR_GRAY};
`;

const IconFilter = styled.Image`
margin-left: 20;
  width: 15;
  height: 15;
  tint-color: ${theme.COLOR_GRAY};
`;


const HeaderIcon = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom:15;
`;
const Header = styled.View`
    display: flex;
    flex-direction: row;
   
`;
const Header2 = styled.View`
    display: flex;
    flex-direction: row;
`;




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

ListContainer.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ListContainer;