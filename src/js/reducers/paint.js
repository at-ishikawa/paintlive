import { handleActions } from 'redux-actions';

export const addPaintAction = (state, logCreator, action) => {
  var log = logCreator({
    point: action.point,
    layer: state.layers[state.currentLayerIndex],
    lineWidth: state.lineWidth,
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

export const initialState = {
  contexts: [],
  name: 'Untitled',
  width: 780,
  height: 640,
  layers: [],
  layerHistory: [],
  currentLayerIndex: 0,
  currentMode: null,

  currentPoint: null,
  isDragging: false,
  isSaved: true,

  lineWidth: 1,
  color: {
    hex: "#000"
  },

  history: []
};

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

  ADD_LAYER: (state) => {
    const layerId = Math.floor(Math.random() * (1 << 30))
    return {
      ...state,
      layerHistory: state.layerHistory.concat({
        type: 'add',
        layer: {
          id: layerId,
          name: 'Layer ' + (state.layers.length + 1),
          isVisible: true
        }
      }),
      layers: state.layers.concat({
        id: layerId,
        name: 'Layer ' + (state.layers.length + 1),
        isVisible: true
      })
    };
  },
  REMOVE_LAYER: (state) => {
    if (state.layers.length <= 1) {
      return state;
    }

    return {
      ...state,
      layerHistory: state.layerHistory.concat({
        type: 'remove',
        index: state.currentLayerIndex
      }),
      layers: (function () {
        if (state.layers.length <= 1) {
          return state.layers;
        }

        var newLayers = state.layers.concat();
        newLayers.splice(state.currentLayerIndex, 1);

        return newLayers;
      })(),
      contexts: (function () {
        if (state.layers.length <= 1) {
          return state.contexts;
        }

        var newContexts = state.contexts.concat();
        newContexts.splice(state.currentLayerIndex, 1);

        return newContexts;
      })(),
      currentLayerIndex: (function () {
        if (state.layers.length <= 1) {
          return state.currentLayerIndex;
        }

        if (state.currentLayerIndex >= state.layers.length - 1) {
          return state.layers.length - 2;
        }
        return state.currentLayerIndex;
      })()
    };
  },
  MOVE_LAYER: (state, action) => {
    const sourceIndex = state.layers.map(layer => layer.id).indexOf(action.payload.sourceId);
    const targetIndex = state.layers.map(layer => layer.id).indexOf(action.payload.targetId);

    if (sourceIndex == targetIndex || sourceIndex < 0 || targetIndex < 0) {
      return state;
    }

    return {
      ...state,
      layerHistory: state.layerHistory.concat({
        type: 'move',
        sourceId: action.payload.sourceId,
        targetId: action.payload.targetId
      }),
      layers: (() => {
        const layers = state.layers;
        [layers[sourceIndex], layers[targetIndex]] = [layers[targetIndex], layers[sourceIndex]];
        return layers;
      })(),
      currentLayerIndex: state.layers.map(layer => layer.id).indexOf(action.payload.sourceId)
    }
  },
  SELECT_LAYER: (state, action) => ({
    ...state,
    currentLayerIndex: action.payload.layerIndex
  }),
  SET_LAYER_NAME: (state, action) => ({
    ...state,
    layerHistory: state.layerHistory.concat({
      type: 'change name',
      index: action.payload.layerIndex,
      name: action.payload.layerName
    }),
    layers: (function() {
      var newLayers = state.layers.concat();
      newLayers[action.payload.layerIndex].name = action.payload.layerName;
      return newLayers;
    })()
  }),
  SET_LAYER_VISIBLE: (state, action) => ({
    ...state,
    layerHistory: state.layerHistory.concat({
      type: 'change visibility',
      index: action.payload.layerIndex,
      isVisible: action.payload.isVisible
    }),
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

  SET_LINE_WIDTH: (state, action) => ({
    ...state,
    lineWidth: action.payload.lineWidth
  }),

  CHANGE_COLOR: (state, action) => ({
    ...state,
    color: action.payload.color
  }),

  OPEN_NEW_IMAGE: (state, action) => {
    const layerId = Math.floor(Math.random() * (1 << 30));
    return {
      ...state,
      width: action.payload.paintProperties.width,
      height: action.payload.paintProperties.height,
      contexts: [],
      layerHistory: [{
        type: 'add',
        layer: {
          id: layerId,
          name: 'Background',
          isVisible: true,
          isBackground: true,
          url: null
        }
      }],
      layers: [{
        id: layerId,
        name: 'Background',
        isVisible: true,
        isBackground: true,
        url: null
      }],
      history: [],
      currentLayerIndex: 0,
      currentMode: null,
      isDragging: false
    };
  },

  IMPORT_IMAGE: (state, action) => ({
    ...state,
    layerHistory: state.layerHistory.concat({
      type: 'add',
      layer: {
        id: Math.floor(Math.random() * (1 << 30)),
        name: action.payload.name,
        isVisible: true,
        isBackground: false,
        url: action.payload.url
      }
    }),
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
}, initialState);

export default paint;
