import { createActions } from 'redux-actions';
import Request from 'network/Request';

export const {
  pagesAccountProfileChangeField,
  pagesAccountProfileSucceededUpdateProfile,
  pagesAccountProfileFailedUpdateProfile
} = createActions({
  PAGES_ACCOUNT_PROFILE_CHANGE_FIELD: (field) => ({
    field: field
  }),
  PAGES_ACCOUNT_PROFILE_SUCCEEDED_UPDATE_PROFILE: (user) => ({
    ...user
  }),
  PAGES_ACCOUNT_PROFILE_FAILED_UPDATE_PROFILE: (errorMessages) => ({
    errorMessages: errorMessages
  })
});

export const updateProfile = (oldUsername, newUsername, email, thumbnail) => {
  return dispatch => {
    const request = new Request();
    request.attach('thumbnail', thumbnail)
      .put('/users/' + oldUsername, {
        username: newUsername,
        email: email
      }, (body, response, error) => {
        if (error != null) {
          dispatch(pagesAccountProfileFailedUpdateProfile(body));
          return;
        }

        dispatch(pagesAccountProfileSucceededUpdateProfile(body));
      });
  };
};
