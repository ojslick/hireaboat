import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import NavBar from './Header/NavBar/NavBar';
import LandingPage from './Landing-page/LandingPage';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import AddABoat from './AddABoat/Addaboat';
import boatResult from './boatResult/boatResult';
import SelectBoat from './SelectBoat/SelectBoat';
import AddaboatSuccessful from './AddABoat/AddaboatSuccessful/AddaboatSuccessful';
import Loading from '../components/Loading/Loading';
import Help from './Help/Help';
import AboutUs from './AboutUs/AboutUs';
import ContactUs from './ContactUs/ContactUs';
import PaymentCheckOut from './PaymentCheckout/PaymentCheckOut';
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocument,
} from '../firebase/firebase';
import { currentUser } from '../actions/';

class App extends React.Component {
  state = { currentUser: null, loading: false };

  unsubscribeFromAuth = null;

  // Monitor connection status to the Hoodie store
  componentDidMount() {
    const { addBoat } = this.props;
    this.setState({ loading: true });
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }

      this.setState({ currentUser: userAuth });
      this.setState({ loading: false });
    });
  }

  componentDidUpdate() {
    this.props.currentUser(this.state.currentUser);
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { auth, connectionStatus, logout, checkUser } = this.props;

    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <Router history={history}>
            <NavBar
              auth={auth && auth.username}
              handleLogOut={logout}
              currentUser={this.state.currentUser}
            />
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/listaboat" exact component={AddABoat} />
              <Route path="/boatresult" exact component={boatResult} />
              <Route path="/selectboat" exact component={SelectBoat} />
              <Route
                path="/listaboat/successful"
                exact
                component={AddaboatSuccessful}
              />
              <Route path="/help" exact component={Help} />
              <Route path="/aboutus" exact component={AboutUs} />
              <Route path="/contact" exact component={ContactUs} />
              <Route
                path="/selectboat/checkout"
                exact
                component={PaymentCheckOut}
              />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { addBoat: state.hireaboat };
};

export default connect(mapStateToProps, { currentUser })(App);
