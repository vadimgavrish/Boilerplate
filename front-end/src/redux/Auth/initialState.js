import { fromJS } from 'immutable';

const initialState = fromJS({
  loggedIn: false,
  signingIn: false,
  signInError: false,
});

export default initialState;
