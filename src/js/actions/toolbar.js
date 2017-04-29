import { createActions } from 'redux-actions';

export const {
  showNewImageDialog,
  openNewImage,
  cancelNewImageDialog,
  setWidthOnNewImageDialog,
  setHeightOnNewImageDialog,
  undo,
  redo
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
  }),
  UNDO: () => ({}),
  REDO: () => ({})
});

export const {
  showExportImageDialog,
  exportImage,
  cancelExportImageDialog,
  setExportImageFileType
} = createActions({
  SHOW_EXPORT_IMAGE_DIALOG: () => ({
  }),
  EXPORT_IMAGE: (properties) => ({
    properties: properties
  }),
  CANCEL_EXPORT_IMAGE_DIALOG: () => ({
  }),
  SET_EXPORT_IMAGE_FILE_TYPE: (imageFileType) => ({
    imageFileType: imageFileType
  })
});
