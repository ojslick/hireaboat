import React from 'react';
import ProfileNav from './ProfileNav/ProfileNav.js';

import './captainProfileEdit.css';

class CaptainProfileEdit extends React.Component {
  render() {
    return (
      <div className="captain-profile-edit-container">
        <ProfileNav />
      </div>
    );
  }
}

export default CaptainProfileEdit;
