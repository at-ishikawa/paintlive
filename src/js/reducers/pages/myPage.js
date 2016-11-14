import { handleActions } from 'redux-actions';

const myPage = handleActions({
  PAGES_MY_PAGE_END_READ_LATEST_IMAGES: (state, action) => ({
    ...state,
    latestImages: action.payload.images
  }),

  PAGES_MY_PAGE_END_READ_USER_IMAGES: (state, action) => ({
    ...state,
    userImages: action.payload.images
  })
}, {
  latestImages: [],
  userImages: []
});

export default myPage;
