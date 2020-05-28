import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import Footer from '../../Footer/Footer';
import { auth, addWithdrawal } from '../../../firebase/firebase';
import firebase from 'firebase';
import { connect } from 'react-redux';

import './earnings.css';

class Earnings extends React.Component {
  state = {
    totalEarnings: '',
    withdrawals: {
      totalAmountWithdrawn: 0,
      currentWithdrawal: '',
      date: new Date().toLocaleDateString(),
      time: new Date(),
    },
    paymentReference: '',
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    const fetchData = async () => {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        const db = firebase.firestore();

        const totalEarningRef = await db
          .collection(`earnings`)
          .doc(`${!userAuth ? 'empty' : userAuth.uid}`)
          .collection('userEarnings')
          .get();

        let total = 0;
        totalEarningRef.docs.forEach((doc) => {
          total += doc.data().amountPayed;
        });

        this.setState({
          withdrawals: { ...this.state.withdrawals, currentWithdrawal: total },
        });
        this.setState({
          totalEarnings: total,
        });

        const withdrawalsRef = await db
          .collection(`withdrawals`)
          .doc(`${!userAuth ? 'empty' : userAuth.uid}`)
          .collection('userWithdrawal')
          .get();

        withdrawalsRef.docs.forEach((doc) => {
          this.setState({ withdrawals: doc.data() });
        });
        withdrawalsRef.docs.forEach((doc) => {
          this.setState({ paymentReference: doc.data() });
        });
      });
    };

    fetchData();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleWithdrawal = async () => {
    const db = firebase.firestore();
    let batch = db.batch();
    try {
      const totalEarningRef = await db
        .collection(`earnings`)
        .doc(`${this.props.currentUser.id}`)
        .collection('userEarnings')
        .get();

      totalEarningRef.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      console.log('response---->', totalEarningRef);
      if (totalEarningRef) {
        const setTotalAmountWithdrawn = async () => {
          this.setState({
            withdrawals: {
              ...this.state.withdrawals,
              totalAmountWithdrawn:
                this.state.withdrawals.currentWithdrawal +
                this.state.withdrawals.totalAmountWithdrawn,
            },
          });
          this.setState({
            withdrawals: {
              ...this.state.withdrawals,
              currentWithdrawal: 0,
            },
          });
        };
        await setTotalAmountWithdrawn();

        addWithdrawal(
          'withdrawals',
          this.props.currentUser.id,
          this.state.withdrawals
        );
      }
    } catch (error) {
      console.log('Error removing document: ', error);
    }
  };

  render() {
    return (
      <div className="earnings-container">
        <ProfileNav />
        <div className="earnings-body">
          <div className="earnings-body-amount-withdrawn">
            <div className="earnings-body-amount-withdrawn-flex">
              <div
                className="earnings-body-amount-withdrawn-flex-withdrawn"
                style={{
                  borderRight: '0.7px solid #C4C4C4',
                }}
              >
                <p className="earnings-body-amount-withdrawn-flex-withdrawn-text">
                  Withdrawn
                </p>
                <p className="earnings-body-amount-withdrawn-flex-withdrawn-number">
                  {this.state.withdrawals.totalAmountWithdrawn}
                </p>
              </div>

              <div className="earnings-body-amount-withdrawn-flex-withdrawn">
                <p className="earnings-body-amount-withdrawn-flex-withdrawn-text">
                  Available for Withdrawal
                </p>
                <p className="earnings-body-amount-withdrawn-flex-withdrawn-number">
                  {`$${this.state.withdrawals.currentWithdrawal}`}
                </p>
              </div>
            </div>
          </div>
          <button
            className="earnings-body-withdraw-button"
            onClick={this.handleWithdrawal}
          >
            Withdraw
          </button>
          <div className="earnings-body-past-payments">
            <div className="earnings-body-past-payments-header">
              <div className="earnings-body-past-payments-date">
                <p className="earnings-body-past-payments-date-text">DATE</p>
              </div>
              <div
                className="earnings-body-past-payments-date"
                style={{ paddingLeft: 0, width: '60%' }}
              >
                <p className="earnings-body-past-payments-date-text">PURPOSE</p>
              </div>
              <div
                className="earnings-body-past-payments-date"
                style={{
                  paddingRight: '43px',
                  textAlign: 'right',
                  width: '15%',
                }}
              >
                <p className="earnings-body-past-payments-date-text">AMOUNT</p>
              </div>
            </div>
            {
              <div className="earnings-body-past-payments-header">
                <div className="earnings-body-past-payments-date">
                  <p className="earnings-body-past-payments-date-text">
                    {this.state.withdrawals.date
                      ? this.state.withdrawals.data
                      : ''}
                  </p>
                </div>
                <div
                  className="earnings-body-past-payments-date"
                  style={{ paddingLeft: 0, width: '60%' }}
                >
                  <p className="earnings-body-past-payments-date-text">
                    Withdrawal Completed Successfully
                  </p>
                </div>
                <div
                  className="earnings-body-past-payments-date"
                  style={{
                    paddingRight: '43px',
                    textAlign: 'right',
                    width: '15%',
                  }}
                >
                  <p
                    className="earnings-body-past-payments-date-text"
                    style={{ color: '#E52836' }}
                  >
                    {`-$${this.state.totalEarnings}`}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps)(Earnings);
