import { handleActions } from 'redux-actions';

const user = handleActions({
  SUCCEED_SIGN_UP: (state, action) => ({
    ...state,
    username: action.payload.user.username,
    isLoggedIn: true
  }),
  SUCCEED_LOG_IN: (state, action) => ({
    ...state,
    username: action.payload.user.username,
    isLoggedIn: true
  }),
  LOG_OUT: (state) => ({
    ...state,
    username: '',
    isLoggedIn: false
  })
}, {
  username: '',
  isLoggedIn: false
});

export default user;
