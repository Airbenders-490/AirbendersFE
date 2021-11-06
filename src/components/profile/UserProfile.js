import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../../styles/theme.style.js';
import MainContainer from '../../containers/MainContainer.js';
import { Title, Subtitle, TextBody, Caption } from '../../containers/TextContainer';
import UserData from '../../data/mock/UserProfile.json';
import MagnifyingIcon from '../../assets/images/icons/magnifying.png';

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    // Write functions here
    
    render() {
        let classesTaken = UserData[this.props.userID].classes.map((data) => {
            return (
                <TouchableOpacity disabled={this.props.isReadOnly}>
                    <ClassLabel>{data.classID}</ClassLabel>
                </TouchableOpacity>
            )
        })

        let userPersonalSkills = UserData[this.props.userID].skills.map((data) => {
            return (
                <TouchableOpacity disabled={this.props.isReadOnly}>
                    <SkillLabel>{data}</SkillLabel>
                </TouchableOpacity>
            )
        })

        return (
            <View isReadOnly={this.props.isReadOnly} >
                <UserProfileImage />
                <UserName editable={!this.props.isReadOnly} placeholder="Your Name" placeholderTextColor={"#D8D8D8"}>{UserData[this.props.userID].name}</UserName>
                <ProgramName editable={!this.props.isReadOnly} placeholder="Your Program" placeholderTextColor={"#D8D8D8"}>{UserData[this.props.userID].program}</ProgramName>
                <UserDescription
                    editable={!this.props.isReadOnly}
                    placeholder="Tell us about yourself"
                    placeholderTextColor={"#D8D8D8"}
                    multiline={true}>
                    {UserData[this.props.userID].description}
                </UserDescription>

                <MainContainer marginTop={15}>
                    <SectionTitle>Rated Qualities</SectionTitle>
                </MainContainer>
                <MainContainer marginTop={15}>
                    <SectionHeader>
                        <SectionTitle>Classes Taken</SectionTitle>
                        <SearchIcon source={ MagnifyingIcon } />
                    </SectionHeader>
                    <LabelContainer>
                        {classesTaken}
                    </LabelContainer>
                </MainContainer>
                <MainContainer marginTop={15}>
                    <SectionTitle>Self-Promoted Skills</SectionTitle>
                    <LabelContainer>
                        {userPersonalSkills}
                    </LabelContainer>
                </MainContainer>
            </View>
        );
    }
}

// STYLED-COMPONENTS
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
    color: #9E9E9E;
    font-size: ${theme.FONT_SIZE_SLIGHT_LARGE};
    font-family: ${theme.FONT_REGULAR};
    border-radius: 5;
    background: ${props => props.editable ? '#e8e8e8' : 'transparent'};
    padding-vertical: ${props => props.editable ? 1 : 0};
    padding-horizontal: ${props => props.editable ? 5 : 0};
    margin-top: ${props => props.editable ? 3 : 0};
    align-self: center;
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
    color: #9E9E9E;
    font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
    font-family: ${theme.FONT_SEMIBOLD};
    letter-spacing: ${theme.LETTER_SPACING_LARGE};
    text-transform: uppercase;
    margin-bottom: 5;
`;

const SearchIcon = styled.Image `
  width: 15;
  height: 15;
  tint-color: #9E9E9E;
`;

const SectionHeader = styled.View `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ClassLabel = styled.Text `
    font-size: ${theme.FONT_SIZE_MEDIUM};
    font-family: ${theme.FONT_REGULAR};
    margin-right: 15;
    text-transform: uppercase;
`;

const SkillLabel = styled.Text `
    font-size: ${theme.FONT_SIZE_MEDIUM};
    font-family: ${theme.FONT_REGULAR};
    margin-right: 15;
    text-transform: capitalize;
`;

const LabelContainer = styled.View `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export default UserProfile;