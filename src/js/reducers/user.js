import { handleActions } from 'redux-actions';

const user = handleActions({
  SUCCEED_SIGN_UP: (state) => ({
    ...state,
    isLoggedIn: true
  }),
  SUCCEED_LOG_IN: (state, action) => ({
    ...state,
    username: action.payload.user.username,
    isLoggedIn: true
  }),
  LOG_OUT: (state) => ({
    ...state,
    username: "Guest",
    isLoggedIn: false
  })
}, {
  username: "Guest",
  // TODO this should make better
  isLoggedIn: localStorage.getItem('token')
});

export default user;
