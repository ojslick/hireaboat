import React from 'react';
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
                </div>
              </div>
            </div>

            <div className="payment-checkout-flex-right"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentCheckOut;
