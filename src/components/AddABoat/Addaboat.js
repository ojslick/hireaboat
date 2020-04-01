import React from 'react';
import SelectCurrency from 'react-select-currency';

import './addaboat.css';
import boat from './images/boat.svg';
import yatch from './images/yatch.svg';
import catamaran from './images/catamaran.svg';
import houseboat from './images/houseboat.svg';
import jetski from './images/jetski.svg';
import motorboat from './images/motorboat.svg';
import rib from './images/rib.svg';
import sailboat from './images/sailboat.svg';

class AddABoat extends React.Component {
  state = {
    yachts: false,
    catamarans: false,
    houseboats: false,
    jetskis: false,
    motorboats: false,
    ribs: false,
    sailboats: false,
    clicks: {
      yachts: '',
      catamarans: '',
      houseboats: '',
      jetskis: '',
      motorboats: '',
      ribs: '',
      sailboats: ''
    }
  };

  debug = selected => {
    console.log(selected);
  };

  onSelectedCurrency = currencyAbbrev => {
    this.debug(`Selected ${currencyAbbrev}`);
  };

  handleClick = (name, click) => {
    let {
      yachts,
      catamarans,
      houseboats,
      jetskis,
      motorboats,
      ribs,
      sailboats
    } = this.state.clicks;

    this.setState({ [name]: click });
  };

  render() {
    let yachts = this.state.yachts ? 'blue-background' : '';
    let catamarans = this.state.catamarans ? 'blue-background' : '';
    let houseboats = this.state.houseboats ? 'blue-background' : '';
    let jetskis = this.state.jetskis ? 'blue-background' : '';
    let motorboats = this.state.motorboats ? 'blue-background' : '';
    let ribs = this.state.ribs ? 'blue-background' : '';
    let sailboats = this.state.sailboats ? 'blue-background' : '';

    return (
      <div className="addaboat-container">
        <div className="addaboat-align">
          <div className="addaboat-sailor">
            <div className="addaboat-sailor-align">
              <div className="addaboat-sailor-design"></div>

              <h1>Sailor! Let's get your boat listed</h1>
              <p>
                Your boat will be visible to our team of sailors interested in
                charter service
              </p>
              <div className="addaboat-sailor-boat-image">
                <img src={boat} alt="design" />
              </div>
            </div>
            <h1 className="addaboat-yourboat">
              Your boat <br />
              <span className="addaboat-boattype">Boat Type</span>
            </h1>
          </div>
        </div>
        <div className="addaboat-select-boattype-container">
          <div className="addaboat-select-boattype-container-align">
            <div
              className={`addaboat-select-boattype-box ${yachts}`}
              onClick={() => this.handleClick('yachts', !this.state.yachts)}
            >
              <img
                src={yatch}
                alt="yacht"
                className={this.state.yachts ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.yachts ? 'white-text' : 'dark-text'}>
                Yacht
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${catamarans}`}
              onClick={() =>
                this.handleClick('catamarans', !this.state.catamarans)
              }
            >
              <img
                src={catamaran}
                alt="yacht"
                className={this.state.catamarans ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.catamarans ? 'white-text' : 'dark-text'}>
                Catamaran
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${houseboats}`}
              onClick={() =>
                this.handleClick('houseboats', !this.state.houseboats)
              }
            >
              <img
                src={houseboat}
                alt="yacht"
                className={this.state.houseboats ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.houseboats ? 'white-text' : 'dark-text'}>
                House Boat
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${jetskis}`}
              onClick={() => this.handleClick('jetskis', !this.state.jetskis)}
            >
              <img
                src={jetski}
                alt="yacht"
                className={this.state.jetskis ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.jetskis ? 'white-text' : 'dark-text'}>
                Jet Ski
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${motorboats}`}
              onClick={() =>
                this.handleClick('motorboats', !this.state.motorboats)
              }
            >
              <img
                src={motorboat}
                alt="yacht"
                className={this.state.motorboats ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.motorboats ? 'white-text' : 'dark-text'}>
                Motor Boat
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${ribs}`}
              onClick={() => this.handleClick('ribs', !this.state.ribs)}
            >
              <img
                src={rib}
                alt="yacht"
                className={this.state.ribs ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.ribs ? 'white-text' : 'dark-text'}>
                RIB
              </p>
            </div>
            <div
              className={`addaboat-select-boattype-box ${sailboats}`}
              onClick={() =>
                this.handleClick('sailboats', !this.state.sailboats)
              }
            >
              <img
                src={sailboat}
                alt="yacht"
                className={this.state.sailboats ? 'white-icon' : 'dark-icon'}
              />
              <p className={this.state.sailboats ? 'white-text' : 'dark-text'}>
                Sail Boat
              </p>
            </div>
          </div>
        </div>
        <div className="addaboat-boat-manufacturer-container">
          <div>
            <label className="add-boat-manufacturer">Boat Manufacturer</label>
            <div className="addaboat-input-align">
              <input
                name="firstname"
                placeholder="Select Manufacturer"
                className="input-manufacturer"
                type="text"
                onChange={event => {
                  event.preventDefault();
                }}
              />
            </div>
          </div>
          <div>
            <label className="add-boat-manufacturer">Boat Model</label>
            <div className="addaboat-input-align">
              <input
                name="firstname"
                placeholder="Select Model"
                className="input-manufacturer"
                type="text"
                onChange={event => {
                  event.preventDefault();
                }}
              />
            </div>
          </div>
        </div>
        <div className="addaboat-boat-manufacturer-container">
          <div>
            <label className="add-boat-manufacturer">City</label>
            <div className="addaboat-input-align">
              <input
                name="firstname"
                placeholder="Which city are you located?"
                className="input-manufacturer"
                type="text"
                onChange={event => {
                  event.preventDefault();
                }}
              />
            </div>
          </div>
          <div>
            <label className="add-boat-manufacturer">Boat Habour</label>
            <div className="addaboat-input-align">
              <input
                name="firstname"
                className="input-manufacturer"
                type="text"
                onChange={event => {
                  event.preventDefault();
                }}
              />
            </div>
          </div>
        </div>
        <div className="addaboat-boat-manufacturer-container">
          <div>
            <label className="add-boat-manufacturer">
              Is your boat with a Captain
            </label>
            <div className="addaboat-input-align">
              <select className="input-manufacturer" placeholder="Choose">
                <option>Select</option>
                <option>Without Captain</option>
                <option>With Captain</option>
              </select>
            </div>
          </div>
        </div>
        <div className="addaboat-boat-manufacturer-container ">
          <div>
            <label className="add-boat-manufacturer">City</label>
            <div className="addaboat-input-align currency">
              <SelectCurrency
                value={'USD'}
                onCurrencySelected={this.onSelectedCurrency}
                className="input-manufacturer currency-input"
              />
            </div>
          </div>
          <div>
            <label className="add-boat-manufacturer">Boat Habour</label>
            <div className="addaboat-input-align currency">
              <input
                className="input"
                name="firstname"
                className="00.00"
                type="text"
                onChange={event => {
                  event.preventDefault();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddABoat;
