import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import DecksPage from './pages/Decks';
import CardsPage from './pages/Cards';
import StudyPage from './pages/Study';
import Scaffold from './components/common/layout/Scaffold';
import Alert from './components/common/Alert';
import ScrollRestorer from './components/common/layout/ScrollRestorer';
import {Provider} from 'react-redux';
import store, {history} from './store';
import {init} from './actions/auth';

export default () => {
  useEffect(() => {
    store.dispatch(init());
  }, []);

  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Alert />
        <ConnectedRouter history={history}>
          <ScrollRestorer/>
          <Scaffold>
            <Route path={'/'} exact component={LoginPage}/>
            <Route path={'/dashboard'} exact component={DashboardPage}/>
            <Route path={'/decks'} exact component={DecksPage}/>
            <Route path={'/cards'} exact component={CardsPage}/>
            <Route path={'/study'} exact component={StudyPage} />
          </Scaffold>
        </ConnectedRouter>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};
