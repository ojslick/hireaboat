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

class Message extends React.Component {
  state = {
    general: true,
    photos: false,
    messages: '',
    loading: true,
    userType: '',
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
    const fetchData = async () => {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        const db = firebase.firestore();

        let messages = [];

        const boatOwnerMessage = async () => {
          const messageRef = await db
            .collection('messages')
            .where(
              'boatOwnerUID',
              '==',
              `${!userAuth ? 'empty' : userAuth.uid}`
            )
            .get();

          messageRef.docs.map(async (snapshot) => {
            const userRef = await db
              .collection(`users`)
              .doc(
                `${
                  !snapshot.data() ? 'empty' : snapshot.data().currentMessageUID
                }`
              );

            try {
              const userId = await userRef.get();

              const profilePic = await userId.get(`images`);
              const firstName = await userId.get(`firstName`);
              const lastName = await userId.get(`lastName`);
              const displayName = await userId.get(`displayName`);

              await messages.push({
                ...snapshot.data(),
                userProfile: {
                  profilePic,
                  firstName,
                  lastName,
                  displayName,
                },
              });
            } catch (err) {
              console.log('Error getting document:', err);
            }
          });
        };

        await boatOwnerMessage();

        const customerMessageFunc = async () => {
          const customerMessage = await db
            .collection('messages')
            .where('customerUID', '==', `${!userAuth ? 'empty' : userAuth.uid}`)
            .get();

          customerMessage.docs.map(async (snapshot) => {
            const userRef = await db
              .collection(`users`)
              .doc(
                `${
                  !snapshot.data() ? 'empty' : snapshot.data().currentMessageUID
                }`
              );

            try {
              const userId = await userRef.get();

              const profilePic = userId.get(`images`);
              const firstName = userId.get(`firstName`);
              const lastName = userId.get(`lastName`);
              const displayName = userId.get(`displayName`);

              messages.push({
                ...snapshot.data(),
                userProfile: {
                  profilePic,
                  firstName,
                  lastName,
                  displayName,
                },
              });
            } catch (err) {
              console.log('Error getting document:', err);
            }

            // userRef
            //   .get()
            //   .then((doc) => {
            //     console.log('messages', messages);
            //     if (doc.exists) {
            //       messages.push({
            //         ...snapshot.data(),
            //         userProfile: doc.data(),
            //       });
            //     } else {
            //       // doc.data() will be undefined in this case
            //       console.log('No such document!');
            //     }
            //   })
            //   .catch(function (error) {
            //     console.log('Error getting document:', error);
            //   });
          });
        };

        await customerMessageFunc();

        const key = boatOwnerMessage.length ? 'boatOwnerUID' : 'customerUID';

        boatOwnerMessage.length
          ? this.setState({ userType: 'boatOwner' })
          : this.setState({ userType: 'customerUID' });

        messages = this.groupBy(messages, key);

        this.setState({ messages, loading: false });
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
  render() {
    console.log('stateMessage', this.state.messages);
    const messagesArr = Object.values(this.state.messages);
    console.log('messageArr', messagesArr);
    console.log('screenWidth', window.innerWidth);

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
                  messagesArr.map((messageArr) => {
                    const data = messageArr[0];

                    return messageArr.length > 0 ? (
                      <div
                        className="message-inbox-body"
                        onClick={() => history.push('/message/conversation')}
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
                            {this.state.messages
                              ? data.userProfile.firstName
                                ? `${data.userProfile.firstName} ${data.userProfile.lastName}`
                                : data.userProfile.displayName
                              : ''}
                          </p>
                          <p className="message-inbox-body-date">{data.date}</p>
                        </div>
                        <div className="message-inbox-body-message-container">
                          <p className="message-inbox-body-message">
                            {data.message.slice(
                              0,
                              window.innerWidth < 1020 ? 40 : 150
                            )}
                            {window.innerWidth < 1020
                              ? data.message.length > 40
                                ? '...'
                                : ''
                              : data.message.length > 150
                              ? '...'
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
        <Footer />
      </div>
    );
  }
}

export default Message;
