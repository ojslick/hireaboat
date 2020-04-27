import React from 'react';
import { Link } from 'react-router-dom';
import cancelIcon from './icons8-cancel.svg';
import history from '../../../history';

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
    console.log('authprops===>', this.props.auth);
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
        {this.props.currentUser ? (
          <div className="sidebar-items">
            <Link to="/profile" className="item">
              My Account
            </Link>
            <Link to="/help" className="item">
              Help
            </Link>
            <Link to="/listaboat" className="item">
              {' '}
              List a Boat
            </Link>
            <div
              className="item"
              onClick={async () => {
                await this.props.auth.signOut();
                history.push('/');
              }}
            >
              Sign Out
            </div>
          </div>
        ) : (
          <div className="sidebar-items">
            <Link to="/login" className="item">
              Sign In
            </Link>
            <Link to="/signup" className="item">
              Sign Up
            </Link>
            <Link to="/help" className="item">
              Help
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default SideBar;
