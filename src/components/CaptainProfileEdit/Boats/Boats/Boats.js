import React from 'react';
import addIcon from './Images/addIcon.svg';
import deleteIcon from './Images/deleteIcon.png';
import captainIcon from './Images/Vector1.svg';
import anchorIcon from './Images/Vector2.svg';
import { Checkbox } from 'semantic-ui-react';
import {
  auth,
  uploadBoatingQualification,
} from '../../../../firebase/firebase';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';

class Boat extends React.Component {
  state = {};

  unsubscribeFromAuth = null;

  componentDidMount() {
    window.scrollTo(0, 0);

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const db = firebase.firestore();

      const docRef = await db
        .collection(`users`)
        .doc(`${!userAuth ? 'empty' : userAuth.uid}`);

      const data = await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.setState({ boatingQualification: doc.data() });
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });

      console.log('docRef==>', docRef);
      console.log('data===>', data);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleSubmit = async () => {};

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
                <h1 className="personal-information-header-text">Boats</h1>
              </div>
              <div
                className="personal-information-body"
                style={{ textAlign: 'center' }}
              >
                {/* TODO: Render body */}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { userProfile: state.userProfile, currentUser: state.currentUser };
};

export default connect(mapStateToProps)(Boat);
