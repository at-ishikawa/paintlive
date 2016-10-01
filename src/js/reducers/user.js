import { handleActions } from 'redux-actions';

const user = handleActions({
  SUCCEED_SIGN_UP: (state) => ({
    ...state,
    isLoggedIn: true
  })
}, {
  isLoggedIn: localStorage.getItem('token')
});

export default user;
