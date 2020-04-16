import React from 'react';
import { Link } from 'react-router-dom';
import cancelIcon from './icons8-cancel.svg';

import './sidebar.css';

class SideBar extends React.Component {
  visible = () => {
    if (this.props.isVisible) {
      return 'visible';
    } else {
      return '';
    }
  };

  render() {
    return (
      <div
        className={`ui sidebar ${this.visible()} inverted overlay animating right vertical menu`}
      >
        <img
          src={cancelIcon}
          alt="cancel icon"
          onClick={this.props.handleClick}
          className="cancel"
        />
        {this.props.auth ? (
          <div className="sidebar-items">
            <Link to="/profile" className="item">
              My Account
            </Link>
            <Link to="/help" className="item">
              Help
            </Link>
            <div to="/listaboat" className="item">
              {' '}
              List a Boat
            </div>
            <div className="item" onClick={this.props.handleLogOut}>
              LogOut
            </div>
          </div>
        ) : (
          <div className="sidebar-items">
            <Link to="/login" className="item">
              Log In
            </Link>
            <Link to="/signup" className="item">
              Sign Up
            </Link>
            <Link to="/help" className="item">
              Help
            </Link>
            <div to="/listaboat" className="item">
              {' '}
              List a Boat
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SideBar;
