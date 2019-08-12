import authReducer from './auth';
import layoutReducer from './layout';
import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

export default history => combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  router: connectRouter(history)
})