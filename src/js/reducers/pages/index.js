import { combineReducers } from 'redux';
import myPage from './myPage';
import images from './images/';
import signUp from './signUp';
import users from './users/';

export default combineReducers({
  images,
  users,
  myPage,
  signUp
});
