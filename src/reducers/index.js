import authReducer from './auth';
import layoutReducer from './layout';
import micsReducer from './mics';
import decksReducer from './decks/decks';
import decksFormReducer from './decks/decks_form';
import cardsReducer from './cards/cards';
import cardsFormReducer from './cards/cards_form';
import dashboardReducer from './dashboard';
import studyReducer from './study';
import worstCardsReducer from './worst_cards';
import trendReducer from './trend';
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

export default (history) => combineReducers({
  auth: authReducer,
  mics: micsReducer,
  decks: decksReducer,
  decks_form: decksFormReducer,
  cards: cardsReducer,
  cards_form: cardsFormReducer,
  layout: layoutReducer,
  dashboard: dashboardReducer,
  study: studyReducer,
  worst_cards: worstCardsReducer,
  trend: trendReducer,
  router: connectRouter(history),
});
