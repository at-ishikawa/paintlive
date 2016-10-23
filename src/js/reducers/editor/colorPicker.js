import { handleActions } from 'redux-actions';

const colorpicker = handleActions({
  SHOW_COLOR_PICKER: (state) => ({
    ...state,
    selectedColor: state.color,
    isShown: true
  }),
  CHANGE_COLOR: (state, action) => ({
    ...state,
    selectedColor: action.payload.color,
    isShown: false
  }),
  CHANGE_COLOR_ON_COLOR_PICKER: (state, action) => ({
    ...state,
    color: action.payload.color
  })
}, {
  isShown: false,
  color: {
    hex: "#ffffff"
  },
  selectedColor: {
    hex: "#ffffff"
  }
});

export default colorpicker;
