import { handleActions } from 'redux-actions';

const addPaintAction = (state, logCreator, action) => {
  var log = logCreator({
    point: action.point,
    layer: state.layers[state.currentLayerIndex],
    color: state.color,
    isDragging: state.isDragging
  });
  if (log) {
    const newHistory = state.history.concat();
    newHistory.push(log);
    return newHistory;
  }
  return state.history;
}

const paint = handleActions({
  INITIALIZE: (state, action) => ({
    ...state,
    contexts: [action.payload.context]
  }),
  SET_MODE: (state, action) => ({
    ...state,
    currentMode: action.payload.mode
  }),
  SET_PAINT_MODE: (state, action) => ({
    ...state,
    currentMode: action.payload.mode
  }),
  SET_CONTEXT: (state, action) => ({
    ...state,
    contexts: (function() {
      let newContexts = state.contexts.concat();
      newContexts[action.payload.layerIndex] = action.payload.context;
      return newContexts;
    })()
  }),

  ADD_LAYER: (state) => ({
    ...state,
    layers: state.layers.concat({
      id: Math.floor(Math.random() * (1 << 30)),
      name: 'Layer ' + (state.layers.length + 1),
      isVisible: true
    })
  }),
  REMOVE_LAYER: (state) => ({
    ...state,
    layers: (function() {
      if (state.layers.length <= 1) {
        return state.layers;
      }

      var newLayers = state.layers.concat();
      newLayers.splice(state.currentLayerIndex, 1);

      return newLayers;
    })(),
    contexts: (function() {
      if (state.layers.length <= 1) {
        return state.contexts;
      }

      var newContexts = state.contexts.concat();
      newContexts.splice(state.currentLayerIndex, 1);

      return newContexts;
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
  MOVE_LAYER: (state, action) => ({
    ...state,
    layers: (() => {
      const layers = state.layers;
      const sourceIndex = layers.map(layer => layer.id).indexOf(action.payload.sourceId);
      const targetIndex = layers.map(layer => layer.id).indexOf(action.payload.targetId);
      [layers[sourceIndex], layers[targetIndex]] = [layers[targetIndex], layers[sourceIndex]];
      return layers;
    })(),
    currentLayerIndex: state.layers.map(layer => layer.id).indexOf(action.payload.sourceId)
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
    history: addPaintAction(state, state.currentMode.getClickAction, action.payload),
    currentPoint: action.payload.point
  }),
  ON_MOUSE_DOWN_PAINT: (state, action) => ({
    ...state,
    history: addPaintAction(state, state.currentMode.getMouseDownAction, action.payload),
    currentPoint: action.payload.point,
    isDragging: true
  }),
  ON_MOUSE_UP_PAINT: (state, action) => ({
    ...state,
    history: addPaintAction(state, state.currentMode.getMouseUpAction, action.payload),
    currentPoint: action.payload.point,
    isDragging: false
  }),
  ON_MOUSE_MOVE_PAINT: (state, action) => ({
    ...state,
    history: addPaintAction(state, state.currentMode.getMouseMoveAction, action.payload),
    currentPoint: action.payload.point
  }),

  CHANGE_COLOR: (state, action) => ({
    ...state,
    color: action.payload.color
  }),

  OPEN_NEW_IMAGE: (state, action) => ({
    ...state,
    width: action.payload.paintProperties.width,
    height: action.payload.paintProperties.height,
    contexts: [],
    layers: [{
      id: Math.floor(Math.random() * (1 << 30)),
      name: 'Background',
      isVisible: true,
      isBackground: true,
      url: null
    }],
    history: [],
    currentLayerIndex: 0,
    currentMode: null,
    isDragging: false
  }),

  IMPORT_IMAGE: (state, action) => ({
    ...state,
    layers: state.layers.concat([{
      id: Math.floor(Math.random() * (1 << 30)),
      name: action.payload.name,
      isVisible: true,
      isBackground: false,
      url: action.payload.url
    }]),
    currentLayerIndex: state.layers.length
  }),
  EXPORT_IMAGE: (state, action) => ({
    ...state,
    imageFileType: action.payload.properties.fileType
  }),
  EXPORTED_IMAGE: (state) => ({
    ...state,
    imageFileType: null
  }),

  END_LOAD_IMAGE: (state, action) => ({
    ...state,
    name: action.payload.image.name,
    layers: action.payload.image.layers,
    isSaved: true
  }),
  END_SAVE_IMAGE: (state) => ({
    ...state,
    isSaved: true
  })
}, {
  contexts: [],
  name: 'Untitled',
  width: 780,
  height: 640,
  layers: [],
  currentLayerIndex: 0,
  currentMode: null,

  currentPoint: null,
  isDragging: false,
  isSaved: true,

  color: {
    hex: "#000"
  },

  history: []
});

export default paint;
