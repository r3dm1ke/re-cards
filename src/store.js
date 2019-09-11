import createRootReducer from './reducers';
import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import {createBrowserHistory} from 'history';
import {routerMiddleware} from "connected-react-router";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  createRootReducer(history),
  undefined,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
);
export default store;