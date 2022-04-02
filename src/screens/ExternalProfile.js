import React, { Component } from 'react';
import ScreenContainer from '../containers/ScreenContainer.js';
import UserProfile from '../components/profile/UserProfile.js';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer isSecondaryScreen screenTitle="John Smith">
        {/* TODO: Input respective user id as prop in parent */}
        <UserProfile isReadOnly={true} userID={this.props.userID} />
      </ScreenContainer>
    );
  }
}

export default Profile;
