import { handleActions } from 'redux-actions';

const paint = handleActions({
  INITIALIZE: (state, action) => ({
    ...state,
    width: action.payload.width,
    height: action.payload.height
  }),
  SET_MODE: (state, action) => ({
    ...state,
    currentMode: action.payload.mode
  }),

  ADD_LAYER: (state) => ({
    ...state,
    layerCount: state.layerCount + 1
  }),

  ON_CLICK_PAINT: (state, action) => ({
    ...state,
    currentPoint: action.payload.point
  }),
  ON_MOUSE_DOWN_PAINT: (state, action) => ({
    ...state,
    currentPoint: action.payload.point,
    isDragging: true
  }),
  ON_MOUSE_UP_PAINT: (state, action) => ({
    ...state,
    currentPoint: action.payload.point,
    isDragging: false
  }),
  ON_MOUSE_MOVE_PAINT: (state, action) => ({
    ...state,
    currentPoint: action.payload.point
  })
}, {
  width: null,
  height: null,
  layerCount: 1,
  currentLayerIndex: 0,
  currentMode: null,

  currentPoint: null,
  isDragging: false
});

export default paint;
