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
    image: {
      ...state.image,
      favorite_id: action.payload.id,
      favorite_users_count: state.image.favorite_users_count + 1
    }
  }),

  PAGES_IMAGES_INDEX_UNFAVORITE_IMAGE: (state) => ({
    ...state,
    image: {
      ...state.image,
      favorite_id: null,
      favorite_users_count: state.image.favorite_users_count - 1
    }
  }),

  SUCCEEDED_FOLLOW_USER: (state, action) => ({
    ...state,
    image: {
      ...state.image,
      creator: (state.image && action.payload.imageId == state.image.id ? {
        ...state.image.creator,
        followers_count: state.image.creator.followers_count + 1,
        following_id: action.payload.id
      } : (state.image ? state.image.creator : {}))
    }
  }),
  SUCCEEDED_UNFOLLOW_USER: (state, action) => ({
    ...state,
    image: {
      ...state.image,
      creator: (state.image ? {
        ...state.image.creator,
        ...(action.payload.imageId == state.image.id ? {
          followers_count: state.image.creator.followers_count - 1,
          following_id: null
        } : {})
      } : {})
    }
  })
}, {
  userImages: [],
  image: null
});

export default combineReducers({
  index
});
