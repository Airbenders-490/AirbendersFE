import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';
import theme from '../../styles/theme.style.js';
import MainContainer from '../../containers/MainContainer.js';
import { Title, Subtitle, TextBody, Caption } from '../../containers/TextContainer';
import UserData from '../../data/mock/UserProfile.json';
import MagnifyingIcon from '../../assets/images/icons/magnifying.png';
import ToggleButton from '../ToggleButton.js';
import { PanGestureHandler, TextInput } from 'react-native-gesture-handler';
import TextInputContainer from '../../containers/TextInputContainer.js';
import SaveButton from '../SaveButton.js';
import Collapse from '../Collapse.js';
import Label from '../Label.js';
import StarIcon from '../../assets/images/icons/star-icon.png';
import UserIcon from '../../assets/images/icons/user_fill.png';
import axios from 'axios';





class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            domain: "",
            jdata: [],
        }
        this.handleSaveButton=this.handleSaveButton.bind(this);    
        this.toggleExpansion = this.toggleExpansion.bind(this);
        this.refreshScreen = this.refreshScreen.bind(this);
        this.onSettingsSave = this.onSettingsSave.bind(this);
    }

    payload = {
        email: this.email,
    } 


    // Write functionss
    toggleExpansion() {
        this.setState({ expanded: !this.state.expanded })
        console.log(this.state.expanded)
    }

    

    handleSaveButton() {
        let requestConfig = {
            email: this.payload.email.substr(this.payload.email.indexOf('@') + 1),
            config: {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiZWxsbyIsImxhc3RfbmFtZSI6Im1hdGUiLCJleHAiOjE2Mzk2MTEyMzAsImlzcyI6IjkzYTlmOTJjLWI4YmMtNGU4Ni05Njk5LTNjM2RhN2I3ZGI5MSJ9.1h6MbYRu4sbZaJX2Ypyt4bsbUJMN22A70pCRNXmKO4Y'
                }
            }
            
        }

        console.log(requestConfig.email)

        axios
            .get(`http://real.encs.concordia.ca/profile/api/school?domain=${requestConfig.email}`, requestConfig.config)  ///Change the domain to the extracted variable
            .then(          
                response => {
                    const newResult = response.data.map(d => ({
                        country: d.country,
                        name: d.name,
                    }))

                    var s = JSON.stringify(newResult);
                    alert(s.substring(2,s.length-2));
                    //alert(JSON.stringify(newResult).replace(/]|[[]/g, ''));
                }
            )
            .catch(
<<<<<<< HEAD
                // TODO: On 404, block all access to app until register is complete
                error => console.log(error.response.data.code)
            )
    }

    refreshScreen() {
        this.setState({ lastRefresh: Date(Date.now()).toString() });
    }


    onSettingsSave() {
        console.log(this.payload);
        let updatedUser = {
            "id": this.payload.studentID,
            "first_name": this.payload.fullName.substr(0,this.payload.fullName.indexOf(' ')),
            "last_name": this.payload.fullName.substr(this.payload.fullName.indexOf(' ') + 1),
            "email": this.props.userPersonalEmail,
            "general_info": this.payload.generalInfo,
        }

        if (this.props.isFromRegister) {
            axios
                .post('http://34.125.37.12:8080/api/student', updatedUser, config)
                .then(
                    response => {
                        console.log(response.data);
                        if (this.props.additionalRegisterFuncOnSave) {
                            this.props.additionalRegisterFuncOnSave();
                        }
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        } else {
            axios
                .put(`http://34.125.37.12:8080/api/student/${this.props.userID}`, updatedUser, config)
                .then(
                    response => {
                        console.log(response.data);
                        this.setState({ currentUserData: response.data });
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        }

        if (this.props.additionalFuncOnSave) {
            this.props.additionalFuncOnSave();
        }
    }
=======
                error => {
                    console.log(error)
                }
            )         
    }


>>>>>>> c54d8975517cb6d2c205f225dfe0fc11c71f9ac9

    render() {
        let classesTaken = UserData[12345].classes.map((data) => {
            return (
                <TouchableOpacity disabled={this.props.isReadOnly}>
                    <ClassLabel>{data.classID}</ClassLabel>
                </TouchableOpacity>
            )
        });

        let userPersonalSkills = UserData[12345].skills.map((data) => {
            return (
                <TouchableOpacity disabled={this.props.isReadOnly}>
                    <SkillLabel>{data}</SkillLabel>
                </TouchableOpacity>
            )
        });

        let ratedQualities = UserData[12345].qualities.map((data) => {
            return (
                <Label labelColor={theme.COLOR_PURPLE} isReadOnly>
                    {data.quality}
                </Label>
            )
        });

        return (
            <View isReadOnly={this.props.isReadOnly} >
                <UserProfileImage />
                <UserName
                    editable={!this.props.isReadOnly}
                    placeholder="Your Name"
                    placeholderTextColor={"#D8D8D8"}
                    onChangeText={(text) => this.payload.fullName = text}>
                    {this.state.currentUserData.first_name} {this.state.currentUserData.last_name}
                </UserName>
                <ProgramName
                    editable={!this.props.isReadOnly}
                    placeholder="Your Program"
                    placeholderTextColor={"#D8D8D8"}>
                    {UserData[12345].program}
                </ProgramName>
                <StudentID
                    isDisplayed={this.props.isCurrentUser}
                    editable={!this.props.isReadOnly}
                    placeholder="Your Student ID"
                    placeholderTextColor={"#D8D8D8"}
                    onChangeText={(text) => this.payload.studentID = text}>
                    {this.state.currentUserData.student_id}
                </StudentID>
                <UserDescription
                    editable={!this.props.isReadOnly}
                    placeholder="Tell us about yourself"
                    placeholderTextColor={"#D8D8D8"}
                    multiline={true}
                    onChangeText={(text) => this.payload.generalInfo = text}>
                    {this.state.currentUserData.general_info}
                </UserDescription>

                <PersonalProfile isDisplayed={!this.props.isFromRegister}>
                {/* Rated Qualities */}
                    <MainContainer marginTop={15}>
                        <SectionHeader>
                            <SectionTitle>Rated Qualities</SectionTitle>
                            {/* TODO: Disable endorsements in settings mode */}
                            <Collapse isCurrentlyTeammate={this.props.isReadOnly} onPress={this.toggleExpansion} />
                        </SectionHeader>
                        <LabelContainer>
                            {ratedQualities}
                        </LabelContainer>
                        <ToggableContainer isDisplayed={this.state.expanded}>
                            <Separator isDisplayed={this.props.isReadOnly} />
                            <LabelContainer>
                                <Label labelColor={theme.COLOR_ORANGE} labelIcon={StarIcon}>Integrity</Label>
                                <Label labelColor={theme.COLOR_ORANGE} labelIcon={StarIcon}>Communication</Label>
                            </LabelContainer>
                            <SaveButton onPress={this.toggleExpansion} />
                        </ToggableContainer>
                    </MainContainer>

                    <MainContainer marginTop={15}>
                        <SectionHeader>
                            <SectionTitle>Classes Taken</SectionTitle>
                            <SearchIcon source={MagnifyingIcon} />
                        </SectionHeader>
                        <LabelContainer>
                            {classesTaken}
                        </LabelContainer>
                    </MainContainer>
                </PersonalProfile>

                <MainContainer marginTop={15}>
                    <SectionTitle>Self-Promoted Skills</SectionTitle>
                    <LabelContainer>
                        {userPersonalSkills}
                    </LabelContainer>
                </MainContainer>

                <Separator isDisplayed={!this.props.isReadOnly} />

                <ToggableContainer isDisplayed={!this.props.isReadOnly} >
                    <SettingsContainer marginBottom={theme.BOTTOM_SCROLLVIEW_SPACING}>
                        <Subtitle>Settings</Subtitle>
                        <ToggleButton labelName='Team chats'></ToggleButton>
                        <ToggleButton labelName='DMs'></ToggleButton>
                        <ToggleButton labelName='Schedule'></ToggleButton>
                        {/* TODO: If confirmed, placeholder will be student's university email */}
                        <TextInputContainer onChangeText={(text) => this.payload.email = text} isConfirmed={false} labelName='School email' placeholder='johndoe@concordia.com'></TextInputContainer>
                        <SaveButton onPress={this.handleSaveButton}/>
                    </SettingsContainer>
                </ToggableContainer>
            </View>
        );
    }

    
}

// STYLED-COMPONENTS
const PersonalProfile = styled.View `
    display: ${props => props.isDisplayed ? 'flex' : 'none'};
`;

const UserProfileImage = styled.View`
    height: 80;
    width: 80;
    border-radius: 40;
    align-self: center;
    background: ${theme.COLOR_GREEN};
    margin-bottom: 10;
`;

const UserName = styled.TextInput`
    text-transform: capitalize;
    font-size: ${theme.FONT_SIZE_LARGE};
    color: ${theme.COLOR_BLACK}};
    font-family: ${theme.FONT_BOLD};
    border-radius: 5;
    background: ${props => props.editable ? '#e8e8e8' : 'transparent'};
    padding-vertical: ${props => props.editable ? 2 : 0};
    padding-horizontal: ${props => props.editable ? 10 : 0};
    align-self: center;
`;

const ProgramName = styled.TextInput`
    color: ${theme.COLOR_GRAY};
    font-size: ${theme.FONT_SIZE_SLIGHT_LARGE};
    font-family: ${theme.FONT_REGULAR};
    border-radius: 5;
    background: ${props => props.editable ? '#e8e8e8' : 'transparent'};
    padding-vertical: ${props => props.editable ? 1 : 0};
    padding-horizontal: ${props => props.editable ? 5 : 0};
    margin-top: ${props => props.editable ? 3 : 0};
    align-self: center;
`;

const StudentID = styled(ProgramName) `
    margin-top: ${props => props.editable ? 3 : 0};
    text-align:center;
    display: ${props => props.isDisplayed ? 'flex' : 'none'};
`;

const UserDescription = styled.TextInput`
    color:${theme.COLOR_BLACK}};
    font-size: ${theme.FONT_SIZE_MEDIUM};
    font-family: ${theme.FONT_REGULAR};
    border-radius: 5;
    background: ${props => props.editable ? '#e8e8e8' : 'transparent'};
    padding-vertical: ${props => props.editable ? 5 : 0};
    padding-horizontal: ${props => props.editable ? 5 : 0};
    margin-top: ${props => props.editable ? 3 : 0};
    text-align:center;
`;

const SectionTitle = styled.Text`
    color: ${theme.COLOR_GRAY};
    font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
    font-family: ${theme.FONT_SEMIBOLD};
    letter-spacing: ${theme.LETTER_SPACING_LARGE};
    text-transform: uppercase;
    margin-bottom: 5;
`;

const SearchIcon = styled.Image`
  width: 15;
  height: 15;
  tint-color: ${theme.COLOR_GRAY};
`;

const SectionHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ClassLabel = styled.Text`
    font-size: ${theme.FONT_SIZE_MEDIUM};
    font-family: ${theme.FONT_REGULAR};
    margin-right: 15;
    text-transform: uppercase;
`;

const SkillLabel = styled.Text`
    font-size: ${theme.FONT_SIZE_MEDIUM};
    font-family: ${theme.FONT_REGULAR};
    margin-right: 15;
    text-transform: capitalize;
`;

const LabelContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Separator = styled.View`
  height: 1;
  background-color: ${theme.COLOR_GRAY};
  width: 100;
  align-self: center;
  margin-vertical: 20;
  display: ${props => props.isDisplayed ? 'flex' : 'none'}
`;

const SettingsContainer = styled(MainContainer)`
  display: ${props => props.isDisplayed ? 'flex' : 'none'}
  `;

const ToggableContainer = styled.View`
  display: ${props => props.isDisplayed ? 'flex' : 'none'}
`;

export default UserProfile;
