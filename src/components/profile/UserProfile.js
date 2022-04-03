import React, { Component } from 'react';
import { LogBox } from "react-native"
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, Alert } from 'react-native';
import theme from '../../styles/theme.style.js';
import MainContainer from '../../containers/MainContainer.js';
import { Title, Subtitle, TextBody, Caption } from '../../containers/TextContainer';
import UserData from '../../data/mock/UserProfile.json';
import MagnifyingIcon from '../../assets/images/icons/magnifying.png';
import ToggleButton from '../ToggleButton.js';
import { TextInput } from 'react-native-gesture-handler';
import TextInputContainer from '../../containers/TextInputContainer.js';
import SaveButton from '../SaveButton.js';
import Collapse from '../Collapse.js';
import Label from '../Label.js';
import StarIcon from '../../assets/images/icons/star-icon.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
// import ToggleSwitch from 'toggle-switch-react-native'
import Emoji from '../Emoji.js';
import AddClassesTakenModal from '../AddClassesTakenModal.js';
import RemoveClassesTakenModal from '../RemoveClassesTakenModal.js';
import AddCurrentClassModal from '../AddCurrentClassModal.js';
import RemoveCurrentClassModal from '../RemoveCurrentClassModal.js';
import CompleteClassModal from '../CompleteClassModal.js';

LogBox.ignoreAllLogs();

