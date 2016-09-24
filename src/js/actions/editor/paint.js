import { createActions } from 'redux-actions';

export const {
  initialize,
  setContext,
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
  SET_CONTEXT: (index, context) => ({
    layerIndex: index,
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
