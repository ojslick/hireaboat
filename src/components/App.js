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

class App extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.checkUser();
  }

  // Monitor connection status to the Hoodie store
  componentDidMount() {
    const { connectionStatus } = this.props.hoodie;
    connectionStatus.startChecking({ interval: 3000 });
    connectionStatus.on('disconnect', () => {
      this.props.updateStatus(false);
    });
    connectionStatus.on('reconnect', () => {
      this.props.updateStatus(true);
    });
  }

  render() {
    const { auth, connectionStatus, logout, checkUser } = this.props;
    return (
      <div>
        <Router history={history}>
          <NavBar auth={auth && auth.username} handleLogOut={logout} />
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
