import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import theme from '../styles/theme.style.js';
import MagnifyingIcon from '../assets/images/icons/magnifying.png';
import ParticipantListItem from '../components/ParticipantListItem.js';
import { Title, Subtitle, TextBody } from '../containers/TextContainer.js';
import MainContainer from '../containers/MainContainer.js';
import JoinTeam from '../components/modals/JoinTeam.js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
        searchBarVisibility: false,
        participantName: '',
    };
    this.triggerSearchBar = this.triggerSearchBar.bind(this);
  }
  // Write functions here
  triggerSearchBar() {
    this.setState({ searchBarVisibility: !this.state.searchBarVisibility });
  }
  render() {
    return (
        <Search>
            <Pressable onPress={this.triggerSearchBar}>
                <SearchIcon source={MagnifyingIcon}></SearchIcon>
            </Pressable>
            { this.state.searchBarVisibility && 
                /** Show search bar on click */
                <SearchField placeholder="Search" onChangeText={(text) => this.participantName = text} value={this.state.participantName}/>
            }
        </Search>
    );
  }
}

const Search = styled.View`
  margin-top: 10;
  display: flex;
  flex-direction: row;
`;

const SearchField = styled.TextInput`
  margin-left: ${theme.SPACING_SMALL};
`;

const SearchIcon = styled.Image`
  height: 15;
  width: 15;
  color:  ${theme.COLOR_GRAY};
  margin-left: ${theme.SPACING_MEDIUM};
`;

export default SearchBar;