import { LOGIN } from './types/login';
import { LOGOUT } from './types/logout';
import { ADD_BOAT } from './types/addboat';
import { LIST_BOATS } from './types/listBoats';
import { CONNECTION_STATUS_UPDATE } from './types/connection';
import history from '../history';

// Check if user is logged in
export const checkUser = () => async (dispatch, getState) => {
  try {
    const response = await getState().hoodie.account.get();

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

//Add a boat
export const addBoat = (
  boatType,
  boatManufacturer,
  boatModel,
  city,
  boatHabour,
  captain,
  currency,
  dailyBookingPrice,
  numberOfCabins,
  numberOfBathrooms,
  lengthOfBoats,
  boatCapacity,
  boatDescription,
  photos,
  cb
) => async (dispatch, getState) => {
  try {
    const response = await getState().hoodie.store.add({
      boatType,
      boatManufacturer,
      boatModel,
      city,
      boatHabour,
      captain,
      currency,
      dailyBookingPrice,
      numberOfCabins,
      numberOfBathrooms,
      lengthOfBoats,
      boatCapacity,
      boatDescription,
      photos
    });

    if (response) {
      dispatch({ type: 'ADD_BOAT', payload: response });
      history.push('/');
    }
  } catch (err) {
    console.log(err);
    cb(err);
  }
};

//Boat Result
export const listBoats = () => async (dispatch, getState) => {
  try {
    const response = await getState().hoodie.store.findAll();

    dispatch({ type: 'LIST_BOATS', payload: response });
  } catch (err) {
    console.log(err);
  }
};

//Select Boat
export const selectBoat = data => async dispatch => {
  const response = await data;

  if (response) {
    dispatch({ type: 'SELECT_BOAT', payload: response });
    history.push('/selectboat');
  }
};

//Boat Card
export const bookingCard = data => async dispatch => {
  const response = await data;

  dispatch({ type: 'BOOKING_CARD', payload: response });
};

export const connectionStatus = status => dispatch => {
  dispatch({ type: 'CONNECTION_STATUS_UPDATE', payload: status });
};

//Similar Boats
export const similarBoats = data => async dispatch => {
  const response = await data;

  dispatch({ type: 'SIMILAR_BOATS', payload: response });
};
