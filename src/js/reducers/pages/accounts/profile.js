import { handleActions } from 'redux-actions';

const profile = handleActions({
  PAGES_ACCOUNT_PROFILE_CHANGE_FIELD: (state, action) => ({
    ...state,
    ...action.payload.field,
    isUpdated: false
  }),
  PAGES_ACCOUNT_PROFILE_SUCCEEDED_UPDATE_PROFILE: (state, action) => ({
    ...state,
    username: action.payload.username,
    email: action.payload.email,
    isUpdated: true
  }),
  PAGES_ACCOUNT_PROFILE_FAILED_UPDATE_PROFILE: (state, action) => ({
    ...state,
    errorMessages: action.payload.errorMessages || {},
    isUpdated: false
  }),
  SUCCEED_LOG_IN: (state, action) => ({
    ...state,
    username: action.payload.user.username,
    email: action.payload.user.email,
    thumbnailUrl: action.payload.user.thumbnail_url
  })
}, {
  username: null,
  email: null,
  thumbnailUrl: null,
  isUpdated: false,
  errorMessages: {}
});

export default profile;
