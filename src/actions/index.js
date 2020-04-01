import { LOGIN } from './types/login';
import { LOGOUT } from './types/logout';
import { CONNECTION_STATUS_UPDATE } from './types/connection';
import history from '../history';

// Check if user is logged in
export const checkUser = () => async (dispatch, getState) => {
  try {
    const response = await getState().hoodie.account.get();
    console.log(response);

    dispatch({ type: LOGIN, payload: response });
  } catch (err) {
    console.log(err);
  }
};

// Log in to an existing account
export const login = (username, password, cb) => async (dispatch, getState) => {
  try {
    const response = await getState().hoodie.account.signIn({
      username,
      password
    });
    if (response) {
      dispatch({ type: LOGIN, payload: response });
      history.push('/');
    }
  } catch (err) {
    console.log(err);
    cb(err);
  }
};

// Log out of the current session
export const logout = () => async (dispatch, getState) => {
  try {
    getState().hoodie.account.signOut();

    dispatch({ type: LOGOUT });
  } catch (err) {
    console.log(err);
  }
  history.push('/');
};

// Create a new user
export const createUser = (
  username,
  password,
  firstname,
  lastname,
  cb
) => async (dispatch, getState) => {
  try {
    await getState().hoodie.account.signUp({
      firstname,
      lastname,
      username,
      password
    });

    dispatch(login(username, password));
  } catch (err) {
    console.log(err);
    cb(err);
  }
};

export const connectionStatus = status => dispatch => {
  dispatch({ type: CONNECTION_STATUS_UPDATE, payload: status });
};
