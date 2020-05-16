import React from 'react';
import captainIcon from './Images/Vector1.svg';
import anchorIcon from './Images/Vector2.svg';

class BoatingQualification extends React.Component {
  state = { captain: false, notACaptain: false };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick = (name, value) => {
    if (name == 'captain') {
      this.setState({ captain: value });
      this.setState({ notACaptain: false });
    }
    if (name == 'notACaptain') {
      this.setState({ captain: false });
      this.setState({ notACaptain: value });
    }
  };

  render() {
    return (
      <>
        {this.props.handleGeneralClick ? (
          <div className="personal-profile-right">
            <div
              className="personal-profile-right-container"
              style={{ minHeight: '200px' }}
            >
              <div className="personal-information-header">
                <h1 className="personal-information-header-text">
                  Sailing Status
                </h1>
              </div>
              <div
                className="personal-information-body"
                style={{ textAlign: 'center' }}
              >
                <div className="boating-qualification-captain-license">
                  <p className="boating-qualification-captain-license-text">
                    Select a captain if you have a Valid License
                  </p>
                </div>
                <div className="boating-qualification-captain-flex">
                  <div
                    className={
                      this.state.captain
                        ? 'boating-qualification-captain-blue'
                        : 'boating-qualification-captain'
                    }
                    onClick={() => this.handleClick('captain', true)}
                  >
                    <img
                      src={captainIcon}
                      alt="icon"
                      className={
                        this.state.captain
                          ? 'boating-qualification-captain-image-blue'
                          : 'boating-qualification-captain-image'
                      }
                    />
                    <p
                      className={
                        this.state.captain
                          ? 'boating-qualification-captain-image-text-white'
                          : 'boating-qualification-captain-image-text'
                      }
                    >
                      I am a captain
                    </p>
                  </div>
                  <div
                    className={
                      this.state.notACaptain
                        ? 'boating-qualification-captain-blue'
                        : 'boating-qualification-captain'
                    }
                    onClick={() => this.handleClick('notACaptain', true)}
                  >
                    <img
                      src={anchorIcon}
                      alt="icon"
                      className={
                        this.state.notACaptain
                          ? 'boating-qualification-captain-image-blue'
                          : 'boating-qualification-captain-image'
                      }
                    />
                    <p
                      className={
                        this.state.notACaptain
                          ? 'boating-qualification-captain-image-text-white'
                          : 'boating-qualification-captain-image-text'
                      }
                    >
                      Not a captain
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="personal-profile-right-container"
              style={{ minHeight: '200px', marginTop: '28px' }}
            >
              <div className="personal-information-header">
                <h1 className="personal-information-header-text">
                  Sailing Resume
                </h1>
              </div>
              <div
                className="personal-information-body"
                style={{ textAlign: 'center' }}
              >
                <div
                  className="personal-information-firstname-container-text"
                  style={{
                    width: '20%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    Years of Experience
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
                    Sailing resume
                  </label>
                  <textarea
                    type="text"
                    className="personal-information-name-firstname"
                    style={{ height: '166px' }}
                  />
                </div>
              </div>
            </div>
            <div
              className="personal-profile-right-container"
              style={{ minHeight: '200px', marginTop: '28px' }}
            >
              <div className="personal-information-header">
                <h1 className="personal-information-header-text">
                  Boat Experience
                </h1>
              </div>
              <div
                className="personal-information-body"
                style={{ textAlign: 'center' }}
              ></div>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default BoatingQualification;
