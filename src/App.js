import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
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
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(init());
  }
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
