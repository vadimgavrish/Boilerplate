/* eslint-disable */
import {
  LOG_IN,
  LOG_OUT,
  LOGIN_IN_ATTEMPT,
} from './constants';

import store from '../../store';
import { dispatch } from 'redux';

function logoutFetchAttempt() {
  fetch('/logoutAttempt', {
    method: 'POST',
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
  })
  .then(res => res.json())
  .then(res => {
    if (res === 'logoutSuccessful') {
      location = location;
    }
  })
  .catch(err => console.log(err));
}

function loginFetchAttempt(cred) {
  fetch('/loginAttempt', {
    method: 'POST',
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cred)
  })
  .then(res => res.json())
  .then(res => {
    if (res === 'err') {
      store.dispatch(loginFailure());
    } else {
      store.dispatch(loginSuccess(res));
    }
  })
  .catch(err => alert(err));
}

function registerFetchAttempt(cred) {
  fetch('/registerAttempt', {
    method: 'POST',
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cred)
  })
  .then(res => res.json())
  .then(res => {
    if (res === 'emailTaken') {
      alert('Email address is already in use');
    } else if (res === 'registered') {
      alert('Registration successful. Please confirm your email address');
      location = location;
    }
  })
  .catch(err => console.log(err))
}

function recoverFetchAttempt(cred) {
  fetch('/recoverAttempt', {
    method: 'POST',
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cred)
  })
  .then(res => res.json())
  .then(res => {
    if (res === 'recovered') {
      alert('Recovery email sent. Please check your email.')
    } else {
      alert('Email not found!');
    }
    location = location;
  })
  .catch(err => console.log(err))
}

function resetPassFetchAttempt(cred) {
  fetch('/resetPass', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cred)
  })
  .then(res => res.json())
  .then(res => {
    if (res === 'success') {
      alert('Password reset successfully. Please login.');
      window.location = "/"
    } else {
      alert('error!');      
      window.location = "/"
    }
  })
  .catch(err => console.log(err))
}

export const login = () => ({
  type: LOG_IN,
});

export const logout = (val) => {
  logoutFetchAttempt(val);
  return {
    type: LOG_OUT,
  };
}

export const loginSuccess = (val) => ({
  type: 'LOGIN_SUCCESS',
  payload: val,
});

export const loginFailure = () => ({
  type: 'LOGIN_FAILURE'
});

export const registerSuccess = (val) => ({
  type: 'REGISTER_SUCCESS',
  payload: val
});

export const registerFailure = () => ({
  type: 'REGISTER_FAILURE',
})

export const loginAttempt = (val) => {
  loginFetchAttempt(val);
  return {
    type: LOGIN_IN_ATTEMPT,
  };
}

export const registerAttempt = (val) => {
  registerFetchAttempt(val);
  return {
    type: 'REGISTER_ATTEMPT',
  };
}

export const recoverAttempt = (val) => {
  recoverFetchAttempt(val);
  return {
    type: 'RECOVER_ATTEMPT'
  };
}

export const resetPassAttempt = (val) => {
  resetPassFetchAttempt(val);
  return {
    type: 'RESET_PASS_ATTEMPT'
  };
}
