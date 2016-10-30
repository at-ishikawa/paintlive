import { handleActions } from 'redux-actions';

const user = handleActions({
  SUCCEED_SIGN_UP: (state) => ({
    ...state,
    isLoggedIn: true
  }),
  SUCCEED_LOG_IN: (state) => ({
    ...state
  })
}, {
  username: "Guest",
  isLoggedIn: localStorage.getItem('token')
});

export default user;
