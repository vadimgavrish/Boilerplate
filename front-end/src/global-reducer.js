import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import Auth from './redux/Auth/reducer';
import User from './redux/User/reducer';

const createGlobalReducer = () => (
  combineReducers({
    Auth,
    User,
    route: routerReducer,
    form: formReducer,
  })
);

export default createGlobalReducer;
