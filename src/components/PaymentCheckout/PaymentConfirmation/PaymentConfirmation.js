import React from 'react';
import confirmIcon from './Images/confirm.svg';
import { connect } from 'react-redux';
import ImageSlider from '../ImageSlider/ImageSlider.js';
import Footer from '../../Footer/Footer';
class PaymentConfirmation extends React.Component {
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
                <p
                  className="payment-checkout-header-payment"
                  style={{ color: '#787878' }}
                >
                  1. Payment
                </p>
                <p
                  className="payment-checkout-header-confirmation"
                  style={{
                    fontSize: '25px',
                    fontWeight: '100',
                  }}
                >
                  >
                </p>
                <p
                  className="payment-checkout-header-confirmation"
                  style={{ color: '#39a0ed' }}
                >
                  2. Confirmation
                </p>
              </div>
              <div
                className="payment-checkout-card-details"
                style={{ height: '715px' }}
              >
                <p className="payment-successful">Payment Successful</p>
                <img
                  src={confirmIcon}
                  alt="icon"
                  className="payment-successful-icon"
                />
                <div className="payment-successful-takeoff-container">
                  <p className="payment-successful-takeoff-price">
                    {`${this.props.bookingDetails.price}`}
                  </p>
                  <div className="payment-successful-takeoff-flex">
                    <div className="payment-successful-takeoff-flex-align">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'spaceBetween',
                        }}
                      >
                        <div className="payment-successful-takeoff-time">
                          <p className="payment-successful-takeoff-time-text">
                            Takeoff date
                          </p>
                        </div>
                        <div className="payment-successful-takeoff-date">
                          <p className="payment-successful-takeoff-date-text">
                            {this.props.bookingDetails.fromDate}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'spaceBetween',
                          marginTop: '13px',
                        }}
                      >
                        <div className="payment-successful-takeoff-time">
                          <p className="payment-successful-takeoff-time-text">
                            Harbour
                          </p>
                        </div>
                        <div className="payment-successful-takeoff-date">
                          <p className="payment-successful-takeoff-date-text">
                            {`${this.props.selectBoatState.boatHabour}`}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'spaceBetween',
                          marginTop: '13px',
                        }}
                      >
                        <div className="payment-successful-takeoff-time">
                          <p className="payment-successful-takeoff-time-text">
                            Captain
                          </p>
                        </div>
                        <div className="payment-successful-takeoff-date">
                          <p className="payment-successful-takeoff-date-text">
                            Captain's Name
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="payment-successful-takeoff-container"
                  style={{ height: '190px' }}
                >
                  <div className="payment-successful-takeoff-flex">
                    <div className="payment-successful-takeoff-flex-align">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'spaceBetween',
                          marginTop: '23px',
                        }}
                      >
                        <div className="payment-successful-takeoff-time">
                          <p className="payment-successful-takeoff-time-text">
                            Name
                          </p>
                        </div>
                        <div className="payment-successful-takeoff-date">
                          <p className="payment-successful-takeoff-date-text">
                            Passenger's Name
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'spaceBetween',
                          marginTop: '13px',
                        }}
                      >
                        <div className="payment-successful-takeoff-time">
                          <p className="payment-successful-takeoff-time-text">
                            Email
                          </p>
                        </div>
                        <div className="payment-successful-takeoff-date">
                          <p className="payment-successful-takeoff-date-text">
                            {`${this.props.checkoutData}`}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'spaceBetween',
                          marginTop: '13px',
                        }}
                      >
                        <div className="payment-successful-takeoff-time">
                          <p className="payment-successful-takeoff-time-text">
                            Duration
                          </p>
                        </div>
                        <div className="payment-successful-takeoff-date">
                          <p className="payment-successful-takeoff-date-text">
                            {`${this.props.bookingDetails.bookingDays}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="payment-successful-more-info">
                  <div className="payment-successful-more-info-flex">
                    <p className="payment-successful-more-info-text">
                      Contact your captain for more info
                    </p>
                    <button className="payment-successful-more-contact">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment-checkout-flex-right">
              <div
                className="payment-checkout-boat-preview"
                style={{ height: '525px' }}
              >
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
                  <p className="payment-checkout-boat-preview-habour">
                    City of departure / Harbour
                  </p>
                  <p className="payment-checkout-boat-preview-habour-location">
                    {`${this.props.selectBoatState.city} / ${this.props.selectBoatState.boatHabour}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectBoatState: state.selectBoat,
    bookingDetails: state.bookingCard,
    checkoutData: state.checkoutData,
  };
};

export default connect(mapStateToProps)(PaymentConfirmation);
