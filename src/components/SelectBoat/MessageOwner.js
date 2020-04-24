import React from 'react';
import { connect } from 'react-redux';

class MessageOwner extends React.Component {
  render() {
    console.log('bookingdetailsprops===>', this.props.bookingDetails);
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
          <div className="select-boat-message-owner-departure">
            <div>
              <h3 className="select-boat-message-owner-departure-text">
                Departure Date
              </h3>
              <p className="select-boat-message-owner-departure-text-date">
                {this.props.bookingDetails}
              </p>
            </div>

            <div>
              <h3 className="select-boat-message-owner-departure-text">
                Duration
              </h3>
              <p className="select-boat-message-owner-departure-text-date">
                {this.props.bookingDetails}
              </p>
            </div>

            <div>
              <h3 className="select-boat-message-owner-departure-text">
                Price
              </h3>
              <p className="select-boat-message-owner-departure-text-date">
                {this.props.bookingDetails}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { bookingDetails: state.bookingCard };
};

export default connect(mapStateToProps)(MessageOwner);
