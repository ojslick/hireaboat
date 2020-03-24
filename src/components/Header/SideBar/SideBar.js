import React from "react";
import cancelIcon from "./icons8-cancel.svg";

import './sidebar.css'

const SideBar = ({ isVisible, handleClick }) => {
  const visible = () => {
    if (isVisible) {
      return "visible";
    } else {
      return "";
    }
  };

  return (
    <div
      className={`ui sidebar ${visible()} inverted overlay animating right vertical menu`}
    >
      <img
        src={cancelIcon}
        alt="cancel icon"
        onClick={handleClick}
        className="cancel"
      />
      <div className="sidebar-items">
        <div className="item">Log In</div>
        <div className="item">Sign Up</div>
        <div className="item">Help</div>
        <div className="item"> List a Boat</div>
      </div>
    </div>
  );
};

export default SideBar;
