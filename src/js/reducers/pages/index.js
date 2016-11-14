import { combineReducers } from 'redux';
import myPage from './myPage';
import images from './images/';
import users from './users/';

export default combineReducers({
  images,
  users,
  myPage
});
