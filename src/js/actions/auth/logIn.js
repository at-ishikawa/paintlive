import { createActions } from 'redux-actions';
import Request from '../../network/Request';

export const {
  startLogIn,
  succeedLogIn,
  failLogIn,
  logOut
} = createActions({
  START_LOG_IN: () => ({}),
  SUCCEED_LOG_IN: (user) => ({
    user: user,
    isSubmitted: false
  }),
  FAIL_LOG_IN: (response) => ({
    errors: response.errors
  }),

  LOG_OUT: () => ({})
});

export const logIn = (username, password) => {
  return (dispatch) => {
    dispatch(startLogIn());
    const request = new Request();
    const credentials = {
      password: password
    };
    request.send(credentials)
      .get('/users/' + username, (body, response) => {
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
};
