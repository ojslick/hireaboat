import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo1.svg';
import SideBar from '../SideBar/SideBar';
import burgerMenu from './icons8-menu.svg';

import './navbar.css';

class NavBar extends React.Component {
  state = { visible: false, dimmed: false };

  handleClick = e => {
    e.preventDefault();
    if (this.state.visible) {
      this.setState({ visible: false });
    } else {
      this.setState({ visible: true });
    }
  };

  isDimmed = () => {
    if (this.state.visible) {
      return 'dimmed';
    } else {
      return '';
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className="ui tiny menu">
            <Link to="/" className="ui hamburger small image">
              <img src={logo} alt="logo" className="logo" />
            </Link>
            <div className="hamburger right menu" onClick={this.handleClick}>
              <img src={burgerMenu} className="hamburger-icon" />
            </div>
          </div>
          <SideBar
            isVisible={this.state.visible}
            handleClick={this.handleClick}
            auth={this.props.auth}
            handleLogOut={this.props.handleLogOut}
          />
          <div
            className={`pusher ${this.isDimmed()}`}
            onClick={this.handleClick}
          ></div>
        </div>
        {this.props.auth ? (
          <div className="ui large menu" style={{ marginTop: '0px' }}>
            <Link to="/" className="ui fullscreen small image">
              <img src={logo} alt="logo" className="logo" />
            </Link>

            <div className="fullscreen right menu">
              <Link to="/help" className="item item3">
                Help
              </Link>
              <Link to="/profile" className="item item2">
                My Account
              </Link>
              <div className="item item2" onClick={this.props.handleLogOut}>
                Log Out
              </div>
              <Link to="/listaboat" className="item">
                <div className="ui primary button">List a Boat</div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="ui large menu" style={{ marginTop: '0px' }}>
            <Link to="/" className="ui fullscreen small image">
              <img src={logo} alt="logo" className="logo" />
            </Link>

            <div className="fullscreen right menu">
              <Link to="/login" className="item item1">
                Log In
              </Link>
              <Link to="/signUp" className="item item2">
                Sign Up
              </Link>
              <Link to="/help" className="item item3">
                Help
              </Link>
              <Link to="/listaboat" className="item">
                <div className="ui primary button">List a Boat</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NavBar;
