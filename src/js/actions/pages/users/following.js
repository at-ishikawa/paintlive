import { createActions } from 'redux-actions';
import Request from 'network/Request';

export const {
  pagesUserFollowingReadFollowingUsers
} = createActions({
  PAGES_USER_FOLLOWING_READ_FOLLOWING_USERS: (followingUsers) => ({
    followingUsers: followingUsers
  })
});

export const readFollowingUsers = (username) => {
  return dispatch => {
    const request = new Request();
    request.get('/users/' + username + '/followings', users => {
      dispatch(pagesUserFollowingReadFollowingUsers(users));
    })
  };
};
