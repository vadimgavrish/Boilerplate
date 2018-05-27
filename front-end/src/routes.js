/* eslint-disable */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import store from './store';
import { history } from './store';
import { loginSuccess } from './redux/Auth/actions';

import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import PassReset from './containers/PassReset';

const redirectPath = (props) => props.match.url.substring(6);

const getCookie = (cookiename) => {
  var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

const isLoggedIn = () => {
  var accessCode = getCookie('accessCode');
  if (!accessCode) {
    return false; 
  } else if (accessCode) {
    return fetch('/userInfoReq', {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(res => {
      if (res === 'fail') {
        return false;
      } else {
        store.dispatch(loginSuccess(res));
        return true;
      }
    })
    .catch(err => console.log(err));
  }
};

const routes = (
  <ConnectedRouter history={history}>
    <Switch>
      <Route
        exact path="/login(|/.*)"
        render={(props) => (
          isLoggedIn() ? (
            <Redirect to={redirectPath(props)} />
          ) : (
            <Login path={redirectPath(props)} />
          )
        )}
      />
      <Route
        exact path="/recover(|/.*)"
        render={(props) => (
          isLoggedIn() ? (
            <Dashboard />
          ) : (
            <PassReset />
          )
        )}
      />
      <Route
        exact path="/*"
        render={() => (
          isLoggedIn() ? (
            <Dashboard />
          ) : (
            <Redirect to="/login" />
          )
        )} 
      />
    </Switch>
  </ConnectedRouter>
);

export default routes;
