import { createActions } from 'redux-actions';
import Request from 'network/Request';

export const {
  pagesImagesIndexEndReadUserImages,
  pagesImagesIndexEndReadImage,
  pagesImagesIndexFavoriteImage,
  pagesImagesIndexUnfavoriteImage,
  pagesImagesIndexEndCommentImage
} = createActions({
  PAGES_IMAGES_INDEX_END_READ_USER_IMAGES: (images) => ({
    images: images
  }),
  PAGES_IMAGES_INDEX_END_READ_IMAGE: (image) => ({
    image: image
  }),
  PAGES_IMAGES_INDEX_FAVORITE_IMAGE: (response) => ({
    ...response
  }),
  PAGES_IMAGES_INDEX_UNFAVORITE_IMAGE: () => ({}),
  PAGES_IMAGES_INDEX_END_COMMENT_IMAGE: (comment) => ({
    comment: comment
  })
});

const readImages = (dispatch, data, action) => {
  const request = new Request();
  request.send(data)
    .get('/images/search', (images) => {
      let count = 0;
      images.forEach((image) => {
        const request = new Request();
        request.responseType('blob');
        request.get("/images/" + image.id + "/load", (body, response) => {
          image.url = window.URL.createObjectURL(response.xhr.response);
          count++;
          if (count >= images.length) {
            dispatch(action(images));
          }
        });
      });
    });
};

export const favoriteImage = (id) => {
  return (dispatch) => {
    const request = new Request();
    request.post('/images/' + id + '/favorites', {}, (body) => {
      dispatch(pagesImagesIndexFavoriteImage(body));
    });
  };
};

export const unfavoriteImage = (imageId, id) => {
  return (dispatch => {
    const request = new Request();
    request.delete('/images/' + imageId + '/favorites/' + id, () => {
      dispatch(pagesImagesIndexUnfavoriteImage(id));
    });
  })
};

export const readImage = (id) => {
  return (dispatch) => {
    const request = new Request();
    request.get("/images/" + id, (image) => {
      const request = new Request();
      request.responseType('blob');
      request.get("/images/" + id + "/load", (body, response) => {
        image.url = window.URL.createObjectURL(response.xhr.response);
        dispatch(pagesImagesIndexEndReadImage(image));
        dispatch(readUserImages(image.creator));
      });
    });
  };
};

export const readUserImages = (user) => {
  return (dispatch) => {
    const data = {
      order: 'latest',
      username: user.username
    };
    readImages(dispatch, data, pagesImagesIndexEndReadUserImages);
  }
};

export const commentImage = (imageId, comment) => {
  return (dispatch => {
    const request = new Request();
    request.post("/images/" + imageId + "/comments", { comment: comment }, body => {
      dispatch(pagesImagesIndexEndCommentImage(body));
    });
  });
};