// for testing w/out login
let config = {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiU3RlbGxhIiwibGFzdF9uYW1lIjoiTmd1eWVuIiwiZXhwIjoxNjM3ODg2OTkyLCJpc3MiOiIwZWE1MmFhZi1jMmRiLTRkZTctYjAxNC03N2MxZDI2YjVlZWEifQ.JoLJUdi6rLAAhyDXbaUWoGvS_W1x2PyrdDjksjoL_I4'
    }
}

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            currentUserData: {
                reviews: []
            },
            lastRefresh: Date(Date.now()).toString(),
            userID: '',
            token: '',
            emailIsValid: true,
            emailErrorMessage: ''
        }

        this.toggleExpansion = this.toggleExpansion.bind(this);
        this.refreshScreen = this.refreshScreen.bind(this);
        this.onSettingsSave = this.onSettingsSave.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getConfig = this.getConfig.bind(this);
        this.getData = this.getData.bind(this);
        this.validateEmailAndSendToken = this.validateEmailAndSendToken.bind(this);
        this.ShowEmailSentMessage = this.ShowEmailSentMessage.bind(this);
    }

    payload = {
        fullName: this.fullName,
        studentID: this.studentID,
        email: this.email,
        generalInfo: this.generalInfo,
    }

    getConfig = (token) => {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    getData = async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch (e) {
            // error reading value
            return e;
        }
    }

    updatePayload() {
        this.payload.fullName = this.state.currentUserData.first_name + " " + this.state.currentUserData.last_name;
        this.payload.email = this.state.currentUserData.email;
        this.payload.generalInfo = this.state.currentUserData.general_info;
    }


    // Write functions
    toggleExpansion() {
        this.setState({ expanded: !this.state.expanded })
        console.log(this.state.expanded)
    }

    async getCurrentUser() {
        let user;
        if (this.props.isCurrentUser) {
            user = await this.getData("userID")
        } else {
            console.log("here!!")
            user = this.props.userID
        }
        
        this.setState({
            userID: user,
            token: await this.getData("token")
        })
        axios
            .get(`http://${global.profileAPI}/api/student/${this.state.userID}`, this.getConfig(this.state.token))
            // .get(`http://real.encs.concordia.ca/profile/api/student/${this.state.userID}`, this.getConfig(this.state.token))
            // .get(`http://real.encs.concordia.ca/profile/api/student/${userID}`, config) // for testing w/out login
            .then(
                response => {
                    console.log(response.data);
                    this.setState({ currentUserData: response.data });
                    this.updatePayload();
                    console.log(this.state.currentUserData)
                    if (this.props.updateTitle) {
                        this.props.updateTitle(this.state.currentUserData.first_name + " " + this.state.currentUserData.last_name)
                    }
                }
            )
            .catch(
                // TODO: On 404, block all access to app until register is complete
                error => {
                    console.log("User Profile does not exist",error)
                    AsyncStorage.setItem("profileExists", "false")
                    .then(()=> console.log("profile does not exist!"))
                    .catch(err => console.log("error saving profileExists",err))
                    Alert.alert(
                        "Create Profile First",
                        "You must fill out your profile (name at least) before using the rest of the app! Tap the GEAR icon to edit and hit SAVE at the BOTTOM"
                      );
                }
            )
    }

    // only called on FIRST render
    componentDidMount() {
        this.getCurrentUser();
    }


    refreshScreen() {
        this.setState({ lastRefresh: Date(Date.now()).toString() });
    }

    async onSettingsSave() {
        let token = await AsyncStorage.getItem("token")
        let userID = await AsyncStorage.getItem("userID")
        let email = await AsyncStorage.getItem("email")
        let profileExists = await AsyncStorage.getItem("profileExists")

        let updatedUser = {
            "id": this.payload.studentID,
            "first_name": this.payload.fullName.split(' ').slice(0, -1).join(' '),
            "last_name": this.payload.fullName.split(' ').slice(-1).join(' '),
            "email": this.payload.email,
            "general_info": this.payload.generalInfo,
        }

        if (this.props.isFromRegister || (profileExists === "false")) {
            let newUser = {
                "id": userID,
                "first_name": this.payload.fullName.split(' ').slice(0, -1).join(' '),
                "last_name": this.payload.fullName.split(' ').slice(-1).join(' '),
                "email": email,
                "general_info": this.payload.generalInfo ? this.payload.generalInfo : "",
            }

            axios
                .post('http://real.encs.concordia.ca/profile/api/student', newUser, this.getConfig(token))
                .then(
                    response => {
                        console.log(response.data);
                        AsyncStorage.setItem("profileExists", "true")
                        .then(()=> console.log("profile exists!"))
                        .catch(err => console.log("error saving profileExists",err))
                        Alert.alert("Profile Created!")
                        this.getCurrentUser()
                        if (this.props.additionalRegisterFuncOnSave) {
                            this.props.additionalRegisterFuncOnSave();
                        }
                    }
                )
                .catch( error => {
                        console.log(error)
                        console.log(error.message)
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        console.log(error.config)
                    }
                )
        } else {
            axios
                .put(`http://real.encs.concordia.ca/profile/api/student/${this.state.userID}`, updatedUser, this.getConfig(this.state.token))
                .then(
                    response => {
                        console.log(response.data);
                        // calling getCurrentUser again bc update doesn't return reviews
                        this.getCurrentUser();
                        Alert.alert("Changes Saved!")
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
        this.props.setIsEdited(false)
        this.props.triggerSettings()
    }

    async ShowEmailSentMessage() {
        this.setState({ emailErrorMessage: "An email is sent to the address you provided. Please confirm." })
        setTimeout(function(){
            this.setState({ emailErrorMessage: "" });
       }.bind(this),5000);
      }

    validateEmailAndSendToken(e) {
    let email = e.nativeEvent.text.trim().toLowerCase();
    // What is considered a valid email? Test here: http://jsfiddle.net/ghvj4gy9/
    let emailIsValid = String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    if (emailIsValid) {
        this.setState({ emailIsValid: true });
        axios
        .get(
            `http://${global.profileAPI}/api/school/confirm?email=${email}`,
            this.getConfig(this.state.token)
        )
        .then(() => this.ShowEmailSentMessage())
        .catch(
            (err) => {
                if (err.response.data.code == 404) {
                this.setState({ emailIsValid: false, emailErrorMessage: err.response.data.message.toUpperCase() })
                } else {
                this.setState({ emailErrorMessage: "The email couldn't be confirmed at this point. Please try again later!" })
                }
            }
        );
    } else {
        this.setState({ emailIsValid: false, emailErrorMessage: "Please enter a valid email" });
    }
    }

    render() {

        let classesTaken = this.state.currentUserData.classes_taken?.map((completedClass) => {
            return (
                <Label labelColor={theme.COLOR_YELLOW} isReadOnly stacked>
                    {completedClass}
                </Label>
            )
        });

        let userPersonalSkills = UserData[""].skills.map((data) => {
            return (
                <TouchableOpacity disabled={this.props.isReadOnly}>
                    <SkillLabel>{data}</SkillLabel>
                </TouchableOpacity>
            )
        });


        let allTags = this.state.currentUserData.reviews
            ?.flatMap(obj => obj.tags)
            .reduce((dict, obj) => {
                dict[obj.name] = (dict[obj.name] || 0) + 1;
                return dict
            }, {})

        let topFiveTags = allTags ? Object.keys(allTags)
            .map(key => [key, allTags[key]])
            .sort((x, y) => y[1] - x[1])
            .slice(0, 5)
            :
            []


        let ratedQualities = topFiveTags.map((data) => {
            return (
                <Label labelColor={theme.COLOR_PURPLE} isReadOnly stacked>
                    {data[0]} <Emoji quality={data[0]} />
                </Label>
            )
        });


        let currentlytaken = this.state.currentUserData.current_classes?.map((enrolledClass) => {
            return (
                <Label labelColor={theme.COLOR_BLUE} isReadOnly stacked>
                    {enrolledClass}
                </Label>
            )
        });




        return (
            <KeyboardAwareScrollView behaviour="padding" style={{marginBottom:100}} >
              <View isReadOnly={this.props.isReadOnly} >
                <UserProfileImage />
                <UserName
                    editable={!this.props.isReadOnly}
                    placeholder="Your Name"
                    placeholderTextColor={"#D8D8D8"}
                    onChangeText={(text) => {

                        this.payload.fullName = text
                        let payloadFirstName = this.payload.fullName.substr(0, this.payload.fullName.indexOf(' '))
                        let payloadLastName = this.payload.fullName.substr(this.payload.fullName.indexOf(' ') + 1)
                        let nameIsEdited = this.state.currentUserData.first_name !== payloadFirstName ||
                            this.state.currentUserData.last_name !== payloadLastName

                        if (nameIsEdited) {
                            this.props.setIsEdited(true)
                        } else {
                            this.props.setIsEdited(false)
                        }

                    }}>
                    {this.state.currentUserData.first_name} {this.state.currentUserData.last_name}
                </UserName>
                {/* <ProgramName
                    editable={!this.props.isReadOnly}
                    placeholder="Your Program"
                    placeholderTextColor={"#D8D8D8"}>
                    {UserData[this.state.userID].program}
                </ProgramName> */}
                {/* <StudentID
                    isDisplayed={this.props.isCurrentUser}
                    editable={!this.props.isReadOnly}
                    placeholder="Your Student ID"
                    placeholderTextColor={"#D8D8D8"}
                    onChangeText={(text) => this.payload.studentID = text}>
                    {this.state.currentUserData.student_id}
                </StudentID> */}
                <UserDescription
                    editable={!this.props.isReadOnly}
                    placeholder="Tell us about yourself"
                    placeholderTextColor={"#D8D8D8"}
                    multiline={true}
                    onChangeText={(text) => {

                        this.payload.generalInfo = text
                        let generalInfoIsEdited =  this.state.currentUserData.general_info !== this.payload.generalInfo

                        if (generalInfoIsEdited) {
                            this.props.setIsEdited(true)
                        } else {
                            this.props.setIsEdited(false)
                        }

                    }}>
                    {this.state.currentUserData.general_info}
                </UserDescription>
                {/* <SaveButton isDisplayed={!this.props.isReadOnly} onPress={this.onSettingsSave} /> */}

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
                        <ModalsContainer isDisplayed={!this.props.isReadOnly}>
                            <AddClassesTakenModal userID={this.state.userID} token={this.state.token} getCurrentUser={this.getCurrentUser} />
                            <RemoveClassesTakenModal userID={this.state.userID} token={this.state.token} getCurrentUser={this.getCurrentUser} />
                        </ModalsContainer>

                    </MainContainer>

                    <MainContainer marginTop={15}>
                        <SectionHeader>
                            <SectionTitle>Classes enrolled in </SectionTitle>
                        </SectionHeader>
                        <LabelContainer>
                            {currentlytaken}
                        </LabelContainer>

                        <ModalsContainer isDisplayed={!this.props.isReadOnly}>
                            <AddCurrentClassModal userID={this.state.userID} token={this.state.token} getCurrentUser={this.getCurrentUser} />
                            <RemoveCurrentClassModal userID={this.state.userID} token={this.state.token} getCurrentUser={this.getCurrentUser} />
                            <CompleteClassModal userID={this.state.userID} token={this.state.token} getCurrentUser={this.getCurrentUser} />
                        </ModalsContainer>
                    </MainContainer>

                </PersonalProfile>

                <MainContainer marginTop={15}>
                    <SectionTitle>Self-Promoted Skills</SectionTitle>
                    <LabelContainer>
                        {userPersonalSkills}
                    </LabelContainer>
                </MainContainer>

                <Separator isDisplayed={!this.props.isReadOnly} />

                {!this.props.isReadOnly &&
                <SettingsContainer marginBottom={theme.BOTTOM_SCROLLVIEW_SPACING}>
                    <Subtitle>Settings</Subtitle>
                    <ToggleButton labelName="Team chats"></ToggleButton>

                    <ToggleButton labelName="DMs"></ToggleButton>
                    <ToggleButton labelName="Schedule"></ToggleButton>
                    {this.state.emailErrorMessage !== "" && (
                        <ErrorText>{this.state.emailErrorMessage}</ErrorText>
                    )}
                    <TextInputContainer
                        labelColor={
                        this.state.emailIsValid ? theme.COLOR_BLACK : theme.COLOR_RED
                        }
                        onFocus={() => {
                        this.setState({ emailErrorMessage: "" });
                        }}
                        isConfirmed={this.state.currentUserData.school}
                        labelName="School email"
                        placeholder={this.state.currentUserData.school ?? "yourschool@email.edu"}
                        onEndEditing={this.validateEmailAndSendToken}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <SaveButton onPress={this.onSettingsSave} />
                </SettingsContainer>
                }
              </View>
            </KeyboardAwareScrollView>
        );
    }
}

// STYLED-COMPONENTS
const PersonalProfile = styled.View`
  display: ${(props) => (props.isDisplayed ? "flex" : "none")};
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
    background: ${(props) => (props.editable ? "#e8e8e8" : "transparent")};
    padding-vertical: ${(props) => (props.editable ? 2 : 0)};
    padding-horizontal: ${(props) => (props.editable ? 10 : 0)};
    align-self: center;
`;

const ProgramName = styled.TextInput`
  color: ${theme.COLOR_GRAY};
  font-size: ${theme.FONT_SIZE_SLIGHT_LARGE};
  font-family: ${theme.FONT_REGULAR};
  border-radius: 5;
  background: ${(props) => (props.editable ? "#e8e8e8" : "transparent")};
  padding-vertical: ${(props) => (props.editable ? 1 : 0)};
  padding-horizontal: ${(props) => (props.editable ? 5 : 0)};
  margin-top: ${(props) => (props.editable ? 3 : 0)};
  align-self: center;
`;

const StudentID = styled(ProgramName)`
  margin-top: ${(props) => (props.editable ? 3 : 0)};
  text-align: center;
  display: ${(props) => (props.isDisplayed ? "flex" : "none")};
`;

const UserDescription = styled.TextInput`
    color:${theme.COLOR_BLACK}};
    font-size: ${theme.FONT_SIZE_MEDIUM};
    font-family: ${theme.FONT_REGULAR};
    border-radius: 5;
    background: ${(props) => (props.editable ? "#e8e8e8" : "transparent")};
    padding-vertical: ${(props) => (props.editable ? 5 : 0)};
    padding-horizontal: ${(props) => (props.editable ? 5 : 0)};
    margin-top: ${(props) => (props.editable ? 3 : 0)};
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
  display: ${(props) => (props.isDisplayed ? "flex" : "none")};
`;

const SettingsContainer = styled(MainContainer)`
  display: ${(props) => (props.isDisplayed ? "flex" : "none")};
`;

const ToggableContainer = styled.View`
  display: ${(props) => (props.isDisplayed ? "flex" : "none")};
`;

const QualityLabel = styled(Label)`
  margin-bottom: 5;
`;

const ModalsContainer = styled.View`
  display: ${(props) => (props.isDisplayed ? "flex" : "none")};
`;

const ErrorText = styled.Text`
  color: red;
  font-family: ${theme.FONT_SEMIBOLD};
  margin-top: 5;
`

export default UserProfile;