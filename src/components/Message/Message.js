import React from 'react';
import './message.css';
import ProfileNav from '../CaptainProfileEdit/ProfileNav/ProfileNav';
import ellipse from './Images/ellipse.png';
import Footer from '../Footer/Footer';
import history from '../../history';

class Message extends React.Component {
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
                onClick={() => this.handleClick('general', true)}
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
                      All conversations
                    </h1>
                  </div>
                  <div
                    className="message-inbox-body"
                    onClick={() => history.push('/message/conversation')}
                  >
                    <div className="message-inbox-body-profile-pic">
                      <img src={ellipse} />
                    </div>
                    <div className="message-inbox-body-username-container">
                      <p className="message-inbox-body-username">Daniel Jack</p>
                      <p className="message-inbox-body-username">
                        03 March 2020
                      </p>
                    </div>
                    <div className="message-inbox-body-message-container">
                      <p className="message-inbox-body-message">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                      </p>
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

export default Message;
