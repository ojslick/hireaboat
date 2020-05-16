import React from 'react';
import addIcon from './Images/addIcon.svg';

class PersonalProfile extends React.Component {
  state = { boatImages: '', blobImage: '' };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  upload = (event) => {
    let image = [event.target.files[0]];
    console.log('===>uipload', image);
    const blob = new Blob(image, { type: 'mime' });
    const imageUrl = URL.createObjectURL(blob);
    this.setState({ blobImage: imageUrl });

    this.setState({
      boatImages: [...this.state.boatImages, image],
    });
  };

  handleDeletePhoto = (image) => {
    this.setState({
      boatImages: this.state.boatImages.filter((url) => {
        return url !== image;
      }),
    });
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
                        this.state.boatImages ? this.state.blobImage : addIcon
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
