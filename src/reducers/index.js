import authReducer from './auth';
import layoutReducer from './layout';
import micsReducer from './mics';
import decksReducer from './decks';
import cardsReducer from './cards';
import dashboardReducer from './dashboard';
import studyReducer from './study';
import worstCardsReducer from './worst_cards';
import trendReducer from './trend';
import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

export default history => combineReducers({
  auth: authReducer,
  mics: micsReducer,
  decks: decksReducer,
  cards: cardsReducer,
  layout: layoutReducer,
  dashboard: dashboardReducer,
  study: studyReducer,
  worst_cards: worstCardsReducer,
  trend: trendReducer,
  router: connectRouter(history)
})