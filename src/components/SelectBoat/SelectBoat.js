import React from 'react';
import { connect } from 'react-redux';
import { selectBoat } from '../../actions/';
import ImageSlider from './ImageSlider';
import cabinIcon from './images/bedIcon.svg';
import bathIcon from './images/bathIcon.svg';
import lengthIcon from './images/lengthIcon.svg';
import guestIcon from './images/guestIcon.svg';
import BookingCard from './BookingCard';
import BookNowModal from './BookNowModal';

import './selectBoat.css';

class SelectBoat extends React.Component {
  state = {
    openBookNowModal: false,
    closeBookNowModal: false
  };

  componentDidMount() {
    this.props.selectBoat();
  }

  onChangeTo = date => this.setState({ toDate: date });
  onChangeFrom = date => this.setState({ fromDate: date });

  render() {
    const {
      boatManufacturer,
      boatModel,
      captain,
      numberOfCabins,
      numberOfBathrooms,
      lengthOfBoats,
      boatCapacity,
      dailyBookingPrice,
      boatDescription
    } = this.props.selectBoatState;
    return (
      <div className="select-boat-container">
        <BookNowModal
          openBookNowModal={this.state.openBookNowModal}
          dailyBookingPrice={dailyBookingPrice}
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          clickToDay={this.state.clickToDay}
          clickFromDay={this.state.clickFromDay}
        />
        <div className="select-boat-mobile-booking">
          <div className="select-boat-mobile-booking-align">
            <button
              className="select-boat-description-booking-card-book-now-btn"
              style={{
                width: '42%',
                marginLeft: '5%',
                marginTop: '0px',
                opacity: '0.9'
              }}
              onClick={() =>
                this.setState(prevState => ({
                  openBookNowModal: !prevState.openBookNowModal
                }))
              }
            >
              Book Now
            </button>
            <button
              className="select-boat-description-booking-card-message-owner-btn"
              style={{
                width: '42%',
                marginRight: '5%',
                marginTop: '0px',
                opacity: '0.9'
              }}
            >
              Message Owner
            </button>
          </div>
        </div>
        <div className="select-boat-image-container">
          <ImageSlider selectBoat={this.props.selectBoatState} />
        </div>
        {/* booking for mobile devices */}

        <div className="select-boat-align">
          <div className="select-boat-profile-details">
            <div className="select-boat-profile-details-rating-container">
              <div className="select-boat-profile-details-pic">
                {/* <img alt="profile picture" src={}/> */}
              </div>
              <div className="select-boat-profile-details-rating">
                <h3 className="select-boat-profile-details-name">
                  {`${boatManufacturer} ${boatModel}`}
                </h3>
                {captain === 'With Captain' ? (
                  <p className="select-boat-profile-details-captain">
                    Boat comes with captain
                  </p>
                ) : (
                  <p className="select-boat-profile-details-captain">
                    Boat comes without captain
                  </p>
                )}
              </div>
            </div>

            <div className="select-boat-description">
              <div className="select-boat-description-left">
                <div className="select-boat-description-left-separator-line"></div>
                <div className="select-boat-description-specs-container">
                  <div
                    className="select-boat-description-cabin-container"
                    style={{ marginTop: '6px' }}
                  >
                    <img
                      src={cabinIcon}
                      alt="cabin logo"
                      style={{ display: 'inline-block' }}
                    />
                    <p className="select-boat-description-cabin-container-text">{`${numberOfCabins} cabins`}</p>
                  </div>
                  <div className="select-boat-description-cabin-container">
                    <img
                      src={bathIcon}
                      alt="cabin logo"
                      style={{ display: 'inline-block' }}
                    />
                    <p className="select-boat-description-cabin-container-text">{`${numberOfBathrooms} bathrooms`}</p>
                  </div>
                  <div className="select-boat-description-cabin-container">
                    <img
                      src={lengthIcon}
                      alt="cabin logo"
                      style={{ display: 'inline-block' }}
                    />
                    <p className="select-boat-description-cabin-container-text">{`${lengthOfBoats} m`}</p>
                  </div>
                  <div className="select-boat-description-cabin-container">
                    <img
                      src={guestIcon}
                      alt="cabin logo"
                      style={{ display: 'inline-block' }}
                    />
                    <p className="select-boat-description-cabin-container-text">{`${boatCapacity} m`}</p>
                  </div>
                </div>
                <div className="select-boat-description-left-separator-line"></div>
                <div className="select-boat-description-details-container">
                  <div className="select-boat-description-details-description">
                    <div style={{ display: 'inline-block', width: '100%' }}>
                      <h3 className="select-boat-description-details-description-heading">
                        Description
                      </h3>

                      <div className="select-boat-description-details-description-body">
                        {boatDescription}
                        <div className="select-boat-description-left-separator-line1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="select-boat-description-right">
                <BookingCard dailyBookingPrice={dailyBookingPrice} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectBoatState: state.selectBoat };
};

export default connect(mapStateToProps, { selectBoat })(SelectBoat);
