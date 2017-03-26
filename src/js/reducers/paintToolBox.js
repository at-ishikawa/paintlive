import { handleActions } from 'redux-actions';

const paintToolBox = handleActions({
  SET_MODE: (state, action) => ({
    ...state,
    name: action.payload.mode.getName()
  })
}, {
  name: null
});

export default paintToolBox;
