import { createActions } from 'redux-actions';
import Request from '../../network/Request';

export const {
  startLogIn,
  succeedLogIn,
  failLogIn
} = createActions({
  START_LOG_IN: () => ({}),
  SUCCEED_LOG_IN: () => ({
    isSubmitted: false
  }),
  FAIL_LOG_IN: (response) => ({
    errors: response.errors
  })
});

export const logIn = (username, password) => {
  return (dispatch) => {
    dispatch(startLogIn());
    const request = new Request();
    const credentials = {
      password: password
    };
    request.send(credentials)
      .get('/accounts/' + username, (body, response) => {
        if (response.ok) {
          localStorage.setItem('token', body.token);
          dispatch(succeedLogIn(body));
        } else {
          dispatch(failLogIn({
            'errors': body
          }));
        }
      });
  }
}
