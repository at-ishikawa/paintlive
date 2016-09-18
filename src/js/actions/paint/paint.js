import { createActions } from 'redux-actions';

export const {
  initialize,
  onClickPaint,
  onMouseDownPaint,
  onMouseUpPaint,
  onMouseMovePaint
} = createActions({
  INITIALIZE: (width, height, context) => ({
    width: width,
    height: height,
    context: context
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
