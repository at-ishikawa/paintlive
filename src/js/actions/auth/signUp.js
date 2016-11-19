import { createActions } from 'redux-actions';
import Request from '../../network/Request';

export const {
  startSignUp,
  endSignUp,
  succeedSignUpPreregister,
  succeedSignUp,
  failValidateSignUpToken
} = createActions({
  START_SIGN_UP: () => ({
    isSubmitted: true
  }),
  END_SIGN_UP: () => ({
    isSubmitted: false
  }),
  SUCCEED_SIGN_UP_PREREGISTER: (user) => ({
    user: user,
    isSubmitted: false
  }),
  SUCCEED_SIGN_UP: (user) => ({
    user: user
  }),
  FAIL_VALIDATE_SIGN_UP_TOKEN: (error) => ({
    error: error
  })
});

export const {
  changeInput,
  endValidateInput
} = createActions({
  CHANGE_INPUT: (input) => ({
    input: input
  }),
  END_VALIDATE_INPUT: (response) => ({
    successes: response.successes,
    errors: response.errors
  })
});

export const onInputChange = (input) => {
  return (dispatch) => {
    dispatch(changeInput(input));
    const request = new Request();
    request.send(input)
      .get('/signup/validation', (response) => {
        dispatch(endValidateInput(response));
      });
  };
};

export const signUp = (input) => {
  return (dispatch) => {
    dispatch(startSignUp());
    const request = new Request();
    request.post('/signup/preregister', input, (body, response) => {
      dispatch(endSignUp());
      if (response.ok) {
        dispatch(succeedSignUpPreregister({
          ...body,
          username: input.username
        }));
      } else {
        dispatch(endValidateInput({
          'errors': body
        }));
      }
    });
  };
};

export const validateToken = (token) => {
  return dispatch => {
    const request = new Request();
    const data = {
      token: token
    };
    request.post('/signup/register', data, (body, response, error) => {
      if (error != null) {
        dispatch(failValidateSignUpToken(body.error));
        return;
      }

      localStorage.setItem('token', body.token);
      dispatch(succeedSignUp(body));
    });
  };
};

