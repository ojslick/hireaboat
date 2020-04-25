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
import { auth, createUserProfileDocument } from '../firebase/firebase';

class App extends React.Component {
  state = { currentUser: null };

  unsubscribeFromAuth = null;

  // Monitor connection status to the Hoodie store
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log(this.state);
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { auth, connectionStatus, logout, checkUser } = this.props;

    return (
      <div>
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
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect()(App);
