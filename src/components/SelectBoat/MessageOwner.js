import React from 'react';

class MessageOwner extends React.Component {
  render() {
    return (
      <div className="select-boat-message-owner-container">
        <div className="select-boat-message-owner-container-left">
          <div className="select-boat-message-owner-container-avatar"></div>
          <div className="select-boat-message-owner-container-name">Stacy</div>
          <div className="select-boat-message-owner-container-city-and-age">
            <p style={{ display: 'inline' }}>New Bavaria 34</p>
            <p>Cruiser</p>
          </div>
        </div>
        <div className="select-boat-message-owner-container-right">
          <h1 className="select-boat-message-owner-enquiry">Your Enquiry</h1>
          <div className="select-boat-message-owner-departure"></div>
        </div>
      </div>
    );
  }
}

export default MessageOwner;
