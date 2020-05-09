import React from 'react';

import Search from './Search/Search';
import boatIcon from './images/boat.svg';
import worldIcon from './images/world.svg';
import wage from './images/wage.svg';
import './landingPage.css';

class LandingPage extends React.Component {
  state = { screenSize: 0 };

  componentDidMount() {
    this.setState({ screenSize: window.innerWidth });

    window.scrollTo(0, 0);
  }

  screenSize = () => {
    if (this.state.screenSize < 426) {
      return 'large';
    } else {
      return 'massive';
    }
  };

  render() {
    return (
      <div>
        <div className="background-pic">
          <div className="get-your-boat-container">
            <h1 className="get-your-boat-bold-text">
              Let's get you your boats
            </h1>
            <p className="get-your-boat-intro-text">
              More than 35,000 private yachts rental and bareboat charters
              around the world to help you make the right choice
            </p>
            <Search size={this.screenSize()} />
            <button className="ui primary button explore-boats">
              Explore Boats
            </button>
          </div>
        </div>
        <div className="generate-income">
          <div className="generate-income-boat">
            <img src={boatIcon} alt="Over 3000+ boats" />
            <p>Add over 3000+ boats</p>
          </div>
          <div className="generate-income-boat">
            <img src={wage} alt="Add your boat and generate income " />
            <p>Add your boat and generate income</p>
          </div>
          <div className="generate-income-boat">
            <img
              src={worldIcon}
              alt="We have destinations all over the world"
            />
            <p>We have destinations all over the world</p>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
