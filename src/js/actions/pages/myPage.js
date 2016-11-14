import { createActions } from 'redux-actions';
import Request from '../../network/Request';

export const {
  pagesMyPageEndReadLatestImages,
  pagesMyPageEndReadUserImages
} = createActions({
  PAGES_MY_PAGE_END_READ_LATEST_IMAGES: (images) => ({
    images: images
  }),
  PAGES_MY_PAGE_END_READ_USER_IMAGES: (images) => ({
    images: images
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

export const readLatestImages = () => {
  return (dispatch) => {
    const data = {
      order: 'latest'
    };
    readImages(dispatch, data, pagesMyPageEndReadLatestImages);
  }
};

export const readUserImages = (user) => {
  return (dispatch) => {
    const data = {
      order: 'latest',
      username: user.username
    };
    readImages(dispatch, data, pagesMyPageEndReadUserImages);
  }
};
