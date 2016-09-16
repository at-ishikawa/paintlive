import { createActions } from 'redux-actions';

export const {
  initialize,
  onClickPaint,
  onMouseDownPaint,
  onMouseUpPaint,
  onMouseMovePaint
} = createActions({
  INITIALIZE: (width, height) => ({
    width: width,
    height: height
  }),
  ON_CLICK_PAINT: (point) => ({
    point: point
  }),
  ON_MOUSE_DOWN_PAINT: (point) => ({
    point: point
  }),
  ON_MOUSE_UP_PAINT: (point) => ({
    point: point
  }),
  ON_MOUSE_MOVE_PAINT: (point) => ({
    point: point
  })
});
