import rootReducer from './reducers';
import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import {createBrowserHistory} fro m

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunk)));
export default store;