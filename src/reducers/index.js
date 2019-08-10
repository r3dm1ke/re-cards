import authReducer from './auth';
import {combineReducers} from "redux";

export default combineReducers({
  auth: authReducer
})