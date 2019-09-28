import createRootReducer from './reducers';
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import logger from 'redux-logger';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = createRootReducer(history);
const store = createStore(
  reducer,
  undefined,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      logger
    )
  )
);

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducer);
    });
  }
}

export default store;
