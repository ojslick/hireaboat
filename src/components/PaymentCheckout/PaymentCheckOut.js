import React from 'react';
import { connect } from 'react-redux';
import ImageSlider from './ImageSlider/ImageSlider.js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './paymentCheckOut.css';
import mastercard from './Images/mastercard.svg';
import visa from './Images/visa.svg';
import card from './Images/card.svg';

class PaymentCheckOut extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="payment-checkout-container">
        <div className="payment-checkout-align">
          <div className="payment-checkout-flex">
            <div className="payment-checkout-flex-left">
              <div className="payment-checkout-header">
                <p className="payment-checkout-header-payment">1.Payment</p>
                <p
                  className="payment-checkout-header-confirmation"
                  style={{ fontSize: '25px', fontWeight: '100' }}
                >
                  >
                </p>
                <p className="payment-checkout-header-confirmation">
                  2.Confirmation
                </p>
              </div>
              <div className="payment-checkout-card-details">
                <div className="payment-checkout-card-details-header">
                  <p className="payment-checkout-card-details-header-payment-information">
                    Payment Information
                  </p>
                  <div className="payment-checkout-card-details-header-icons">
                    <img src={mastercard} alt="icon" />
                    <img src={visa} alt="icon" />
                  </div>
                </div>
                <div className="payment-checkout-line"></div>
                <div className="payment-checkout-card-details-container">
                  <div className="payment-checkout-card-details-phone-number-align">
                    <label className="payment-checkout-card-details-phone-number-label">
                      Phone Number
                    </label>
                    <div className="payment-checkout-card-details-phone-number">
                      <PhoneInput
                        country={'us'}
                        onChange={(phone) => this.setState({ phone })}
                      />
                    </div>
                  </div>
                  <div
                    className="payment-checkout-card-details-phone-number-align"
                    style={{ marginTop: '19px' }}
                  >
                    <label className="payment-checkout-card-details-phone-number-label">
                      Email Address
                    </label>
                    <input
                      className="payment-checkout-card-details-email"
                      type="email"
                      required
                    />
                  </div>
                  <div
                    className="payment-checkout-card-details-phone-number-align"
                    style={{ marginTop: '19px' }}
                  >
                    <label className="payment-checkout-card-details-phone-number-label">
                      Name on the card
                    </label>
                    <input
                      className="payment-checkout-card-details-email"
                      type="text"
                      required
                    />
                  </div>
                  <div
                    className="payment-checkout-card-details-phone-number-align"
                    style={{ marginTop: '19px' }}
                  >
                    <label className="payment-checkout-card-details-phone-number-label">
                      Card Data
                    </label>
                    <div className="payment-checkout-card-details-data">
                      <img src={card} alt="icon" />
                      <input
                        placeholder="Card number"
                        type="number"
                        className="payment-checkout-card-details-data-number"
                      />
                      <input
                        placeholder="MM/YY"
                        type="text"
                        className="payment-checkout-card-details-data-date"
                      />
                      <input
                        placeholder="CVC"
                        type="number"
                        className="payment-checkout-card-details-data-date"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="payment-checkout-card-details">
                <div className="payment-checkout-card-details-header">
                  <p className="payment-checkout-card-details-header-payment-information">
                    Billing Address
                  </p>
                </div>
                <div className="payment-checkout-line"></div>
                <div className="payment-checkout-card-details-container">
                  <div className="payment-checkout-card-details-phone-number-align">
                    <label className="payment-checkout-card-details-phone-number-label">
                      Street Address
                    </label>
                    <input
                      className="payment-checkout-card-details-email"
                      type="text"
                      required
                    />
                  </div>
                  <div
                    className="payment-checkout-card-details-phone-number-align"
                    style={{ marginTop: '19px' }}
                  >
                    <label className="payment-checkout-card-details-phone-number-label">
                      City
                    </label>
                    <input
                      className="payment-checkout-card-details-email"
                      type="text"
                      required
                    />
                  </div>
                  <div
                    className="payment-checkout-card-details-phone-number-align"
                    style={{ marginTop: '19px' }}
                  >
                    <label className="payment-checkout-card-details-phone-number-label">
                      State
                    </label>
                    <div className="payment-checkout-card-details-city-container">
                      <input
                        className="payment-checkout-card-details-city"
                        type="text"
                        required
                      />
                      <div className="payment-checkout-card-details-zipcode-container">
                        <label>Zip code</label>
                        <input
                          className="payment-checkout-card-details-zipcode"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="payment-checkout-card-details-phone-number-align"
                    style={{ marginTop: '19px' }}
                  >
                    <label className="payment-checkout-card-details-phone-number-label">
                      Country
                    </label>
                    <input
                      className="payment-checkout-card-details-email"
                      type="text"
                      required
                    />
                  </div>
                </div>
              </div>
              <div
                className="payment-checkout-card-details"
                style={{ height: '290px' }}
              >
                <div className="payment-checkout-card-details-header">
                  <p className="payment-checkout-card-details-header-payment-information">
                    Optional Message for the owner
                  </p>
                </div>
                <div className="payment-checkout-line"></div>
                <div className="payment-checkout-card-details-container">
                  <div className="payment-checkout-card-details-phone-number-align">
                    <label className="payment-checkout-card-details-phone-number-label">
                      Message
                    </label>
                    <textarea
                      className="payment-checkout-card-details-email"
                      type="text"
                      style={{ height: '178px' }}
                    ></textarea>
                  </div>
                </div>
              </div>
              <button className="payment-checkout-card-details-button">
                Continue
              </button>
            </div>

            <div className="payment-checkout-flex-right">
              <div className="payment-checkout-boat-preview">
                <ImageSlider selectBoat={this.props.selectBoatState} />
                <div style={{ padding: '16px 22px', textAlign: 'justify' }}>
                  <p className="payment-checkout-boat-preview-boatModel">
                    {`${this.props.selectBoatState.boatManufacturer} ${this.props.selectBoatState.boatModel}`}
                  </p>

                  <p className="payment-checkout-boat-preview-location">
                    {`${this.props.selectBoatState.city}`}
                  </p>
                  <div className="payment-checkout-boat-preview-dates">
                    <div className="payment-checkout-boat-preview-dates-from-container">
                      <p className="payment-checkout-boat-preview-dates-from">
                        From
                      </p>
                      <p className="payment-checkout-boat-preview-dates-from-date">
                        {this.props.bookingDetails.fromDate}
                      </p>
                    </div>
                    <div className="payment-checkout-boat-preview-dates-from-container">
                      <p className="payment-checkout-boat-preview-dates-from">
                        To
                      </p>
                      <p className="payment-checkout-boat-preview-dates-from-date">
                        {this.props.bookingDetails.toDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectBoatState: state.selectBoat,
    bookingDetails: state.bookingCard,
  };
};

export default connect(mapStateToProps)(PaymentCheckOut);