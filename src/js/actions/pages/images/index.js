import { createActions } from 'redux-actions';
import Request from 'network/Request';

export const {
  pagesImagesIndexEndReadUserImages,
  pagesImagesIndexEndReadImage
} = createActions({
  PAGES_IMAGES_INDEX_END_READ_USER_IMAGES: (images) => ({
    images: images
  }),
  PAGES_IMAGES_INDEX_END_READ_IMAGE: (image) => ({
    image: image
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
