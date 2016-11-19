import { handleActions } from 'redux-actions';

const validate = handleActions({
  FAIL_VALIDATE_SIGN_UP_TOKEN: (state, action) => ({
    ...state,
    error: action.payload.error
  })
}, {
  error: ''
});

export default validate;
