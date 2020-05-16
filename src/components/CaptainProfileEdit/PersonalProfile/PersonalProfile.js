import React from 'react';
import Calendar from 'react-calendar';
import PhoneInput from 'react-phone-input-2';

class PersonalProfile extends React.Component {
  state = {
    toDate: new Date(),
    clickToDay: true,
    dob: '',
  };

  onChangeTo = (date) => this.setState({ toDate: date });

  render() {
    return (
      <>
        {this.props.handleGeneralClick ? (
          <div className="personal-profile-right">
            <div className="personal-profile-right-container">
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
                        this.state.dob
                          ? this.state.dob.toLocaleDateString()
                          : ''
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
              </div>
            </div>
            <button
              className="personal-information-button"
              style={{ float: 'left' }}
            >
              Save
            </button>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default PersonalProfile;
