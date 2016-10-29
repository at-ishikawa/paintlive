import { createActions } from 'redux-actions';

export const {
  showNewImageDialog,
  openNewImage,
  cancelNewImageDialog,
  setWidthOnNewImageDialog,
  setHeightOnNewImageDialog
} = createActions({
  SHOW_NEW_IMAGE_DIALOG: () => ({
  }),
  OPEN_NEW_IMAGE: (paintProperties) => ({
    paintProperties: paintProperties
  }),
  CANCEL_NEW_IMAGE_DIALOG: () => ({
  }),
  SET_WIDTH_ON_NEW_IMAGE_DIALOG: (width) => ({
    width: width
  }),
  SET_HEIGHT_ON_NEW_IMAGE_DIALOG: (height) => ({
    height: height
  })
});
