import React from 'react';
import addIcon from './Images/addIcon.svg';
import deleteIcon from './Images/deleteIcon.png';
import captainIcon from './Images/Vector1.svg';
import anchorIcon from './Images/Vector2.svg';
import { Checkbox } from 'semantic-ui-react';
import { uploadBoatingQualification } from '../../../firebase/firebase';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

class BoatingQualification extends React.Component {
  state = {
    captain: false,
    notACaptain: false,
    boatingQualification: {
      blobImage: '',
      sailingStatus: '',
      sailingResume: '',
      boatingExperience: '',
      boatDriven: [],
    },
    boatImages: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = async () => {
    const {
      sailingResume,
      sailingStatus,
      boatingExperience,
      boatDriven,
    } = this.state.boatingQualification;
    if ((sailingResume, sailingStatus, boatingExperience, boatDriven)) {
      await uploadBoatingQualification(
        this.props.currentUser,
        this.state.boatingQualification,
        this.state.boatImages
      );
      toast.success('Saved Successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

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

  upload = async (event) => {
    let image = [event.target.files[0]];
    const blob = new Blob(image, { type: 'mime' });
    const imageUrl = URL.createObjectURL(blob);
    console.log('imageUrl==>', imageUrl);
    await this.setState({
      boatingQualification: {
        ...this.state.boatingQualification,
        blobImage: imageUrl,
      },
    });

    this.setState({
      boatImages: image,
    });
  };

  handleDeletePhoto = (image) => {
    this.setState({
      boatingQualification: {
        ...this.state.BoatingQualification,
        blobImage:
          this.state.boatingQualification.blobImage === image
            ? ''
            : this.state.boatingQualification.blobImage,
      },
    });
  };

  render() {
    console.log('state===>', this.state);
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
                    onClick={() => {
                      this.handleClick('captain', true);
                      this.setState({
                        boatingQualification: {
                          ...this.state.boatingQualification,
                          sailingStatus: 'I am a captain',
                        },
                      });
                    }}
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
                    onClick={() => {
                      this.handleClick('notACaptain', true);
                      this.setState({
                        boatingQualification: {
                          ...this.state.boatingQualification,
                          sailingStatus: 'Not a captain',
                        },
                      });
                    }}
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
                    type="number"
                    className="personal-information-name-firstname"
                    onChange={(event) =>
                      this.setState({
                        boatingQualification: {
                          ...this.state.boatingQualification,
                          boatingExperience: event.target.value,
                        },
                      })
                    }
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
                    onChange={(event) =>
                      this.setState({
                        boatingQualification: {
                          ...this.state.boatingQualification,
                          sailingResume: event.target.value,
                        },
                      })
                    }
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
                style={{ textAlign: 'start' }}
              >
                <p className="boat-experience-boat-driven-text">
                  Type of boat driven
                </p>
                <div
                  style={{
                    marginTop: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '55%',
                  }}
                >
                  <div style={{ width: '20%' }}>
                    <Checkbox
                      label="JetSki"
                      onChange={() =>
                        this.setState({
                          boatingQualification: {
                            ...this.state.boatingQualification,
                            boatDriven: [
                              ...this.state.boatingQualification.boatDriven,
                              'Jet Ski',
                            ],
                          },
                        })
                      }
                    />
                    <Checkbox
                      label="Yacht"
                      className="boat-experience-boat-driven-checkbox"
                      onChange={() =>
                        this.setState({
                          boatingQualification: {
                            ...this.state.boatingQualification,
                            boatDriven: [
                              ...this.state.boatingQualification.boatDriven,
                              'Yacht',
                            ],
                          },
                        })
                      }
                    />
                    <Checkbox
                      label="Catamaran"
                      className="boat-experience-boat-driven-checkbox"
                      onChange={() =>
                        this.setState({
                          boatingQualification: {
                            ...this.state.boatingQualification,
                            boatDriven: [
                              ...this.state.boatingQualification.boatDriven,
                              'Catamaran',
                            ],
                          },
                        })
                      }
                    />
                    <Checkbox
                      label="Motorboat"
                      className="boat-experience-boat-driven-checkbox"
                      onChange={() =>
                        this.setState({
                          boatingQualification: {
                            ...this.state.boatingQualification,
                            boatDriven: [
                              ...this.state.boatingQualification.boatDriven,
                              'Motorboat',
                            ],
                          },
                        })
                      }
                    />
                  </div>
                  <div style={{ width: '20%' }}>
                    <Checkbox
                      label="Sailboat"
                      onChange={() =>
                        this.setState({
                          boatingQualification: {
                            ...this.state.boatingQualification,
                            boatDriven: [
                              ...this.state.boatingQualification.boatDriven,
                              'Sailboat',
                            ],
                          },
                        })
                      }
                    />
                    <Checkbox
                      label="RIB"
                      className="boat-experience-boat-driven-checkbox"
                      onChange={() =>
                        this.setState({
                          boatingQualification: {
                            ...this.state.boatingQualification,
                            boatDriven: [
                              ...this.state.boatingQualification.boatDriven,
                              'RIB',
                            ],
                          },
                        })
                      }
                    />
                    <Checkbox
                      label="Houseboat"
                      className="boat-experience-boat-driven-checkbox"
                      onChange={() =>
                        this.setState({
                          boatingQualification: {
                            ...this.state.boatingQualification,
                            boatDriven: [
                              ...this.state.boatingQualification.boatDriven,
                              'Houseboat',
                            ],
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {this.state.captain ? (
              <div
                className="personal-profile-right-container"
                style={{ minHeight: '200px', marginTop: '28px' }}
              >
                <div className="personal-information-header">
                  <h1 className="personal-information-header-text">
                    Captain License
                  </h1>
                </div>
                <div
                  className="personal-information-body"
                  style={{ textAlign: 'center' }}
                >
                  <div
                    className="boating-qualification-captain-license"
                    style={{ width: '70%' }}
                  >
                    <p className="boating-qualification-captain-license-text">
                      Upload a scanned visible image of your valid Captain’s
                      license to enable us verify you
                    </p>
                  </div>
                  <div
                    className="personal-information-body-pic"
                    style={{ marginTop: '14px' }}
                  >
                    <label
                      style={{
                        display: 'table-cell',
                        verticalAlign: 'middle',
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                      }}
                    >
                      <img
                        className={
                          this.state.boatingQualification.blobImage
                            ? 'addaboat-separator-line-align-boat-upload-icon-resize'
                            : 'addaboat-separator-line-align-boat-upload-icon'
                        }
                        style={{ margin: '0' }}
                        src={
                          this.state.boatingQualification.blobImage
                            ? this.state.boatingQualification.blobImage
                            : addIcon
                        }
                        alt="add icon"
                      />

                      <input
                        type="file"
                        className="addaboat-separator-line-align-boat-upload-button"
                        onChange={this.upload}
                        multiple
                      />
                      {this.state.boatingQualification.blobImage ? (
                        ''
                      ) : (
                        <p style={{ marginTop: '13px', color: '#343434' }}>
                          Add Image
                        </p>
                      )}
                    </label>
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      style={{
                        display: this.state.boatingQualification.blobImage
                          ? ''
                          : 'none',
                        height: '35px',
                        width: '35px',
                        position: 'absolute',
                        left: '85%',
                        top: '2%',
                        cursor: 'pointer',
                        filter: 'drop-shadow(4px 0px 1px black)',
                      }}
                      onClick={() =>
                        this.handleDeletePhoto(
                          this.state.boatingQualification.blobImage
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <button
              className="personal-information-button"
              style={{ float: 'left' }}
              onClick={this.handleSubmit}
            >
              Save
            </button>
            <ToastContainer />
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps)(BoatingQualification);
