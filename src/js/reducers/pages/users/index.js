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
  })
}, {
  user: null
});

export default combineReducers({
  index
});

