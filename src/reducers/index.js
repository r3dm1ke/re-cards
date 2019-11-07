import authReducer from './auth';
import layoutReducer from './layout';
import micsReducer from './mics';
import decksReducer from './decks/decks';
import decksFormReducer from './decks/decks_form';
import cardsReducer from './cards/cards';
import cardsFormReducer from './cards/cards_form';
import dashboardReducer from './dashboard';
import studyReducer from './study';
import errorsReducer from './errors';
import progressReducer from './progress';
import offlineReducer from './offline';
import onboardingReducer from './onboarding';
import quickStudyWidgetReducer from './widgets/quick_study';
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
  errors: errorsReducer,
  offline: offlineReducer,
  progress: progressReducer,
  onboarding: onboardingReducer,
  widgets: combineReducers({
    quick_study: quickStudyWidgetReducer,
  }),
  router: connectRouter(history),
});
