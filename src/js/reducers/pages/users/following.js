import { handleActions } from 'redux-actions';

const following = handleActions({
  PAGES_USER_FOLLOWING_READ_FOLLOWING_USERS: (state, action) => ({
    ...state,
    followingUsers: action.payload.followingUsers
  })
}, {
  followingUsers: []
});

export default following;
