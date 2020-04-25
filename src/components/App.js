import React from 'react';
import { connect } from 'react-redux';
import { checkUser, logout } from '../actions/index';
import { connectionStatus } from '../actions/index';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import NavBar from './Header/NavBar/NavBar';
import LandingPage from './Landing-page/LandingPage';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import AddABoat from './AddABoat/Addaboat';
import boatResult from './boatResult/boatResult';
import SelectBoat from './SelectBoat/SelectBoat';
import { auth } from '../firebase/firebase';

class App extends React.Component {
  state = { currentUser: null };

  UNSAFE_componentWillMount() {
    this.props.checkUser();
  }

  unsubscribeFromAuth = null;

  // Monitor connection status to the Hoodie store
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log(process.env);
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

const mapStateToProps = ({ auth, hoodie, connectionStatus }) => ({
  auth,
  hoodie,
  connectionStatus
});

const mapDispatchToProps = dispatch => ({
  checkUser: () => dispatch(checkUser()),
  logout: () => dispatch(logout()),
  updateStatus: newStatus => dispatch(connectionStatus(newStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
