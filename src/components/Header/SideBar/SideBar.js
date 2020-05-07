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
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/aboutus');
              }}
            >
              About Us
            </div>
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/help');
              }}
            >
              Help
            </div>
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/profile');
              }}
            >
              My Account
            </div>

            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/listaboat');
              }}
            >
              List a Boat
            </div>
            <div
              className="item"
              onClick={async () => {
                await this.props.auth.signOut();
                await this.props.handleClick();
                history.push('/');
              }}
            >
              Sign Out
            </div>
          </div>
        ) : (
          <div className="sidebar-items">
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/login');
              }}
            >
              Sign In
            </div>
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/signup');
              }}
            >
              Sign Up
            </div>
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/help');
              }}
            >
              Help
            </div>
            <div
              className="item"
              onClick={async () => {
                await this.props.handleClick();
                history.push('/aboutus');
              }}
            >
              About Us
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SideBar;
