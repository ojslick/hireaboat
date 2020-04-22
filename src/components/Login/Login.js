import React from 'react';
import { createUser, login, checkUser } from '../../actions/index';
import { connect } from 'react-redux';
import userIcon from './Images/user-icon.svg';
import lockIcon from './Images/lock-icon.svg';
import lineIcon from './Images/line.svg';
import facebookIcon from './Images/facebookIcon.svg';
import googleIcon from './Images/googleIcon.svg';
import history from '../../history';
import { Redirect } from 'react-router';

import './login.css';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
      message: ''
    },
    error: ''
  };

  // UNSAFE_componentWillMount() {
  //   this.props.checkUser();
  // }

  //Create a new user in hoodie
  login = () => {
    const { username, password } = this.state;
    const { login } = this.props;
    if (username && password) {
      const loginFunc = login;
      // login
      //   ? history.push('/')
      //   : this.setState({ error: 'Email or Password is incorrect' });
      loginFunc(username, password, err => {
        if (err) {
          this.setState({ error: err.message });
        }
      });
    } else {
      this.setState({ error: 'You must input a username and password' });
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
    console.log(process.env);
    const { errors } = this.state;
    console.log(errors);
    return (
      <div className="login-background">
        <div className="login-form-container">
          <form onSubmit={this.handleSubmit} className="login-form">
            <h3>Welcome</h3>
            <div className="input-container">
              <div className="input-align">
                <img src={userIcon} alt="email" />
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
                <img src={lockIcon} alt="password" />
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
            <div className="forgot-password-container">
              <p className="rememberThisDevice">Remember this device</p>
              <p className="forgot-password">Forgot password?</p>
            </div>
            <div className="separator-line">
              <div className="first-line">
                <img src={lineIcon} width="115px" alt="line" />
              </div>
              or{' '}
              <div className="second-line">
                <img src={lineIcon} width="115px" alt="line" />
              </div>
            </div>
            <div className="oauth-container">
              <button
                className="login-with-facebook"
                onClick={e => e.preventDefault()}
              >
                <img
                  src={facebookIcon}
                  alt="Login with facebook"
                  className="facebook-icon"
                />
                <p>Login with Facebook</p>
              </button>
            </div>
            <div className="oauth-container">
              <button
                className="login-with-facebook"
                onClick={e => e.preventDefault()}
              >
                <img
                  src={googleIcon}
                  alt="Login with facebook"
                  className="facebook-icon"
                />
                <p>Login with Google</p>
              </button>
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
  return { auth: state.auth };
};

const mapDispatchToProps = dispatch => ({
  login: (email, password, cb) => dispatch(login(email, password, cb)),
  checkUser: () => dispatch(checkUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
