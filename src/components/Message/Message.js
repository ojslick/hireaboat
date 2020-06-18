import React from 'react';
import './message.css';
import ProfileNav from '../CaptainProfileEdit/ProfileNav/ProfileNav';
import user from './Images/user.png';
import Footer from '../Footer/Footer';
import history from '../../history';
import { auth } from '../../firebase/firebase';
import firebase from 'firebase';
import Loading from '../Loading/Loading';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import Pagination from 'react-js-pagination';
import { conversation } from '../../actions';
import { connect } from 'react-redux';

class Message extends React.Component {
  state = {
    general: true,
    photos: false,
    messages: '',
    loading: true,
    userType: '',
    activePage: 1,
  };

  unsubscribeFromAuth = null;

  groupBy = (payload, key) => {
    return payload.reduce((prev, curr) => {
      const value = curr[key];
      if (!prev[value]) {
        prev[value] = [curr];
      } else {
        prev[value] = [...prev[value], curr];
      }
      return prev;
    }, []);
  };

  componentDidMount() {
    const fetchData = () => {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        const db = firebase.database();

        let messages = [];

        let uid = '';

        const boatOwnerMessage = async () => {
          const collectionRef = await db
            .ref('messages')
            .orderByChild('boatOwnerUID');
          const ref = collectionRef.equalTo(
            `${!userAuth ? 'empty' : userAuth.uid}`
          );
          return new Promise((resolve, reject) => {
            try {
              ref.on('value', (snapshot) => {
                console.log('snapshotBoatOwner', snapshot.val());

                if (!snapshot.val()) {
                  resolve([]);
                } else {
                  let boatOwnerPushMessages = [];
                  Promise.all(
                    Object.values(snapshot.val()).map(async (snap) => {
                      console.log('boatOwnerSnap', snap);

                      let userType = [];

                      for (let key in snap) {
                        if (key == 'customerUID') {
                          userType.push(snap[key]);
                        } else if (key == 'boatOwnerUID') {
                          userType.push(snap[key]);
                        }
                      }

                      userType.map((id) => {
                        if (id != userAuth.uid) {
                          uid = id;
                        }
                      });

                      console.log('owneruid', uid);

                      const db = firebase.firestore();
                      const userRef = await db
                        .collection(`users`)
                        .doc(`${!snap ? 'empty' : snap.uid}`);
                      try {
                        const userId = await userRef.get();

                        const profilePic = await userId.get(`images`);
                        const firstName = await userId.get(`firstName`);
                        const lastName = await userId.get(`lastName`);
                        const displayName = await userId.get(`displayName`);

                        const userProfile = {
                          profilePic,
                          firstName,
                          lastName,
                          displayName,
                        };

                        boatOwnerPushMessages.push({ ...snap, userProfile });

                        resolve(boatOwnerPushMessages);
                      } catch (err) {
                        console.log('Error getting document:', err);
                        reject(err);
                      }
                    })
                  );
                }
              });
            } catch (err) {
              reject(err);
            }
          });
        };

        const customerMessageFunc = async () => {
          const collectionRef = await db
            .ref('messages')
            .orderByChild('customerUID');
          const ref = collectionRef.equalTo(
            `${!userAuth ? 'empty' : userAuth.uid}`
          );

          return new Promise((resolve, reject) => {
            try {
              ref.on('value', (snapshot) => {
                console.log('snapValCustomer', snapshot.val());

                if (!snapshot.val()) {
                  resolve([]);
                } else {
                  let customerMessage = [];
                  Promise.all(
                    Object.values(snapshot.val()).map(async (snap) => {
                      console.log('customerSnap', snap);

                      let userType = [];

                      for (let key in snap) {
                        if (key == 'customerUID') {
                          userType.push(snap[key]);
                        } else if (key == 'boatOwnerUID') {
                          userType.push(snap[key]);
                        }
                      }

                      userType.map((id) => {
                        if (id != userAuth.uid) {
                          uid = id;
                        }
                      });

                      console.log('customeruid', uid);

                      const db = firebase.firestore();
                      const userRef = await db
                        .collection(`users`)
                        .doc(`${!snap ? 'empty' : snap.uid}`);
                      try {
                        const userId = await userRef.get();

                        const profilePic = await userId.get(`images`);
                        const firstName = await userId.get(`firstName`);
                        const lastName = await userId.get(`lastName`);
                        const displayName = await userId.get(`displayName`);

                        const userProfile = {
                          profilePic,
                          firstName,
                          lastName,
                          displayName,
                        };

                        customerMessage.push({ ...snap, userProfile });

                        resolve(customerMessage);
                      } catch (err) {
                        console.log('Error getting document:', err);
                        reject(err);
                      }
                    })
                  );
                }
              });
            } catch (err) {
              reject(err);
            }
          });
        };

        // console.log('boatOwnerPromise', boatOwnerMessage());
        // console.log('customerPromise', customerMessageFunc());

        Promise.all([boatOwnerMessage(), customerMessageFunc()]).then(
          async (response) => {
            console.log('response', response);
            function flatten(arr) {
              const result = [];
              arr.forEach((val) => {
                if (Array.isArray(val)) {
                  result.push(...val);
                } else {
                  result.push(val);
                }
              });
              return result;
            }

            const flattedMessage = flatten(response);

            console.log('flattedMessage', flattedMessage);

            const checkData = await Promise.all(flattedMessage);

            const newData = [];

            // flattedMessage.map((item) => {
            //   console.log('itemhdkd', item);
            //   item.map((obj) => newData.push(obj));
            // });

            const userType =
              uid == userAuth.uid ? 'boatOwnerUID' : 'customerUID';

            console.log('usertypehdfjh', userType);

            messages = await this.groupBy(flattedMessage, userType);

            this.setState({ messages, loading: false });
          }
        );
      });
    };

    fetchData();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
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
  };

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  };
  render() {
    const messagesArr = Object.values(this.state.messages);
    console.log('stateMessage', this.state.messages);
    messagesArr.reverse();
    const sortedArr = Object.values(this.state.messages)
      .reverse()
      .map((item) => item.reverse());

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
            {!messagesArr.length && <div />}

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
                {this.state.loading ? (
                  <div
                    className="message-inbox-body"
                    style={{ borderBottom: 'none' }}
                  >
                    <Loader active inline="centered">
                      Loading
                    </Loader>
                  </div>
                ) : (
                  messagesArr.map((messageArr, index) => {
                    console.log('messagehihdshd', messageArr[0]);
                    const data = messageArr[0];

                    return messageArr.length > 0 ? (
                      <div
                        className="message-inbox-body"
                        onClick={() => {
                          history.push('/message/conversation');
                          this.props.conversation(messagesArr[index]);
                        }}
                        key={index}
                      >
                        <div className="message-inbox-body-profile-pic">
                          <img
                            className="message-inbox-body-profile-pic-size"
                            src={
                              data.userProfile.profilePic
                                ? data.userProfile.profilePic
                                : user
                            }
                          />
                        </div>
                        <div className="message-inbox-body-username-container">
                          <p className="message-inbox-body-username">
                            {messageArr.length > 0
                              ? data.userProfile.firstName
                                ? `${data.userProfile.firstName} ${data.userProfile.lastName}`
                                : data.userProfile.displayName
                              : ''}
                          </p>
                          <p className="message-inbox-body-date">{data.date}</p>
                        </div>
                        <div className="message-inbox-body-message-container">
                          <p className="message-inbox-body-message">
                            {messageArr.length > 0
                              ? `${data.message.slice(
                                  0,
                                  window.innerWidth < 1020 ? 40 : 150
                                )} 
                            ${
                              window.innerWidth < 1020
                                ? data.message.length > 40
                                  ? '...'
                                  : ''
                                : data.message.length > 150
                                ? '...'
                                : ''
                            }`
                              : ''}
                          </p>
                        </div>
                      </div>
                    ) : (
                      ''
                    );
                  })
                )}
              </div>
            </div>

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
        <div style={{ display: 'inline-block', marginTop: '20px' }}>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={messagesArr.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(null, { conversation })(Message);
