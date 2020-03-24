import React from "react";

import Search from "./Search/Search";

import "./landingPage.css";

class LandingPage extends React.Component {
  state = { screenSize: 0 };

  componentDidMount() {
    this.setState({screenSize: window.innerWidth})
  }

  screenSize = () => {
    if (this.state.screenSize < 426) {
      return "small";
    } else {
      return "massive";
    }
  };

  render() {
    console.log(this.state.screenSize)
    return (
      <div className="background-pic">
        <div className="get-your-boat-container">
          <h1 className="get-your-boat-bold-text">Let's get you your boat</h1>
          <p className="get-your-boat-intro-text">
            More than 35,000 private yachts rental and bareboat charters around
            the world to help you make the right choice
          </p>
          <Search size={this.screenSize()}/>
          <button className="ui primary button explore-boats">Explore Boats</button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
