import { createActions } from 'redux-actions';

export const {
  addLayer,
  removeLayer,
  selectLayer,
  setLayerName,
  setLayerVisible
} = createActions({
  ADD_LAYER: () => ({}),
  REMOVE_LAYER: () => ({}),
  SELECT_LAYER: (index) => ({
    layerIndex: index
  }),
  SET_LAYER_NAME: (index, name) => ({
    layerIndex: index,
    layerName: name
  }),
  SET_LAYER_VISIBLE: (index, isVisible) => ({
    layerIndex: index,
    isVisible: isVisible
  })
});
