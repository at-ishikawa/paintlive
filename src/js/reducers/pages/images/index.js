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
  }),

  PAGES_IMAGES_INDEX_FAVORITE_IMAGE: (state, action) => ({
    ...state,
    image: Object.assign({}, state.image, {
      favorite_id: action.payload.id,
      favorite_users_count: state.image.favorite_users_count + 1
    })
  }),

  PAGES_IMAGES_INDEX_UNFAVORITE_IMAGE: (state) => ({
    ...state,
    image: Object.assign({}, state.image, {
      favorite_id: null,
      favorite_users_count: state.image.favorite_users_count - 1
    })
  })
}, {
  userImages: [],
  image: null
});

export default combineReducers({
  index
});
