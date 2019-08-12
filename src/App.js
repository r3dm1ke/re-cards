import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import DecksPage from './pages/Decks';
import Scaffold from './components/Scaffold';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Scaffold>
            <Route path={'/'} exact component={LoginPage} />
            <Route path={'/home'} exact component={HomePage} />
            <Route path={'/decks'} exact component={DecksPage} />
        </Scaffold>
      </Router>
    </Provider>
  );
}

export default App;
