import React, { Component } from 'react';
import { View, Image, Switch,Text, Platform , ScrollView, TouchableOpacity} from 'react-native';
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
import XIcon from '../assets/images/icons/x-icon.png';
import SearchBar from '../components/SearchBar.js';



class ListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggled: false,
            className: '',
            classEntered: false,
            nameEntered: false,
            showLabel: false,
            isReadOnly: false,
            isFilterButtonSelected: false,
            participantName: ''
        };

        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
        this.deleteLabel = this.deleteLabel.bind(this);
        this.triggerSearchBar = this.triggerSearchBar.bind(this);
        this.triggerFilterBar = this.triggerFilterBar.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    deleteLabel = () => {
        this.setState({ showLabel: false, className: ''});
      }

      handleFilterSubmit = (event) => {
        const className = event.nativeEvent.text.toLowerCase().trim()
        this.setState({ showLabel: true });
        this.setState({ className: className })
        this.className.clear();
        if (this.props.onFilter && className != '') {
          if (this.state.participantName != '') {
            this.props.onFilteredParticpant(this.state.participantName, className)
          } else {
            this.props.onFilter(className)
          }
        }
      }

      handleTeamFilterSubmit = (event) => {
        const className = event.nativeEvent.text.toLowerCase().trim()

        if (this.props.onSearchTeamByClass && className.trim() !== '') {
          this.setState({ showLabel: true });
          this.setState({ className: className })
          console.log("participant & class", this.state.participantName, this.state.className)
          this.className.clear();
          this.props.onSearchTeamByClass(className)
        }  else {
          alert("Please enter class name to use filter")
        }
      }

      handleSearchSubmit = (event) => {
        const participantName = event.nativeEvent.text.toLowerCase().trim()
        this.setState({ participantName: participantName.trim() })
        if (this.props.onSearch && participantName.trim() != '') {
          if (this.state.className != '') {
            this.props.onFilteredParticpant(participantName, this.state.className)
          } else {
            this.props.onSearch(participantName)
          }
        }
      }

      triggerFilterBar = () => {
        this.setState({ isFilterButtonSelected: true})
        this.setState({ classEntered: !this.state.classEntered });
      }

      triggerSearchBar = () => {
        this.setState({ isFilterButtonSelected: false})
        this.setState({ nameEntered: !this.state.nameEntered });
      }

    Header(props) {
        let { showLabel } = this.state;
        const renderLabel = () => {
        if (showLabel) {
        return <TouchableOpacity onPress={() => this.deleteLabel()} ><ClassLabel isReadOnly={this.triggerFilterBar} >{showLabel ? <LabelClassName>{this.state.className}</LabelClassName> : <View>{null}</View>}<IconTag>
          <LabelIcon source={XIcon} />
        </IconTag></ClassLabel></TouchableOpacity>;
      }
    }
        return (
            <HeaderIcon>
              <Header>

                <SearchFieldContainer>
                  <SearchContainer>
                    <FilterButton onPress={this.triggerFilterBar}>
                        <IconFilter source={Sort} />
                    </FilterButton>
                    <CustomText placeholder="Filter by class name"
                        classEntered={this.state.classEntered}
                        ref={input => { this.className = input }}
                        onSubmitEditing={this.props.tabName === "participant" ?
                        this.handleFilterSubmit :
                        this.handleTeamFilterSubmit } />
                    <LabelContainer>
                      {renderLabel()}
                    </LabelContainer>
                  </SearchContainer>

                  <ExtraSpacing></ExtraSpacing>

                  { this.props.tabName === "participant" &&
                    <SearchContainer>
                      <SearchButton onPress={this.triggerSearchBar}>
                          <SearchIcon source={MagnifyingIcon} />
                      </SearchButton>
                      <CustomText placeholder={`Search by ${this.props.tabName} name`}
                        nameEntered={this.state.nameEntered}
                        onSubmitEditing={this.handleSearchSubmit}
                        // ref={input => { this.participantName = input }}
                        onChangeText={(text) => this.setState({ participantName: text })}
                      />
                    </SearchContainer> }

                </SearchFieldContainer>
              </Header>
            </HeaderIcon>
        );
      }

    render() {

        return (
            <Container
                isElevated={this.props.isElevated}
                backgroundColor='#E3E3E3'
                marginTop={this.props.marginTop}
                marginBottom={this.props.marginBottom}
                contentContainerStyle={{ paddingBottom: 60 }}>
                {this.Header()}
                {this.props.children}
            </Container>
        );
    }
}

//STYLED-COMPONENTS
const Container = styled.ScrollView`
  /* padding separated as the following to allow unitless values */
  padding-horizontal: ${theme.SPACING_SLIGHT_MEDIUM};
  padding-vertical: ${theme.SPACING_SLIGHT_MEDIUM};
  margin-top: ${props => props.marginTop ? props.marginTop : 0}
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}
  border-radius: ${theme.SPACING_SMALL};
  background: ${props => props.backgroundColor ? props.backgroundColor : '`#fff`'};
  elevation: ${props => props.isElevated ? theme.CARD_ELEVATION : 0};

  /* iOS Shadows */
  shadowColor: ${props => props.backgroundColor ? props.backgroundColor : '#555'};
  shadowOpacity: ${props => props.backgroundColor ? '0.4' : '0.1'};
  shadowRadius: 10;
`;

const ExtraSpacing = styled.View`
height: 10px;
`

const SearchFieldContainer = styled.View`
display:flex;
flex-direction:column
`

const SearchContainer = styled.View`
display:flex;
flex-direction:row;
`

const CustomText = styled.TextInput`
  padding-left: 10px;
`;

const FilterButton = styled.TouchableOpacity`
  align-items: center;
  margin-bottom: 5;
`;

const SearchButton = styled(FilterButton)`
`

const LabelContainer = styled.View`
  display: flex;
  padding-left: ${theme.SPACING_SMALL};
  align-items: center;
  justify-content: center;
  background: ${theme.COLOR_LIGHT_GRAY};
`;

const SearchIcon = styled.Image`
  margin-left:20;
  margin-top: 7;
  width: 15;
  height: 15;
  tint-color: ${theme.COLOR_GRAY};
`;

const IconFilter = styled.Image`
  margin-left: 20;
  margin-top: 7;
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

const ClassLabel = styled.View`
  display: ${props => props.isReadOnly ? 'flex' : 'none'};
  flex-direction: row;
  padding-horizontal: 10;
  padding-vertical: 5;
  border-top-left-radius: 100;
  border-bottom-left-radius: 100;
  border-top-right-radius: 100;
  border-bottom-right-radius: 100;
  background-color: #5089E9;
`;

const LabelClassName = styled.Text`
  color: white;
  font-family: ${theme.FONT_SEMIBOLD};
  letter-spacing: ${theme.LETTER_SPACING_SMALL};
`;

const LabelIcon = styled.Image`
  tintColor: #ffff;
  width: 13;
  height: 14;
  margin-left: 3px;
`;

const IconTag = styled.View`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 100;
  border-bottom-right-radius: 100;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 5;
  background-color: #5089E9;
`;

ListContainer.propTypes = {
    children: PropTypes.element.isRequired,
    onSearch: PropTypes.func
};

export default ListContainer;