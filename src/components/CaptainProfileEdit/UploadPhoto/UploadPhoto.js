import React from 'react';
import addIcon from './Images/addIcon.svg';
import deleteIcon from './Images/deleteIcon.png';
import { uploadUserPhoto } from '../../../firebase/firebase';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

class PersonalProfile extends React.Component {
  state = { boatImages: [], blobImage: '' };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  upload = (event) => {
    let image = [event.target.files[0]];
    const blob = new Blob(image, { type: 'mime' });
    const imageUrl = URL.createObjectURL(blob);
    this.setState({ blobImage: imageUrl });

    this.setState({
      boatImages: image,
    });
  };

  handleDeletePhoto = (image) => {
    this.setState({
      blobImage: this.state.blobUrl === image ? '' : this.state.blobUrl,
    });
  };

  handleSubmit = async () => {
    if (this.state.boatImages) {
      await uploadUserPhoto(this.props.currentUser, this.state.boatImages);
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
                  Manage profile picture
                </h1>
              </div>
              <div className="personal-information-body">
                <div className="personal-information-body-pic">
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
                        this.state.blobImage
                          ? 'addaboat-separator-line-align-boat-upload-icon-resize'
                          : 'addaboat-separator-line-align-boat-upload-icon'
                      }
                      style={{ margin: '0' }}
                      src={
                        this.state.blobImage ? this.state.blobImage : addIcon
                      }
                      alt="add icon"
                    />

                    <input
                      type="file"
                      className="addaboat-separator-line-align-boat-upload-button"
                      onChange={this.upload}
                      multiple
                    />
                    {this.state.blobImage ? (
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
                      display: this.state.blobImage ? '' : 'none',
                      height: '35px',
                      width: '35px',
                      position: 'absolute',
                      left: '85%',
                      top: '2%',
                      cursor: 'pointer',
                      filter: 'drop-shadow(4px 0px 1px black)',
                    }}
                    onClick={() => this.handleDeletePhoto(this.state.blobImage)}
                  />
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps)(PersonalProfile);
