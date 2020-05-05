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
                {this.props.bookingDetails.fromDate}
              </p>
            </div>

            <div>
              <h3 className="select-boat-message-owner-departure-text">
                Duration
              </h3>
              <p className="select-boat-message-owner-departure-text-date">
                {this.props.bookingDetails.bookingDays}
              </p>
            </div>

            <div>
              <h3 className="select-boat-message-owner-departure-text">
                Price
              </h3>
              <p className="select-boat-message-owner-departure-text-date">
                {this.props.bookingDetails.price}
              </p>
            </div>
          </div>
          <div
            style={{ marginTop: '17px', width: '80%', display: 'inline-block' }}
          >
            <p className="select-boat-message-owner-explain-text">
              Please explain your enquiry here, and the captain will respond to
              you asap
            </p>
          </div>
          <div className="select-boat-message-owner-input-container">
            <input
              className="select-boat-message-owner-input-name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="select-boat-message-owner-input-container">
            <input
              className="select-boat-message-owner-input-name"
              type="email"
              required
              placeholder="Email"
            />
          </div>
          <div className="select-boat-message-owner-input-container">
            <input
              className="select-boat-message-owner-input-name"
              type="number"
              placeholder="Phone Number"
            />
          </div>
          <div className="select-boat-message-owner-input-container">
            <textarea
              className="select-boat-message-owner-input-name"
              type="text"
              placeholder="Enter your message here"
              style={{ height: '135px', paddingTop: '12px' }}
            />
          </div>
          <div className="select-boat-message-owner-button-container">
            <div className="select-boat-message-owner-button-align">
              <button
                className="select-boat-message-owner-cancel"
                onClick={this.props.messageCloseModal}
              >
                Cancel
              </button>
              <button className="select-boat-message-owner-send">Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { bookingDetails: state.bookingCard };
};

export default connect(mapStateToProps)(MessageOwner);
