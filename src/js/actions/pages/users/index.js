import { createActions } from 'redux-actions';
import Request from 'network/Request';

const {
  pagesUsersIndexEndReadUser,
  pagesUsersIndexEndReadUserImages
} = createActions({
  PAGES_USERS_INDEX_END_READ_USER: user => ({
    user: user
  }),
  PAGES_USERS_INDEX_END_READ_USER_IMAGES: images => ({
    images: images
  })
});

export const readUser = (username) => {
  return (dispatch) => {
    const request = new Request();
    request.get('/users/' + username, user => {
      dispatch(pagesUsersIndexEndReadUser(user));
      dispatch(readUserImages(username));
    });
  };
};

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

export const readUserImages = (username) => {
  return (dispatch) => {
    const data = {
      order: 'latest',
      username: username
    };
    readImages(dispatch, data, pagesUsersIndexEndReadUserImages);
  }
};
