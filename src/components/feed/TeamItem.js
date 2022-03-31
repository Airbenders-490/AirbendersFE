import React, { Component } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';
import theme from '../../styles/theme.style.js';
import MainContainer from '../../containers/MainContainer.js';
import { Title, Subtitle } from '../../containers/TextContainer.js';

class TeamItem extends Component {
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
              marginBottom={10}
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
                <Title>{this.props.roomName}</Title>
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

export default TeamItem;