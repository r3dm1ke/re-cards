import rootReducer from './reducers';
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
export default store;