import React from 'react';
import { createUser, login } from '../../actions/index';
import { connect } from 'react-redux';
import userIcon from './Images/user-icon.svg';
import lockIcon from './Images/lock-icon.svg';

import './signup.css';

class SignUp extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    repeat_password: '',
    errors: {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      repeat_password: '',
      message: ''
    },
    error: ''
  };

  //Create a new user in hoodie
  login = newUser => {
    const { createUser } = this.props;
    const { username, password, firstname, lastname } = this.state;

    if (username && password) {
      const loginFunc = createUser;
      loginFunc(username, password, firstname, lastname, err => {
        if (err) this.setState({ error: err.message });
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const validateForm = errors => {
      let valid = true;
      Object.values(errors).forEach(val => val.length > 0 && (valid = false));
      return valid;
    };

    if (validateForm(this.state.errors)) {
      console.info('Valid Form');
    } else {
      console.error('Invalid Form');
    }
  };

  updateForm(name, value) {
    let errors = this.state.errors;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    switch (name) {
      case 'firstname':
        errors.firstname =
          value.length < 1 ? 'Kindly input your First Name' : '';
        break;
      case 'lastname':
        errors.lastname = value.length < 2 ? 'Kindly input your Last Name' : '';
        break;
      case 'username':
        errors.username = validEmailRegex.test(value)
          ? ''
          : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be 8 characters long!' : '';
        break;
      default:
        break;
    }

    this.setState({ [name]: value });
  }

  render() {
    const { errors } = this.state;
    const { error } = this.state;
    return (
      <div className="login-background">
        <div className="login-form-container">
          <form onSubmit={this.handleSubmit} className="login-form">
            <h3>Welcome</h3>
            <div className="input-container">
              <div className="input-align">
                <input
                  name="firstname"
                  placeholder="First Name"
                  className="input-email"
                  type="text"
                  onChange={event => {
                    event.preventDefault();
                    this.updateForm('firstname', event.target.value);
                  }}
                />
              </div>{' '}
            </div>
            {errors.firstname.length > 0 && (
              <span className="form-error">{errors.firstname}</span>
            )}
            <div className="input-container" style={{ marginTop: '10px' }}>
              <div className="input-align">
                <input
                  name="lastname"
                  placeholder="Last Name"
                  className="input-email"
                  type="text"
                  onChange={event => {
                    event.preventDefault();
                    this.updateForm('lastname', event.target.value);
                  }}
                />
              </div>{' '}
            </div>
            {errors.lastname.length > 0 && (
              <span className="form-error">{errors.lastname}</span>
            )}
            <div className="input-container" style={{ marginTop: '10px' }}>
              <div className="input-align">
                <input
                  name="username"
                  placeholder="Email"
                  className="input-email"
                  type="email"
                  onChange={event => {
                    event.preventDefault();
                    this.updateForm('username', event.target.value);
                  }}
                />
              </div>{' '}
            </div>
            {errors.username.length > 0 && (
              <span className="form-error">{errors.username}</span>
            )}
            <div className="input-container" style={{ marginTop: '10px' }}>
              <div className="input-align">
                <input
                  name="password"
                  placeholder="Password"
                  className="input-password"
                  type="password"
                  onChange={evt =>
                    this.updateForm('password', evt.target.value)
                  }
                />
              </div>
            </div>
            {errors.password.length > 0 && (
              <span className="form-error">{errors.password}</span>
            )}
            <div className="input-container" style={{ marginTop: '10px' }}>
              <div className="input-align">
                <input
                  name="repeat_password"
                  placeholder="Repeat Password"
                  className="input-password"
                  type="password"
                  onChange={evt => {
                    const { errors } = this.state;
                    const val = evt.target.value;
                    if (val === this.state.password) {
                      this.setState({
                        errors: { ...errors, ...{ repeat_password: '' } }
                      });
                    } else {
                      this.setState({
                        errors: {
                          ...errors,
                          ...{ repeat_password: "Passwords don't match" }
                        }
                      });
                    }
                  }}
                />
              </div>
            </div>
            {errors.repeat_password.length > 0 && (
              <span className="form-error">{errors.repeat_password}</span>
            )}
            {error.length > 0 && (
              <span className="form-error">This account already exist</span>
            )}
            <div className="forgot-password-container">
              <p className="rememberThisDevice">Remember this device</p>
              <p className="forgot-password">Forgot password?</p>
            </div>
            <button className="submit-button" onClick={() => this.login()}>
              Login
            </button>
            <p className="signup-text">Not a member? Register</p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
};

const mapDispatchToProps = dispatch => ({
  createUser: (username, password, firstname, lastname, cb) =>
    dispatch(createUser(username, password, firstname, lastname, cb)),
  login: (email, password, cb) => dispatch(login(email, password, cb))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
