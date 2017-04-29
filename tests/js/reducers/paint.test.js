import * as actions from 'actions/paint';
import * as layerActions from 'actions/layer';
import * as toolbarActions from 'actions/toolbar';
import reducer, { getLayers, initialState } from 'reducers/paint';

describe('paint reducer for layers', () => {
  it('should return the initial state', () => {
    const expected = {...initialState};
    expected.contexts.push(null);
    expect(reducer(undefined, actions.initialize(null)))
      .toEqual(expected);
  });

  it('should add layer', () => {
    const actual = reducer(initialState, layerActions.addLayer());
    expect(actual.canUndo)
      .toBeTruthy();
    expect(actual.canRedo)
      .toBeFalsy();
    expect(actual.history)
      .toHaveLength(2);
  });

  it('should remove layer', () => {
    const state = {
      history: [{
        type: 'layer',
        event: 'add',
        layer: {}
      }, {
        type: 'layer',
        event: 'add',
        layer: {}
      }],
      currentHistoryIndex: 1,
      contexts: [{}, {}],
      currentLayerIndex: 0
    };
    state.layers = getLayers(state.history);

    let actual = reducer(state, layerActions.removeLayer());
    expect(actual.canUndo)
      .toBeTruthy();
    expect(actual.canRedo)
      .toBeFalsy();
    expect(actual.history)
      .toHaveLength(3);
    expect(actual.layers)
      .toHaveLength(1);
  });

  it('should move layer', () => {
    const state = {
      history: [{
        type: 'layer',
        event: 'add',
        layer: {
          id: 1
        }
      }, {
        type: 'layer',
        event: 'add',
        layer: {
          id: 2
        }
      }],
      currentHistoryIndex: 1,
      currentLayerIndex: 0
    };
    state.layers = getLayers(state.history);

    // the min index
    expect(reducer(state, layerActions.moveLayer(0, 0)))
      .toEqual(state);

    // the max index
    expect(reducer(state, layerActions.moveLayer(1, 1)))
      .toEqual(state);
    // no id
    expect(reducer(state, layerActions.moveLayer(100, 101)))
      .toEqual(state);

    const actual = reducer(state, layerActions.moveLayer(1, 2));
    expect(actual.layers)
      .toEqual([
        {id: 2},
        {id: 1}
      ]);
    expect(actual.canUndo)
      .toBeTruthy();
    expect(actual.canRedo)
      .toBeFalsy();
    expect(actual.history)
      .toHaveLength(3);
    expect(actual.currentLayerIndex)
      .toEqual(1);
  });

  it('should set layer name', () => {
    const actual = reducer(initialState, layerActions.setLayerName(0, 'New Layer'));
    expect(actual.canUndo)
      .toBeTruthy();
    expect(actual.canRedo)
      .toBeFalsy();
    expect(actual.history)
      .toHaveLength(2);
  });

  it('should set layer visible', () => {
    const actual = reducer(initialState, layerActions.setLayerVisible(0, false));
    expect(actual.canUndo)
      .toBeTruthy();
    expect(actual.canRedo)
      .toBeFalsy();
    expect(actual.layers[0].isVisible)
      .toBe(false);
    expect(actual.history)
      .toHaveLength(2);
  });
});

describe('paint reducer for images', () => {
  it('should open new image', () => {
    const state = {
      history: [],
      layers: []
    };
    const actual = reducer(state, toolbarActions.openNewImage({
      width: 1000,
      height: 1000
    }));
    expect(actual.canUndo)
      .toBeFalsy();
    expect(actual.canRedo)
      .toBeFalsy();
    expect(actual.history)
      .toHaveLength(1);
    expect(actual.layers)
      .toHaveLength(1);
  });

  it('should import image', () => {
    const state = {
      history: [],
      layers: []
    };
    const actual = reducer(state, actions.importImage('name', 'http://example.com/example.png'));
    expect(actual.canUndo)
      .toBeTruthy();
    expect(actual.canRedo)
      .toBeFalsy();
    expect(actual.history)
      .toHaveLength(1);
  });
});

describe('paint reducer for undo/redo', () => {
  it('should undo', () => {
    const state = {
      canUndo: true,
      canRedo: false,
      history: [{}, {}, {}],
      currentHistoryIndex: 2
    };
    let actual = reducer(state, toolbarActions.undo());
    expect(actual.canUndo)
      .toBeTruthy();
    expect(actual.canRedo)
      .toBeTruthy();
    expect(actual.currentHistoryIndex)
      .toBe(1);
    actual = reducer(actual, toolbarActions.undo());
    expect(actual.canUndo)
      .toBeFalsy();
    expect(actual.canRedo)
      .toBeTruthy();
    expect(actual.currentHistoryIndex)
      .toBe(0);
  });

  it('should redo', () => {
    const state = {
      canUndo: false,
      canRedo: true,
      history: [{}, {}, {}],
      currentHistoryIndex: 0
    };
    let actual = reducer(state, toolbarActions.redo());
    expect(actual.canUndo)
      .toBeTruthy();
    expect(actual.canRedo)
      .toBeTruthy();
    expect(actual.currentHistoryIndex)
      .toBe(1);
    actual = reducer(actual, toolbarActions.redo());
    expect(actual.canUndo)
      .toBeTruthy();
    expect(actual.canRedo)
      .toBeFalsy();
    expect(actual.currentHistoryIndex)
      .toBe(2);
  });
});
