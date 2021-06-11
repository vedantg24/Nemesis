import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import { Provider } from 'react-redux';
import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    // Initializes Materialize JS
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
