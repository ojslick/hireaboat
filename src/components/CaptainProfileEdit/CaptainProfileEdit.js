import React from 'react';
import ProfileNav from './ProfileNav/ProfileNav.js';
import Calendar from 'react-calendar';
import './captainProfileEdit.css';
import PhoneInput from 'react-phone-input-2';
import Footer from '../Footer/Footer';

class CaptainProfileEdit extends React.Component {
  state = {
    general: true,
    photos: false,
    boatingQualification: false,
    toDate: new Date(),
    clickToDay: true,
    dob: '',
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick = (name, value) => {
    if (name == 'general') {
      this.setState({ general: true });
      this.setState({ photos: false });
      this.setState({ boatingQualification: false });
    }
    if (name == 'photos') {
      this.setState({ general: false });
      this.setState({ photos: value });
      this.setState({ boatingQualification: false });
    }
    if (name == 'boatingQualification') {
      this.setState({ general: false });
      this.setState({ photos: false });
      this.setState({ boatingQualification: value });
    }
  };

  onChangeTo = (date) => this.setState({ toDate: date });

  render() {
    return (
      <div className="captain-profile-edit-container">
        <ProfileNav />
        <div className="personal-profile-flex">
          <div className="personal-profile-left">
            <p className="personal-profile-text">Personal Profile</p>
            <div className="personal-profile-line"></div>
            <p
              className={
                this.state.general
                  ? 'personal-profile-sub-text-blue'
                  : 'personal-profile-sub-text'
              }
              onClick={() => this.handleClick('general', true)}
            >
              General
            </p>
            <p
              className={
                this.state.photos
                  ? 'personal-profile-sub-text-blue'
                  : 'personal-profile-sub-text'
              }
              onClick={() => this.handleClick('photos', true)}
            >
              Photos
            </p>
            <p
              className={
                this.state.boatingQualification
                  ? 'personal-profile-sub-text-blue'
                  : 'personal-profile-sub-text'
              }
              onClick={() => this.handleClick('boatingQualification', true)}
            >
              Boating Qualification
            </p>
          </div>
          <div className="personal-profile-right">
            <div className="personal-information-header">
              <h1 className="personal-information-header-text">
                Personal Information
              </h1>
            </div>
            <div className="personal-information-body">
              <div className="personal-information-name">
                <div
                  className="personal-information-firstname-container-text"
                  style={{
                    width: '47.5%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="personal-information-name-firstname"
                  />
                </div>
                <div
                  className="personal-information-firstname-container"
                  style={{
                    width: '47.5%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="personal-information-name-firstname"
                  />
                </div>
              </div>
              <div className="personal-information-dob">
                <div
                  className="personal-information-firstname-container"
                  style={{
                    width: '46.5%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    Sex
                  </label>
                  <select className="personal-information-name-firstname-input">
                    <option></option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div
                  className="personal-information-firstname-container"
                  style={{
                    width: '46.5%',
                    textAlign: 'start',
                    position: 'relative',
                  }}
                  onFocus={() => this.setState({ clickToDay: false })}
                >
                  <label className="personal-information-name-firstname-label">
                    Date of Birth
                  </label>
                  <input
                    className="personal-information-name-firstname-input"
                    type="text"
                    value={
                      this.state.dob ? this.state.dob.toLocaleDateString() : ''
                    }
                  />
                  <div
                    className={
                      this.state.clickToDay
                        ? 'react-calender-booking-card toggle-off'
                        : 'react-calender-booking-card'
                    }
                  >
                    <Calendar
                      onChange={this.onChangeTo}
                      value={this.state.toDate}
                      onClickDay={async () => {
                        await this.setState({ clickToDay: true });
                        this.setState({ dob: this.state.toDate });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="personal-information-phone-number">
                <div
                  className="personal-information-phone-number-container"
                  style={{
                    width: '31%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    Phone Number
                  </label>
                  <div className="personal-information-name-firstname">
                    <PhoneInput
                      country={'us'}
                      onChange={(phone) => this.setState({ phone })}
                    />
                  </div>
                </div>
                <div
                  className="personal-information-phone-number-container"
                  style={{
                    width: '31%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="personal-information-name-firstname"
                  />
                </div>
                <div
                  className="personal-information-phone-number-container"
                  style={{
                    width: '31%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="personal-information-name-firstname"
                  />
                </div>
              </div>
              <div
                className="personal-information-phone-number-container"
                style={{
                  width: '100%',
                  textAlign: 'start',
                }}
              >
                <label className="personal-information-name-firstname-label">
                  Address
                </label>
                <input
                  type="text"
                  className="personal-information-name-firstname"
                />
              </div>
              <div
                className="personal-information-phone-number-container"
                style={{
                  width: '100%',
                  textAlign: 'start',
                }}
              >
                <label className="personal-information-name-firstname-label">
                  Describe yourself
                </label>
                <textarea
                  type="text"
                  className="personal-information-name-firstname"
                  style={{ height: '166px' }}
                />
              </div>
              <button className="personal-information-button">Save</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CaptainProfileEdit;
