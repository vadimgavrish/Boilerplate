import {
  LOG_IN,
  LOG_OUT,
  LOGIN_IN_ATTEMPT,
} from './constants';

import initialState from './initialState';

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return state
        .set('loggedIn', true);
    case LOG_OUT:
      return state
        .set('loggedIn', false);
    case LOGIN_IN_ATTEMPT:
      return state
        .set('signInError', false)
        .set('signingIn', true);
    case 'LOGIN_SUCCESS':
      return state
        .set('signingIn', false)
        .set('loggedIn', true)
        .set('signInError', false);
    case 'LOGIN_FAILURE':
      return state
        .set('signingIn', false)
        .set('signInError', true);
    default:
      return state;
  }
};

export default Auth;
