import { handleActions } from 'redux-actions';

const toolbar = handleActions({
  SHOW_NEW_IMAGE_DIALOG: (state) => ({
    ...state,
    isNewImageDialogShown: true,
    width: null,
    height: null
  }),
  OPEN_NEW_IMAGE: (state) => ({
    ...state,
    isNewImageDialogShown: false
  }),
  CANCEL_NEW_IMAGE_DIALOG: (state) => ({
    ...state,
    isNewImageDialogShown: false
  }),
  SET_WIDTH_ON_NEW_IMAGE_DIALOG: (state, action) => ({
    ...state,
    width: action.payload.width,
    widthErrorText: action.payload.width > 0 && action.payload.width <= 8192 ? null : "Width must be greater than 0 and less than or equal to 8192"
  }),
  SET_HEIGHT_ON_NEW_IMAGE_DIALOG: (state, action) => ({
    ...state,
    height: action.payload.height,
    heightErrorText: action.payload.height > 0 && action.payload.height <= 8192 ? null : "Height must be greater than 0 and less than or equal to 8192"
  })
}, {
  isNewImageDialogShown: false,
  width: null,
  height: null,
  widthErrorText: null,
  heightErrorText: null
});

export default toolbar;
