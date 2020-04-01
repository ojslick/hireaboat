import { combineReducers } from 'redux';
import hoodie from './hoodie';
import authReducer from './authReducer';
import connectionStatus from './connectionStatus';

export default combineReducers({
  hoodie,
  auth: authReducer,
  connectionStatus
});
