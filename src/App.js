import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import DecksPage from './pages/Decks';
import CardsPage from './pages/Cards';
import StudyPage from './pages/Study';
import Scaffold from './components/common/Scaffold';
import Alert from './components/common/Alert';
import {Provider} from 'react-redux';
import {ParallaxProvider} from 'react-skrollr';
import store, {history} from './store';
import {init} from './actions/auth';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(init());
  }
  render() {
    return (
      <ParallaxProvider
        init={{
          smoothScrollingDuration: 100,
          smoothScrolling: true,
          forceHeight: false,
        }}
      >
        <Provider store={store}>
          <Alert />
          <ConnectedRouter history={history}>
            <Scaffold>
              <Route path={'/'} exact component={LoginPage}/>
              <Route path={'/dashboard'} exact component={DashboardPage}/>
              <Route path={'/decks'} exact component={DecksPage}/>
              <Route path={'/cards'} exact component={CardsPage}/>
              <Route path={'/study'} exact component={StudyPage} />
            </Scaffold>
          </ConnectedRouter>
        </Provider>
      </ParallaxProvider>
    );
  }
}

export default App;
