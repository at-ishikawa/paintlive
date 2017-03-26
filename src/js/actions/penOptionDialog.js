import { createActions } from 'redux-actions';

export const {
  showPenOptionDialog,
  hidePenOptionDialog,
  setLineWidth
} = createActions( {
  SHOW_PEN_OPTION_DIALOG: () => ({}),
  HIDE_PEN_OPTION_DIALOG: () => ({}),
  SET_LINE_WIDTH: (lineWidth) => ({
    lineWidth: lineWidth
  })
});
