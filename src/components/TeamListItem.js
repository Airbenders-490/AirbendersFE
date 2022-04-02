import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import { Caption, TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import UserIcon from '../assets/images/icons/user_fill.png'
import YesNoModal from './modals/YesNoModal.js'
import { useCode } from 'react-native-reanimated';

class TeamListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggled: false,
            showModalButton: true,
            userID: ""
        };

        this.onToggle = this.onToggle.bind(this)
        this.handleModalConfirm = this.handleModalConfirm.bind(this)
        this.openModalButton = this.openModalButton.bind(this)
    }

    componentDidMount(){
        AsyncStorage.getItem("userID")
        .then(value => {
          this.setState({ userID: value });
        })
        .done();
    }

    getConfig = (token) => {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    onToggle() {
        this.setState({isToggled: !this.state.isToggled});
    }

    openModalButton = () => {
        return (
            <ModalOpenButton>
                <ModalOpenButtonText>Join</ModalOpenButtonText>
             </ModalOpenButton>
        )
    }

    handleModalConfirm = async () => {
        let token
        let profileExists
        try{
          token = await AsyncStorage.getItem("token")
          profileExists = await AsyncStorage.getItem("profileExists")
        } catch(err) {
          console.log(err)
          // TODO: redirect to login
          return
        }

        if (profileExists === "true") {

            axios.post(`http://real.encs.concordia.ca/chat/api/chat/joinRequest/${this.props.teamID}`,{}, this.getConfig(token))
            .then(res => {
                console.log(res.data)
                this.setState({showModalButton: false})
            })
            .catch(err => {
                console.log(err);
                alert(`Unable to join team due to: ${err.response.data.message}`)
            })
        } else {
            Alert.alert(
                "Create Profile First",
                "You must fill out your profile (name at least) before using the rest of the app! Tap the GEAR icon to edit and hit SAVE at the BOTTOM"
              );
              this.props.navigation.navigate('Profile')
        }
    }

    userAlreadyInRoom = () => {
        for(let i = 0 ; i < this.props.participants.length ; i++) {
            if (this.props.participants[i].id === this.state.userID) {
                return true
            }
        }
        return false
    }

    render() {
        let centeredViewStyle = {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        }

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
                backgroundColor={this.props.backgroundColor}
                marginBottom={5} >
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

                {!this.userAlreadyInRoom() && this.state.showModalButton &&
                    <YesNoModal
                        modalMessage={`Are you sure you want to join ${this.props.title} team?`}
                        handleConfirm={this.handleModalConfirm}
                        openModalButton={this.openModalButton}
                        modalButtonStyle={centeredViewStyle}
                    />
                }
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
    margin-top: 2;
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

const ModalOpenButton = styled.View `
    border-radius: 100;
    padding-vertical: 10;
    padding-horizontal: 10;
    elevation: 2;
    width: 70;
    font-weight: bold;
    font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
    background-color: ${theme.COLOR_GREEN};
`

const ModalOpenButtonText = styled.Text `
    color: white;
    font-weight: bold;
    text-align: center;
    flex-direction: row;
`

TeamListItem.propTypes = {
    children: PropTypes.element.isRequired,
};

export default TeamListItem;