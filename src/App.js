import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import Scaffold from './components/Scaffold';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Scaffold>
        <Router>
          <Route path={'/'} exact component={LoginPage} />
          <Route path={'/home'} exact component={HomePage} />
        </Router>
      </Scaffold>
    </Provider>
  );
}

export default App;
