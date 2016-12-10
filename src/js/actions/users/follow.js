import { createActions } from 'redux-actions';
import Request from 'network/Request';

export const {
  succeededFollowUser,
  succeededUnfollowUser
} = createActions({
  SUCCEEDED_FOLLOW_USER: (id, imageId) => ({
    id: id,
    imageId: imageId
  }),
  SUCCEEDED_UNFOLLOW_USER: (imageId) => ({
    imageId: imageId
  })
});

export const followUser = (username, imageId) => {
  return (dispatch => {
    const request = new Request();
    request.post('/users/' + username + '/followings', {}, (body) => {
      dispatch(succeededFollowUser(body.id, imageId));
    });
  });
};

export const unfollowUser = (username, followingId, imageId) => {
  return (dispatch => {
    const request = new Request();
    request.delete('/users/' + username + '/followings/' + followingId, () => {
      dispatch(succeededUnfollowUser(imageId));
    });
  });
};
