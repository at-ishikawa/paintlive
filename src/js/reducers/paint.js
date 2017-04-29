import { handleActions } from 'redux-actions';
import { PenMode } from 'components/modules/modes/';

export const addPaintAction = (state, logCreator, action) => {
  let history = state.history.concat();
  var log = logCreator({
    point: action.point,
    layer: state.layers[state.currentLayerIndex],
    lineWidth: state.lineWidth,
    color: state.color,
    isDragging: state.isDragging,
    history: history
  });
  if (log) {
    log.type = 'paint';
    const newHistory = getNextHistory(state.history, state.currentHistoryIndex, log);
    return {
      canUndo: true,
      canRedo: false,
      history: newHistory,
      currentHistoryIndex: state.currentHistoryIndex + 1
    };
  }
  return {
    history: history,
    currentHistoryIndex: state.currentHistoryIndex
  };
};

export const getLayers = (nextHistory) => {
  const layers = [];
  nextHistory.forEach((action) => {
    if (action.type != 'layer') {
      return;
    }
    switch (action.event) {
      case 'add':
        layers.push(Object.assign({}, action.layer));
        break;
      case 'remove':
        layers.splice(action.index, 1);
        break;
      case 'move':
      {
        const sourceIndex = layers.map(layer => layer.id).indexOf(action.sourceId);
        const targetIndex = layers.map(layer => layer.id).indexOf(action.targetId);
        if (sourceIndex == targetIndex) {
          throw new Error(`SourceIndex: ${sourceIndex}, TargetIndex: ${targetIndex}`);
        }
        if (sourceIndex < 0 || layers.length <= sourceIndex || targetIndex < 0 || layers.length <= targetIndex) {
          throw new Error(`SourceIndex: ${sourceIndex}, TargetIndex: ${targetIndex}`);
        }
        [layers[sourceIndex], layers[targetIndex]] = [layers[targetIndex], layers[sourceIndex]];
        break;
      }
      case 'rename':
        layers[action.index].name = action.name;
        break;
      case 'set_visibility':
        layers[action.index].isVisible = action.isVisible;
        break;
    }
  });

  layers.forEach(layer => {
    layer.displayName = layer.name;
  });
  return layers;
}

const getNextHistory = (history, currentHistoryIndex, log) => {
  return history.slice(0, currentHistoryIndex + 1).concat(log);
};

