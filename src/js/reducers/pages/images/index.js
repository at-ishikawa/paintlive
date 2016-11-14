import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const index = handleActions({
  PAGES_IMAGES_INDEX_END_READ_USER_IMAGES: (state, action) => ({
    ...state,
    userImages: action.payload.images
  }),

  PAGES_IMAGES_INDEX_END_READ_IMAGE: (state, action) => ({
    ...state,
    image: action.payload.image
  })
}, {
  userImages: [],
  image: null
});

export default combineReducers({
  index
});
