import { createActions } from 'redux-actions';
import Request from '../../network/Request';

export const {
  startSignUp,
  endSignUp,
  succeedSignUp
} = createActions({
  START_SIGN_UP: () => ({
    isSubmitted: true
  }),
  END_SIGN_UP: () => ({
    isSubmitted: false
  }),
  SUCCEED_SIGN_UP: (response) => ({
    response: response,
    isSubmitted: false
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
      .get('/accounts/validation', (response) => {
        dispatch(endValidateInput(response));
      });
  };
};

export const signUp = (input) => {
  return (dispatch) => {
    dispatch(startSignUp());
    const request = new Request();
    request.post('/accounts', input, (body, response) => {
      dispatch(endSignUp());
      if (response.ok) {
        localStorage.setItem('token', body.token);
        dispatch(succeedSignUp(body));
      } else {
        dispatch(endValidateInput({
          'errors': body
        }));
      }
    });
  };
};
