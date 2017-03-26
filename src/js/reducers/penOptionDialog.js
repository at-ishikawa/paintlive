import { handleActions } from 'redux-actions';

const penOptionDialog = handleActions({
  SHOW_PEN_OPTION_DIALOG: (state) => ({
    ...state,
    isShown: true
  }),
  HIDE_PEN_OPTION_DIALOG: (state) => ({
    ...state,
    isShown: false
  })
}, {
  isShown: false
});

export default penOptionDialog
