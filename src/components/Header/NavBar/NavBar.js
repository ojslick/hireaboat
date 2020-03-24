import React from "react";
import logo from "./logo1.svg";
import SideBar from "../SideBar/SideBar";
import burgerMenu from "./icons8-menu.svg";

import "./navbar.css";

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
      return "dimmed";
    } else {
      return "";
    }
  };

  render() {
    
    return (
      <div>
        <div>
          <div className="ui tiny menu">
            <div className="ui hamburger small image">
              <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="hamburger right menu" onClick={this.handleClick}>
              <img src={burgerMenu} className="hamburger-icon" />
            </div>
          </div>
          <SideBar
            isVisible={this.state.visible}
            handleClick={this.handleClick}
          />
          <div className={`pusher ${this.isDimmed()}`} onClick={this.handleClick}></div>
        </div>
        <div className="ui large menu" style={{ marginTop: "0px" }}>
          <div className="ui fullscreen small image">
            <img src={logo} alt="logo" className="logo" />
          </div>

          <div className="fullscreen right menu">
            <div className="item">Log In</div>
            <div className="item">Sign Up</div>
            <div className="item">Help</div>
            <div className="item">
              <div className="ui primary button">List a Boat</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
