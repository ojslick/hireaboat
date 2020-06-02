import React from 'react';
import ProfileNav from '../CaptainProfileEdit/ProfileNav/ProfileNav';
import ellipse from './Images/Ellipse2.png';
import Footer from '../Footer/Footer';
import history from '../../history';

class Conversation extends React.Component {
  state = {
    general: true,
    photos: false,
  };
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
  };
  render() {
    return (
      <div className="message-container">
        <ProfileNav />
        <div className="message-body">
          <div
            className="personal-profile-flex"
            style={{ marginTop: 0, padding: 0 }}
          >
            <div className="personal-profile-left">
              <p className="personal-profile-text">Message</p>
              <div className="personal-profile-line"></div>
              <p
                className={
                  this.state.general
                    ? 'personal-profile-sub-text-blue'
                    : 'personal-profile-sub-text'
                }
                onClick={() => {
                  this.handleClick('general', true);
                  history.push('/message');
                }}
              >
                Inbox
              </p>
              <p
                className={
                  this.state.photos
                    ? 'personal-profile-sub-text-blue'
                    : 'personal-profile-sub-text'
                }
                onClick={() => this.handleClick('photos', true)}
              >
                Sent
              </p>
            </div>
            {this.state.general ? (
              <div className="personal-profile-right">
                <div
                  className="personal-profile-right-container"
                  style={{ minHeight: '150px' }}
                >
                  <div className="personal-information-header">
                    <h1 className="personal-information-header-text">
                      Conversation with Daniel Jack
                    </h1>
                  </div>
                  <div className="conversation-body">
                    <div className="conversation-body-left">
                      <div className="conversation-fixed-messages">
                        <div className="conversation-body-received">
                          <p className="conversation-body-received-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                          <p
                            className="conversation-body-received-text"
                            style={{ marginTop: '10px' }}
                          >
                            03 June 2020 15:20
                          </p>
                        </div>
                        <div className="conversation-body-sent">
                          <p className="conversation-body-received-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                            <p
                              className="conversation-body-received-text"
                              style={{ marginTop: '10px' }}
                            >
                              03 June 2020 15:50
                            </p>
                          </p>
                        </div>
                        <div className="conversation-body-sent">
                          <p className="conversation-body-received-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                            <p
                              className="conversation-body-received-text"
                              style={{ marginTop: '10px' }}
                            >
                              03 June 2020 15:50
                            </p>
                          </p>
                        </div>
                      </div>
                      <p className="conversation-body-reply-to">
                        Reply to Daniel Jack
                      </p>
                      <textarea className="conversation-body-reply-input" />
                      <button className="conversation-body-reply-send">
                        Send
                      </button>
                    </div>
                    <div className="conversation-body-right">
                      <div className="conversation-body-trips">
                        <p className="conversation-body-trips-text">About</p>
                      </div>
                      <div className="conversation-body-pic">
                        <img src={ellipse} className="conversation-body-name" />
                      </div>
                      <p className="conversation-body-name">Daniel Jack</p>
                      <div
                        className="conversation-body-name-location"
                        style={{ marginTop: '57px' }}
                      >
                        <div className="conversation-body-name-location-left">
                          <p className="conversation-body-name-location-text">
                            Location
                          </p>
                        </div>
                        <div className="conversation-body-name-location-left">
                          <p className="conversation-body-name-location-text-right">
                            Lagos
                          </p>
                        </div>
                      </div>
                      <div className="conversation-body-name-location">
                        <div className="conversation-body-name-location-left">
                          <p className="conversation-body-name-location-text">
                            Language
                          </p>
                        </div>
                        <div className="conversation-body-name-location-left">
                          <p className="conversation-body-name-location-text-right">
                            Spanish
                          </p>
                        </div>
                      </div>
                      <div className="conversation-body-name-location">
                        <div className="conversation-body-name-location-left">
                          <p className="conversation-body-name-location-text">
                            Response time
                          </p>
                        </div>
                        <div className="conversation-body-name-location-left">
                          <p className="conversation-body-name-location-text-right">
                            1hr
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}

            {this.state.photos ? (
              <div className="personal-profile-right">
                <div
                  className="personal-profile-right-container"
                  style={{ minHeight: '200px' }}
                >
                  <div className="personal-information-header">
                    <h1 className="personal-information-header-text">Sent</h1>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Conversation;
