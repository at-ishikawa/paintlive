import { handleActions } from 'redux-actions';

const paint = handleActions({
  INITIALIZE: (state, action) => ({
    ...state,
    contexts: [action.payload.context],
    currentContext: action.payload.context,
    width: action.payload.width,
    height: action.payload.height
  }),
  SET_MODE: (state, action) => ({
    ...state,
    currentMode: action.payload.mode
  }),

  ADD_LAYER: (state) => ({
    ...state,
    layers: state.layers.concat({
      name: 'Layer ' + (state.layers.length + 1),
      isVisible: true
    })
  }),
  REMOVE_LAYER: (state) => ({
    ...state,
    layers: (function() {
      if (state.layers.length <= 1) {
        return state.layers
      }

      var newLayers = state.layers.concat();
      newLayers.splice(state.currentLayerIndex, 1);

      return newLayers;
    })(),
    currentLayerIndex: (function() {
      if (state.layers.length <= 1) {
        return state.currentLayerIndex;
      }

      if (state.currentLayerIndex >= state.layers.length - 1) {
        return state.layers.length - 2;
      }
      return state.currentLayerIndex;
    })()
  }),
  SELECT_LAYER: (state, action) => ({
    ...state,
    currentLayerIndex: action.payload.layerIndex
  }),
  SET_LAYER_NAME: (state, action) => ({
    ...state,
    layers: (function() {
      var newLayers = state.layers.concat();
      newLayers[action.payload.layerIndex].name = action.payload.layerName;
      return newLayers;
    })()
  }),
  SET_LAYER_VISIBLE: (state, action) => ({
    ...state,
    layers: (function() {
      var newLayers = state.layers.concat();
      newLayers[action.payload.layerIndex].isVisible = action.payload.isVisible;
      return newLayers;
    })()
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
  contexts: [],
  currentContext: null,
  width: null,
  height: null,
  layers: [{
    name: 'Background',
    isVisible: true
  }],
  currentLayerIndex: 0,
  currentMode: null,

  currentPoint: null,
  isDragging: false
});

export default paint;
