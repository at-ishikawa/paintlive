import { handleActions } from 'redux-actions';

const loginForm = handleActions({
  START_LOG_IN: () => ({}),
  SUCCEED_LOG_IN: () => ({}),
  FAIL_LOG_IN: (state, action) => ({
    ...state,
    errorMessages: action.payload.errors
  })
}, {
  errorMessages: {}
});

export default loginForm;