export const initialState = {
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

  lineWidth: 1,
  color: {
    hex: "#000"
  },

  history: [{
    type: 'layer',
    event: 'add',
    layer: {
      id: Math.floor(Math.random() * (1 << 30)),
      name: 'Background',
      isVisible: true,
      isBackground: true,
      url: null
    }
  }],
  currentHistoryIndex: 0,
  canUndo: false,
  canRedo: false
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
    const nextHistory = getNextHistory(state.history, state.currentHistoryIndex, {
      type: 'layer',
      event: 'add',
      layer: {
        id: layerId,
        name: 'Layer ' + (state.layers.length + 1),
        isVisible: true
      }
    });

    return {
      ...state,
      canUndo: true,
      canRedo: false,
      history: nextHistory,
      layers: getLayers(nextHistory),
      currentHistoryIndex: state.currentHistoryIndex + 1
    };
  },
  REMOVE_LAYER: (state) => {
    if (state.layers.length <= 1) {
      return state;
    }

    const nextHistory = getNextHistory(state.history, state.currentHistoryIndex, {
      type: 'layer',
      event: 'remove',
      index: state.currentLayerIndex
    });

    return {
      ...state,
      canUndo: true,
      canRedo: false,
      history: nextHistory,
      currentHistoryIndex: state.currentHistoryIndex + 1,
      layers: getLayers(nextHistory),
      contexts: (function () {
        var newContexts = state.contexts.concat();
        newContexts.splice(state.currentLayerIndex, 1);

        return newContexts;
      })(),
      currentLayerIndex: (function () {
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

    if (Math.abs(sourceIndex - targetIndex) > 1) {
      return state;
    }

    const nextHistory = getNextHistory(state.history, state.currentHistoryIndex, {
      type: 'layer',
      event: 'move',
      sourceId: action.payload.sourceId,
      targetId: action.payload.targetId
    });

    const nextLayers = getLayers(nextHistory);

    return {
      ...state,
      canUndo: true,
      canRedo: false,
      history: nextHistory,
      currentHistoryIndex: state.currentHistoryIndex + 1,
      layers: nextLayers,
      currentLayerIndex: nextLayers.map(layer => layer.id).indexOf(action.payload.sourceId)
    }
  },
  SELECT_LAYER: (state, action) => ({
    ...state,
    currentLayerIndex: action.payload.layerIndex
  }),
  CHANGE_LAYER_DISPLAY_NAME: (state, action) => {
    const layers = state.layers.concat();
    layers[action.payload.layerIndex].displayName = action.payload.layerName;
    return {
      ...state,
      canUndo: true,
      canRedo: false,
      layers: layers
    };
  },
  SET_LAYER_NAME: (state, action) => {
    const nextHistory = getNextHistory(state.history, state.currentHistoryIndex, {
      type: 'layer',
      event: 'rename',
      index: action.payload.layerIndex,
      name: action.payload.layerName
    });

    return {
      ...state,
      canUndo: true,
      canRedo: false,
      history: nextHistory,
      currentHistoryIndex: state.currentHistoryIndex + 1,
      layers: getLayers(nextHistory)
    }
  },
  SET_LAYER_VISIBLE: (state, action) => {
    const nextHistory = getNextHistory(state.history, state.currentHistoryIndex, {
      type: 'layer',
      event: 'set_visibility',
      index: action.payload.layerIndex,
      isVisible: action.payload.isVisible
    });
    return {
      ...state,
      canUndo: true,
      canRedo: false,
      history: nextHistory,
      currentHistoryIndex: state.currentHistoryIndex + 1,
      layers: getLayers(nextHistory)
    }
  },

  ON_CLICK_PAINT: (state, action) => ({
    ...state,
    ...addPaintAction(state, state.currentMode.getClickAction, action.payload),
    currentPoint: action.payload.point
  }),
  ON_MOUSE_DOWN_PAINT: (state, action) => ({
    ...state,
    ...addPaintAction(state, state.currentMode.getMouseDownAction, action.payload),
    currentPoint: action.payload.point,
    isDragging: true
  }),
  ON_MOUSE_UP_PAINT: (state, action) => ({
    ...state,
    ...addPaintAction(state, state.currentMode.getMouseUpAction, action.payload),
    currentPoint: action.payload.point,
    isDragging: false
  }),
  ON_MOUSE_MOVE_PAINT: (state, action) => ({
    ...state,
    ...addPaintAction(state, state.currentMode.getMouseMoveAction, action.payload),
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
    const nextHistory = [{
      type: 'layer',
      event: 'add',
      layer: {
        id: layerId,
        name: 'Background',
        isVisible: true,
        isBackground: true,
        url: null
      }
    }];
    return {
      ...state,
      width: action.payload.paintProperties.width,
      height: action.payload.paintProperties.height,
      contexts: [],
      canUndo: false,
      canRedo: false,
      history: nextHistory,
      currentHistoryIndex: 0,
      layers: getLayers(nextHistory),
      currentLayerIndex: 0,
      currentMode: new PenMode(),
      isDragging: false
    };
  },

  IMPORT_IMAGE: (state, action) => {
    const nextHistory = getNextHistory(state.history, state.currentHistoryIndex, {
      type: 'layer',
      event: 'add',
      layer: {
        id: Math.floor(Math.random() * (1 << 30)),
        name: action.payload.name,
        isVisible: true,
        isBackground: false,
        url: action.payload.url
      }
    });
    return {
      ...state,
      canUndo: true,
      canRedo: false,
      history: nextHistory,
      currentHistoryIndex: state.currentHistoryIndex + 1,
      layers: getLayers(nextHistory),
      currentLayerIndex: state.layers.length
    }
  },
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
  }),

  UNDO: (state) => {
    if (!state.canUndo) {
      return state;
    }

    const canUndo = state.currentHistoryIndex > 1;

    return {
      ...state,
      canUndo: canUndo,
      canRedo: true,
      layers: getLayers(state.history.slice(0, state.currentHistoryIndex)),
      currentHistoryIndex: state.currentHistoryIndex - 1
    };
  },
  REDO: (state) => {
    if (!state.canRedo) {
      return state;
    }

    const canRedo = state.currentHistoryIndex + 2 < state.history.length;

    return {
      ...state,
      canUndo: true,
      canRedo: canRedo,
      layers: getLayers(state.history.slice(0, state.currentHistoryIndex + 2)),
      currentHistoryIndex: state.currentHistoryIndex + 1
    };
  }
}, initialState);

export default paint;
