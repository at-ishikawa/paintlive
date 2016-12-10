import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const index = handleActions({
  PAGES_USERS_INDEX_END_READ_USER: (state, action) => ({
    ...state,
    user: action.payload.user
  }),
  PAGES_USERS_INDEX_END_READ_USER_IMAGES: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      images: action.payload.images
    }
  }),
  SUCCEEDED_FOLLOW_USER: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      following_id: action.payload.id
    }
  }),
  SUCCEEDED_UNFOLLOW_USER: (state) => ({
    ...state,
    user: {
      ...state.user,
      following_id: null
    }
  })
}, {
  user: null
});

export default combineReducers({
  index
});

