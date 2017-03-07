import { createActions } from 'redux-actions';

export const {
  showColorPicker,
  changeColor,
  changeColorOnColorPicker
} = createActions( {
  SHOW_COLOR_PICKER: () => ({
  }),
  CHANGE_COLOR: (color) => ({
    color: color
  }),
  CHANGE_COLOR_ON_COLOR_PICKER: (color) => ({
    color: color
  })
});
