import { combineReducers } from 'redux';
import hoodie from './hoodie';
import authReducer from './authReducer';
import connectionStatus from './connectionStatus';
import hireaboat from './hireaboat';
import listBoatsReducer from './listBoatsReducer';

export default combineReducers({
  hoodie,
  auth: authReducer,
  connectionStatus,
  hireaboat,
  boatList: listBoatsReducer
});
