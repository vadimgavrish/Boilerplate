import initialState from './initialState';

const User = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return state
        .set('name', action.payload.name)
        .set('verified', action.payload.verified);
    default:
      return state;
  }
};

export default User;
